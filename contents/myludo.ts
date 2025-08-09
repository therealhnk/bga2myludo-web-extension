import type { PlasmoCSConfig } from "plasmo";
import documentHelper from "~core/helpers/documentHelper";
import myludoHelper from "~core/helpers/myludoHelper";
import type { Table } from "~core/models/table";
import boardGameArenaService from "~core/services/boardGameArenaService";
import configurationService from "~core/services/configurationService";

export const config: PlasmoCSConfig = {
    matches: ["https://www.myludo.fr/*"]
}

// Constants
const CHECK_INTERVAL_MS = 125;
const LOAD_PLAYS_INTERVAL_MS = 250;

let intervalID: NodeJS.Timeout | null = setInterval(check, CHECK_INTERVAL_MS);

async function check() {
    const url = window.location.href;

    if (url.includes("bgatableid")) {
        await init();
    } else if (url.includes("bga2myludo_data")) {
        await patch();
    }
}

async function init() {
    if (intervalID) {
        clearInterval(intervalID);
        intervalID = null;
    }

    try {
        const queryString = window.location.href.split("?")[1];
        if (!queryString) {
            console.error("No query string found in URL");
            return;
        }
        
        const urlParams = new URLSearchParams(queryString);
        const bgaTableId = urlParams.get("bgatableid");

        if (!bgaTableId) {
            console.error("No bgatableid found in URL parameters");
            return;
        }

        const table = await boardGameArenaService.getTableInformations(bgaTableId);
        if (!table) {
            window.location.href = "https://www.myludo.fr";
            return;
        }

        const gameInfo = await configurationService.getGame(table.gameId);

        if (!gameInfo) {
            window.location.href = `https://www.myludo.fr/#!/search/${table.gameId}`;
            return;
        }

        const json = JSON.stringify(table);
        const data = Buffer.from(json).toString('base64');

        window.location.href = `https://www.myludo.fr/#!/game/${gameInfo.currentMyludoId}?bga2myludo_data=${data}`;

        intervalID = setInterval(check, CHECK_INTERVAL_MS);
    } catch (error) {
        console.error("Error in init function:", error);
        // Restart checking in case of error
        intervalID = setInterval(check, CHECK_INTERVAL_MS);
    }
}

