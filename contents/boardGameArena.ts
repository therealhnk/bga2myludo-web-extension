import type { PlasmoCSConfig } from "plasmo";
import boardGameArenaHelper from "~core/helpers/boardGameArenaHelper";

export const config: PlasmoCSConfig = {
    matches: ["https://boardgamearena.com/*"]
}

const myLudoEltId = "myludo-browser-extension-button";

patch();

async function patch() {
    const regexTablePage = /^https:\/\/boardgamearena\.com\/table\?table=\d+#?$/;
    const regexpEndGamePage = /^https:\/\/boardgamearena\.com\/.*\btable=\d+.*$/;
    const regexpGameStatsPage = /^https:\/\/boardgamearena\.com\/gamestats/;
    const regexpLastResultsPage = /^https:\/\/boardgamearena\.com\/player\?section=lastresults$/;

    if (document.getElementsByClassName(myLudoEltId).length === 0) {
        if (regexTablePage.test(window.location.href)) {
            await patchTablePage();
        } else if (regexpEndGamePage.test(window.location.href)) {
            await patchEndGamePage();
        } else if (regexpGameStatsPage.test(window.location.href)) {
            await patchGameStatsPage();
        } else if (regexpLastResultsPage.test(window.location.href)) {
            await patchLastResultsPage();
        }
    }

    setTimeout(() => patch(), 125)
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
                const tableId = urlParams.get("table");

                if (tableId) {
                    try {
                        const gameId = boardGameArenaHelper.extractGameIdFromTablePage();
                        const link = await boardGameArenaHelper.getMyLudoButton(tableId, gameId);
                        Array.from(bgaButtonBar).forEach((element) => {
                            element.appendChild(link.cloneNode(true));
                        });
                    } catch (error) {
                        console.error("Error creating Myludo link:", error);
                    }
                }
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
                const tableId = urlParams.get("table");

                if (tableId) {
                    try {
                        const gameId = boardGameArenaHelper.extractGameIdFromEndGamePage();
                        const link = await boardGameArenaHelper.getMyLudoButton(tableId, gameId);
                        bgaButtonBar.appendChild(link);
                    } catch (error) {
                        console.error("Error creating Myludo link:", error);
                    }
                }
            }
        }
    }
}

async function patchLastResultsPage() {
    let page = 1;

    fetchAndFeedLastResultsPage(page);

    const seeMoreButton = document.querySelector("#board_seemore_r");
    if (seeMoreButton && !seeMoreButton.hasAttribute('data-myludo-listener')) {
        seeMoreButton.setAttribute('data-myludo-listener', 'true');
        seeMoreButton.addEventListener("click", () => {
            fetchAndFeedLastResultsPage(++page);
        });
    }
}

function fetchAndFeedLastResultsPage(page: number) {
    const timeout = setTimeout(async () => {
        // on vérifie si toutes les tables sont chargés et rendues
        const rows = document.querySelectorAll('#boardposts_r .post .postcontent .postfooter:not(:has(a[href*="www.myludo.fr"]))');

        if (!rows.length) return; // Vérifie si des lignes existent

        for (const row of rows) {
            const post = row.closest('.post');
            if (!post) continue;

            const linkElement = post.querySelector('a[href*="/table?table="]');
            const gameIcon = post.querySelector('.game_icon');

            if (linkElement && gameIcon) {
                const tableUrl = linkElement.getAttribute('href');
                const tableIdMatch = tableUrl?.match(/table=(\d+)/);
                
                if (tableIdMatch) {
                    const tableId = tableIdMatch[1];
                    
                    // Extraire l'ID du jeu depuis l'icône
                    const gameId = boardGameArenaHelper.extractGameIdFromIcon(gameIcon);

                    const span = document.createElement("span");
                    span.textContent = " • ";

                    try {
                        const link = await boardGameArenaHelper.getMyLudoLink(tableId, gameId);
                        span.appendChild(link);
                        row.appendChild(span);
                    } catch (error) {
                        console.error("Error creating Myludo link:", error);
                    }
                }
            }
        }

        clearTimeout(timeout);
    }, 125);
}

async function patchGameStatsPage() {
    const loader = document.getElementById("tablestats_loading");

    if (loader === null) return;

    const displayStyle = window.getComputedStyle(loader).display;

    if (displayStyle !== 'none' && displayStyle !== 'hide') return;

    let page = 1;

    fetchAndFeedStatsPage(page);

    const seeMoreTablesButton = document.querySelector("#see_more_tables");
    if (seeMoreTablesButton && !seeMoreTablesButton.hasAttribute('data-myludo-listener')) {
        seeMoreTablesButton.setAttribute('data-myludo-listener', 'true');
        seeMoreTablesButton.addEventListener("click", () => {
            fetchAndFeedStatsPage(++page);
        });
    }
}

function fetchAndFeedStatsPage(page: number) {
    const timeout = setTimeout(async () => {
        // on vérifie si toutes les tables sont chargés et rendues
        const rows = document.querySelectorAll('#gamelist_inner tr:not(:has(a[href*="www.myludo.fr"]))');
        if (!rows) return;

        for (const row of rows) {
            const tableText = row.querySelector('a.table_name.bga-link')?.textContent;
            if (!tableText) continue;

            const tableId = tableText.slice(1); // on vire le # en début de ligne

            // Extraire l'ID du jeu depuis l'img
            const gameIcon = row.querySelector('img.game_icon');
            let gameId = null;
            if (gameIcon) {
                const src = gameIcon.getAttribute('src');
                if (src) {
                    const match = src.match(/gamemedia\/([^\/]+)\/icon/);
                    gameId = match?.[1] || null;
                }
            }

            try {
                const link = await boardGameArenaHelper.getMyLudoButton(tableId, gameId);
                const cell = document.createElement("td");
                cell.appendChild(link);

                const targetRow = document.querySelector(`#gamelist_inner a[href="/table?table=${tableId}"]`)?.closest("tr");
                if (targetRow) {
                    targetRow.appendChild(cell);
                }
            } catch (error) {
                console.error("Error creating Myludo link:", error);
            }
        }

        clearTimeout(timeout);
    }, 125);
}