import type { PlasmoCSConfig } from "plasmo";
import games from "data-env:assets/games.json";
import boardGameArenaHelper from "~core/helpers/boardGameArenaHelper";
import boardGameArenaService from "~core/services/boardGameArenaService";
import type { GameStatsParameters } from "~core/models/boardGameArena/gameStatsParameters";
import type { User } from "~core/models/user";

export const config: PlasmoCSConfig = {
    matches: ["https://boardgamearena.com/*"]
}

const myLudoEltId = "myludo_browserextension";
const requestToken = getRequestToken();

patch();

async function patch() {
    const regexTablePage = /^https:\/\/boardgamearena\.com\/table\?table=\d+#?$/;
    const regexpEndGamePage = /^https:\/\/boardgamearena\.com\/.*\btable=\d+.*$/;
    const regexpGameStatsPage = /^https:\/\/boardgamearena\.com\/gamestats/;

    if (!document.getElementById(myLudoEltId)) {
        if (regexTablePage.test(window.location.href)) {
            await patchTablePage();
        } else if (regexpEndGamePage.test(window.location.href)) {
            await patchEndGamePage();
        } else if (regexpGameStatsPage.test(window.location.href)) {
            await patchGameStatsPage();
        }
    }

    setTimeout(() => patch(), 500)
}

async function patchTablePage() {
    const reviewgameButton = document.getElementById("reviewgame");

    if (reviewgameButton !== null) {
        const displayStyle = window.getComputedStyle(reviewgameButton).display;

        if (displayStyle !== 'none' && displayStyle !== 'hide') {
            const bgaButtonBar = document.getElementsByClassName("bgabuttonbar");

            if (bgaButtonBar !== null && bgaButtonBar.length > 0) {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const tableId = Number(urlParams.get("table"));

                boardGameArenaService
                    .getUser(requestToken)
                    .then(user => {
                        boardGameArenaService
                            .getGamesFromTable(requestToken, user, tableId)
                            .then(table => {
                                const myludoId = games[table.gameId];

                                boardGameArenaHelper
                                    .getMyLudoLink(myludoId, table)
                                    .then(link => {
                                        if (link === null) {
                                            addMyLudoField();
                                        }
                                        else {
                                            Array.from(bgaButtonBar).forEach((element) => {
                                                element.appendChild(link);
                                            });
                                        }
                                    });
                            });
                    });
            }
        }
    }
}

async function patchEndGamePage() {
    const rematchButton = document.getElementById("createNew_btn");

    if (rematchButton !== null) {
        const displayStyle = window.getComputedStyle(rematchButton).display;

        if (displayStyle !== 'none' && displayStyle !== 'hide') {
            const bgaButtonBar = document.getElementById("generalactions");

            if (bgaButtonBar !== null) {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const tableId = Number(urlParams.get("table"));

                boardGameArenaService
                    .getUser(requestToken)
                    .then(user => {
                        boardGameArenaService
                            .getGamesFromTable(requestToken, user, tableId)
                            .then(table => {
                                const myludoId = games[table.gameId];

                                boardGameArenaHelper
                                    .getMyLudoLink(myludoId, table)
                                    .then(link => {
                                        if (link === null) {
                                            addMyLudoField();
                                        }
                                        else {
                                            bgaButtonBar.appendChild(link);
                                        }
                                    });
                            });
                    });
            }
        }
    }
}

async function patchGameStatsPage() {
    const loader = document.getElementById("tablestats_loading");

    if (loader === null) return;

    const displayStyle = window.getComputedStyle(loader).display;

    if (displayStyle !== 'none' && displayStyle !== 'hide') return;

    addMyLudoField()

    boardGameArenaService
        .getUser(requestToken)
        .then(user => {
            let page = 1;

            fetchAndFeedStatsPage(user, page);

            document.querySelector("#see_more_tables").addEventListener("click", () => {
                fetchAndFeedStatsPage(user, ++page);
            });
        });
}

async function fetchAndFeedStatsPage(connectedUser: User, page: number) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const parameters: GameStatsParameters = {
        player: urlParams.get("player"),
        startDate: urlParams.get("start_date"),
        endDate: urlParams.get("end_date"),
        gameId: urlParams.get("game_id"),
        finished: urlParams.get("finished"),
        opponentId: urlParams.get("opponent_id"),
        page: page
    };

    boardGameArenaService
        .getGameStats(requestToken, connectedUser, parameters)
        .then(tables => {
            const timeout = setTimeout(() => {
                // on vérifie si toutes les tables sont chargés et rendues
                if (!document.querySelector(`#gamelist_inner a[href="/table?table=${tables[tables.length - 1].tableId}"]`)) return;

                clearTimeout(timeout);

                tables.forEach((table) => {
                    boardGameArenaHelper
                        .getMyLudoLink(games[table.gameId], table)
                        .then(link => {
                            if (link === null) {
                                addMyLudoField();
                            }
                            else {
                                const cell = document.createElement("td");
                                cell.appendChild(link);

                                document.querySelector(`#gamelist_inner a[href="/table?table=${table.tableId}"]`).closest("tr").appendChild(cell);
                            }
                        });
                });
            }, 250);
        });
}

function addMyLudoField() {
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", myLudoEltId);

    document.getElementById("main-content").appendChild(input);
}

function getRequestToken() {
    const regex = /requestToken:\s+'([^']+)'/;

    const requestToken = document.head.outerHTML.match(regex);

    if (requestToken) {
        return requestToken[1];
    } else {
        return null;
    }
}