async function patch() {
    try {
        // si l'onglet n'est pas actif, on ne présaisie pas les données
        if (document.visibilityState === "hidden") return;

        if (!window.location.href.includes("bga2myludo_data")) {
            if (intervalID) {
                clearInterval(intervalID);
                intervalID = null;
            }
            return;
        }

        const addPlayButton = document.getElementsByClassName('btn-play-open') as HTMLCollectionOf<HTMLElement>;

        if (addPlayButton.length === 0) {
            // si la personne n'est pas authentifié, on ouvre la modal d'authentification
            const loginButton = documentHelper.getFirstHtmlElementByQuery('button[href="#loginaccount"]');

            if (loginButton) {
                loginButton.click();
                
                const cancelLink = documentHelper.getFirstHtmlElementByQuery('#loginaccount .modal-footer a');
                if (cancelLink) {
                    cancelLink.removeEventListener("click", cancelLogin, false);
                    cancelLink.addEventListener("click", cancelLogin, false);
                }
            }
        }
        else {
            if (intervalID) {
                clearInterval(intervalID);
                intervalID = null;
            }
            const configuration = await configurationService.get();
            const data = getDataFromBGA();

        // override bga user with configuration
        data.players.forEach(current => {
            const overridenUser = configuration.users.find(o => o.bgaUser === current.name);
            current.name = overridenUser && overridenUser.myludoUser && overridenUser.myludoUser.length > 0 ? overridenUser.myludoUser : current.name;
        });

        await loadPlays((plays => {
            const hasBeenPlayed = myludoHelper.hasBeenAlreadyPlayed(data, plays);

            addPlayButton.item(0).click();

            const intervalPopupID = setInterval(() => {
                const addPlayerButton = document.getElementsByClassName('btn-add-player') as HTMLCollectionOf<HTMLElement>;

                if (addPlayerButton.length > 0) {
                    clearInterval(intervalPopupID);

                    if (hasBeenPlayed) addWarning();

                    const onlineElement = document.getElementById('online');
                    if (onlineElement) onlineElement.click();

                    if (data.isAbandoned) {
                        const incompleteElement = document.getElementById('incomplete');
                        if (incompleteElement) incompleteElement.click();
                    }

                    if (data.duration) {
                        documentHelper.getFirstInputByName(`time`).value = data.duration.toString();
                        const hoursElement = document.getElementsByClassName(`counter-hours`)[0];
                        const minutesElement = document.getElementsByClassName(`counter-minutes`)[0];
                        if (hoursElement) hoursElement.textContent = Math.floor(data.duration / 60).toString().padStart(2, "0");
                        if (minutesElement) minutesElement.textContent = Math.floor(data.duration % 60).toString().padStart(2, "0");
                    }

                    if (data.isSolo) {
                        const soloElement = document.getElementById('solo');
                        if (soloElement) soloElement.click();

                        const score = data.players[0].score;

                        if (score > 0) {
                            documentHelper.getFirstHtmlElementByQuery('.btn-winner-player').click();
                        }

                        documentHelper.getFirstHtmlElementByQuery(`label[for="name-0"]`).click();
                        documentHelper.getInputById(`name-0`).value = data.players[0].name;

                        documentHelper.getFirstHtmlElementByQuery(`label[for="score-0"]`).click();
                        documentHelper.getInputById(`score-0`).value = score.toString();
                    } else if (data.isCooperative) {
                        const coopElement = document.getElementById('coop');
                        if (coopElement) coopElement.click();

                        const scoreCoop = data.players[0].score;

                        documentHelper.getFirstHtmlElementByQuery(`label[for="coopscore"]`).click();
                        documentHelper.getInputById(`coopscore`).value = scoreCoop.toString();

                        if (scoreCoop > 0) {
                            documentHelper.getFirstHtmlElementByQuery('.btn-icon-switch').click();
                        }

                        data.players.forEach((elt, index) => {
                            addPlayerButton.item(0).click();

                            documentHelper.getFirstHtmlElementByQuery(`label[for="name-${index}"]`).click();

                            const currentPlayer = documentHelper.getInputById(`name-${index}`);
                            currentPlayer.value = elt.name;

                            documentHelper.getFirstHtmlElementByQuery(`label[for="score-${index}"]`).click();
                            documentHelper.getInputById(`score-${index}`).value = elt.score ? elt.score.toString() : null;
                        });

                    } else {
                        data.players.forEach((elt, index) => {
                            addPlayerButton.item(0).click();

                            documentHelper.getFirstHtmlElementByQuery(`label[for="name-${index}"]`).click();

                            const currentPlayer = documentHelper.getInputById(`name-${index}`);
                            currentPlayer.value = elt.name;

                            if (elt.rank === 1) {
                                (currentPlayer.closest('.card-content').getElementsByClassName('btn-winner-player')[0] as HTMLElement).click();
                            }

                            documentHelper.getFirstHtmlElementByQuery(`label[for="score-${index}"]`).click();
                            documentHelper.getInputById(`score-${index}`).value = elt.score ? elt.score.toString() : null;
                        });
                    }

                    documentHelper.getInputById(`date`).value = new Date(data.end).toISOString().split('T')[0];

                    if (configuration.fillPlace) {
                        documentHelper.getFirstHtmlElementByQuery(`label[for="location"]`).click();
                        documentHelper.getInputById(`location`).value = configuration.place;
                    }

                    documentHelper.getFirstHtmlElementByQuery(`label[for="message"]`).click();
                    let message = "";

                    if (configuration.addTableLink) {
                        message += chrome.i18n.getMessage("tableLinkText").replace('#TABLE_ID#', data.tableId.toString());
                    }

                    message += chrome.i18n.getMessage("createdWithText");

                    documentHelper.getInputById(`message`).value = message;

                    if (configuration.excludeFromStatistics) {
                        const excludeElement = documentHelper.getInputById(`exclude`);
                        if (excludeElement) excludeElement.click();
                    }

                    if (configuration.autoSubmit && !hasBeenPlayed) {
                        documentHelper.getFirstHtmlElementByQuery(`#form-play button[type=submit]`).click();
                    }
                    else {
                        const modalContent = document.querySelector("#form-play .modal-content");
                        if (modalContent) {
                            setTimeout(function () { modalContent.scrollTop = modalContent.scrollHeight; }, 0);
                        }
                    }
                }
            }, CHECK_INTERVAL_MS);
        }));
        }
    } catch (error) {
        console.error("Error in patch function:", error);
        // Restart checking in case of error
        if (!intervalID) {
            intervalID = setInterval(check, CHECK_INTERVAL_MS);
        }
    }
}

