import type { PlasmoCSConfig } from "plasmo";
import documentHelper from "~core/helpers/documentHelper";
import myludoHelper from "~core/helpers/myludoHelper";
import type { Table } from "~core/models/table";
import configurationService from "~core/services/configurationService";

export const config: PlasmoCSConfig = {
    matches: ["https://www.myludo.fr/*"]
}

const intervalID = setInterval(patch, 125);

async function patch() {
    // si l'onglet n'est pas actif, on ne présaisie pas les données
    if (document.visibilityState === "hidden") return;

    if (!window.location.href.startsWith("https://www.myludo.fr/#!/game/")
        || !window.location.href.includes("bga2myludo")) {
        clearInterval(intervalID);
        return;
    }

    const addPlayButton = document.getElementsByClassName('btn-play-open') as HTMLCollectionOf<HTMLElement>;

    if (addPlayButton.length === 0) {
        // si la personne n'est pas authentifié, on ouvre la modal d'authentification
        const loginButton = documentHelper.getFirstHtmlElementByQuery('button[href="#loginaccount"]');

        if (loginButton) {
            const cancelLink = documentHelper.getFirstHtmlElementByQuery('#loginaccount .modal-footer a');

            loginButton.click();

            cancelLink.removeEventListener("click", cancelLogin, false);
            cancelLink.addEventListener("click", cancelLogin, false);
        }
    }
    else {
        clearInterval(intervalID);
        const config = await configurationService.get();
        const data = getDataFromBGA();

        await loadPlays((plays => {
            const hasBeenPlayed = myludoHelper.hasBeenAlreadyPlayed(data, plays);

            addPlayButton.item(0).click();

            const intervalPopupID = setInterval(() => {
                const addPlayerButton = document.getElementsByClassName('btn-add-player') as HTMLCollectionOf<HTMLElement>;

                if (addPlayerButton.length > 0) {
                    clearInterval(intervalPopupID);

                    if (hasBeenPlayed) addWarning();

                    document.getElementById('online').click();

                    if (data.isCooperative) document.getElementById('coop').click();
                    if (data.isSolo) document.getElementById('solo').click();
                    if (data.isAbandoned) document.getElementById('incomplete').click();

                    if (data.duration) {
                        documentHelper.getFirstInputByName(`time`).value = data.duration.toString();
                        document.getElementsByClassName(`counter-hours`)[0].innerHTML = (Math.floor(data.duration / 60)).toString().padStart(2, "0");
                        document.getElementsByClassName(`counter-minutes`)[0].innerHTML = (data.duration % 60).toString().padStart(2, "0");
                    }

                    if (data.isSolo) {
                        documentHelper.getFirstHtmlElementByQuery(`label[for="name-0"]`).click();
                        documentHelper.getInputById(`name-0`).value = data.players[0].name;

                        documentHelper.getFirstHtmlElementByQuery(`label[for="score-0"]`).click();
                        documentHelper.getInputById(`score-0`).value = data.players[0].score.toString();
                    }
                    else {
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

                    documentHelper.getFirstHtmlElementByQuery(`label[for="location"]`).click();
                    documentHelper.getInputById(`location`).value = config.place;

                    documentHelper.getFirstHtmlElementByQuery(`label[for="message"]`).click();
                    documentHelper.getInputById(`message`).value = chrome.i18n.getMessage("tableLinkText").replace('#TABLE_ID#', data.tableId.toString());

                    if (config.autoSubmit && !hasBeenPlayed) {
                        documentHelper.getFirstHtmlElementByQuery(`#form-play button[type=submit]`).click();
                    }
                    else {
                        const modalContent = document.querySelector("#form-play .modal-content");
                        modalContent.scrollTop = modalContent.scrollHeight;
                    }
                }
            }, 500);
        }));
    }
}

function cancelLogin() {
    const cancelLink = documentHelper.getFirstHtmlElementByQuery('#loginaccount .modal-footer a');
    cancelLink.removeEventListener("click", cancelLogin, false);
    clearInterval(intervalID);
}

function getDataFromBGA() {
    const urlParams = new URL(`https://fake.com?${window.location.href.split("?")[1]}`).searchParams;
    const json = atob(urlParams.get("bga2myludo_data"));

    window.location.href = window.location.href.replace(/[?&][^=]+=[^&]+/g, "");

    return JSON.parse(json) as Table;
}

async function loadPlays(callback) {
    const plays = [];

    const playsTab = document.querySelector<HTMLElement>('a[href="#plays"]');

    if (playsTab) {
        playsTab.click();

        const intervalLoadPlaysID = setInterval(() => {
            const loadingPlays = document.querySelector('#plays .progress');

            if (!loadingPlays) {
                clearInterval(intervalLoadPlaysID);

                const playsContent = document.querySelectorAll('#plays .game-play');

                playsContent.forEach((currentPlay) => {
                    const play = {
                        end: myludoHelper.convertToDate(currentPlay.querySelector('h4').textContent),
                        players: []
                    }

                    currentPlay.querySelectorAll('.play-player').forEach((elt) => {
                        const counter = elt.querySelector('.counter');
                        play.players.push({
                            name: elt.getAttribute('title'),
                            score: counter ? Number(counter.textContent) : null
                        })
                    });

                    plays.push(play);
                });

                callback(plays);
            }
        }, 250);
    }
    else {
        callback(plays);
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

    warningIcon.scrollIntoView();
}