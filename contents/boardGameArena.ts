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

    if (document.getElementsByClassName(myLudoEltId).length === 0) {
        if (regexTablePage.test(window.location.href)) {
            await patchTablePage();
        } else if (regexpEndGamePage.test(window.location.href)) {
            await patchEndGamePage();
        } else if (regexpGameStatsPage.test(window.location.href)) {
            await patchGameStatsPage();
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

                const link = boardGameArenaHelper.getMyLudoLink(tableId);
                Array.from(bgaButtonBar).forEach((element) => {
                    element.appendChild(link);
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
                const tableId = urlParams.get("table");

                const link = boardGameArenaHelper.getMyLudoLink(tableId);
                bgaButtonBar.appendChild(link);
            }
        }
    }
}

async function patchGameStatsPage() {
    const loader = document.getElementById("tablestats_loading");

    if (loader === null) return;

    const displayStyle = window.getComputedStyle(loader).display;

    if (displayStyle !== 'none' && displayStyle !== 'hide') return;

    let page = 1;

    fetchAndFeedStatsPage(page);

    document.querySelector("#see_more_tables").addEventListener("click", () => {
        fetchAndFeedStatsPage(++page);
    });
}

function fetchAndFeedStatsPage(page: number) {
    const timeout = setTimeout(() => {
        // on vérifie si toutes les tables sont chargés et rendues
        const rows = document.querySelectorAll('#gamelist_inner tr:not(:has(a[href*="www.myludo.fr"]))');
        if (!rows) return;

        rows.forEach((row) => {
            const tableText = row.querySelector('a.table_name.bga-link').textContent;

            const tableId = tableText.slice(1); // on vire le # en début de ligne

            const link = boardGameArenaHelper.getMyLudoLink(tableId);

            const cell = document.createElement("td");
            cell.appendChild(link);

            document.querySelector(`#gamelist_inner a[href="/table?table=${tableId}"]`).closest("tr").appendChild(cell);
        });

        clearTimeout(timeout);
    }, 125);
}