function cancelLogin() {
    const cancelLink = documentHelper.getFirstHtmlElementByQuery('#loginaccount .modal-footer a');
    cancelLink.removeEventListener("click", cancelLogin, false);
    if (intervalID) {
        clearInterval(intervalID);
        intervalID = null;
    }
}

function getDataFromBGA() {
    try {
        const queryString = window.location.href.split("?")[1];
        if (!queryString) {
            throw new Error("No query string found in URL");
        }
        
        const urlParams = new URLSearchParams(queryString);
        const encodedData = urlParams.get("bga2myludo_data");
        
        if (!encodedData) {
            throw new Error("No bga2myludo_data found in URL parameters");
        }
        
        const json = Buffer.from(encodedData, 'base64').toString('utf-8');

        window.location.href = window.location.href.replace(/[?&][^=]+=[^&]+/g, "");

        return JSON.parse(json) as Table;
    } catch (error) {
        console.error("Error decoding BGA data:", error);
        throw error;
    }
}

async function loadPlays(callback) {
    const tables: Table[] = [];

    const playsTab = document.querySelector<HTMLElement>('a[data-target="plays"]');

    if (playsTab) {
        playsTab.click();

        const intervalLoadPlaysID = setInterval(() => {
            const loadingPlays = document.querySelector('#plays .progress');

            if (!loadingPlays) {
                clearInterval(intervalLoadPlaysID);

                const playsContent = document.querySelectorAll('#plays .game-play');

                playsContent.forEach((currentPlay) => {
                    const table = {
                        end: myludoHelper.convertToDate(currentPlay.querySelector('h4').textContent),
                        duration: Number(currentPlay.querySelector('h5 strong')?.textContent),
                        players: []
                    } as Table;

                    currentPlay.querySelectorAll('.play-player').forEach((elt) => {
                        const counter = elt.querySelector('.counter');
                        table.players.push({
                            name: elt.getAttribute('title'),
                            score: counter ? Number(counter.textContent) : null
                        })
                    });

                    tables.push(table);
                });

                callback(tables);
            }
        }, LOAD_PLAYS_INTERVAL_MS);
    }
    else {
        callback(tables);
    }
}

function addWarning() {
    const divider = document.createElement("div");
    divider.classList.add("divider");

    const row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("extra-margin-top");

    const warning = document.createElement("div");
    warning.classList.add("col");
    warning.classList.add("s12");

    const label = document.createElement("div");
    label.textContent = "BGA2Myludo";
    label.style.cssText = "padding-left:12px; font-size: .8rem; color: #9e9e9e;";

    const warningIcon = document.createElement("i");
    warningIcon.classList.add("material-icons");
    warningIcon.classList.add("orange-text");
    warningIcon.classList.add("middle");
    warningIcon.classList.add("left");
    warningIcon.textContent = "warning";

    warning.appendChild(warningIcon);
    warning.append(chrome.i18n.getMessage("warningAlreadyPlayed"));

    row.appendChild(label);
    row.appendChild(warning);

    const modalContent = document.querySelector("#form-play .modal-content");
    modalContent.appendChild(divider);
    modalContent.appendChild(row);
}