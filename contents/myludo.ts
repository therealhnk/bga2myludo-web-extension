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
let isPatchInProgress = false; // Flag pour éviter les appels multiples

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (intervalID) {
        clearInterval(intervalID);
        intervalID = null;
    }
});

// Cleanup on visibility change (tab switching)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && intervalID) {
        clearInterval(intervalID);
        intervalID = null;
    } else if (!document.hidden && !intervalID) {
        intervalID = setInterval(check, CHECK_INTERVAL_MS);
    }
});

function getBgaTableId(): string | null {
    // Chercher dans la query string normale
    const urlParams = new URLSearchParams(window.location.search);
    const tableId = urlParams.get("bgatableid");
    
    if (tableId) {
        return tableId;
    }
    
    // Si pas trouvé, chercher dans le hash (après #!)
    if (window.location.hash) {
        const hashMatch = window.location.hash.match(/[?&]bgatableid=([^&]+)/);
        if (hashMatch) {
            return hashMatch[1];
        }
    }
    
    return null;
}

function cleanUrlFromBgaTableId(): void {
    let newUrl = window.location.href;
    
    if (window.location.hash.includes("bgatableid")) {
        // Nettoyer dans le hash
        newUrl = newUrl.replace(/([?&])bgatableid=[^&]+(&|$)/, (match, p1, p2) => {
            return p2 === '&' ? p1 : '';
        });
    } else {
        // Nettoyer dans la query string normale
        newUrl = newUrl.replace(/[?&]bgatableid=[^&#]+/g, '');
    }
    
    if (newUrl !== window.location.href) {
        window.history.replaceState({}, document.title, newUrl);
    }
}

async function check() {
    const bgaTableId = getBgaTableId();

    if (bgaTableId && !isPatchInProgress) {
        // Si on a un bgatableid et qu'un patch n'est pas déjà en cours
        await patch();
    }
}

async function patch() {
    // Empêcher les appels multiples
    if (isPatchInProgress) {
        return;
    }
    
    isPatchInProgress = true;
    
    try {
        // si l'onglet n'est pas actif, on ne présaisie pas les données
        if (document.visibilityState === "hidden") {
            isPatchInProgress = false;
            return;
        }

        // Récupérer le bgatableid depuis l'URL
        const bgaTableId = getBgaTableId();
        
        if (!bgaTableId) {
            if (intervalID) {
                clearInterval(intervalID);
                intervalID = null;
            }
            isPatchInProgress = false;
            return;
        }
        
        // Récupérer les informations de la table depuis BGA
        const data = await boardGameArenaService.getTableInformations(bgaTableId);
        if (!data) {
            console.error("Failed to get table information from BGA");
            isPatchInProgress = false;
            return;
        }

        const addPlayButton = document.getElementsByClassName('btn-play-open') as HTMLCollectionOf<HTMLElement>;

        if (addPlayButton.length === 0) {
            // si la personne n'est pas authentifié, on ouvre la modal d'authentification
            const loginButton = documentHelper.getFirstHtmlElementByQuery('button[href="#loginaccount"]');

            if (loginButton) {
                // Stopper l'intervalle avant d'ouvrir la modal pour éviter les boucles
                if (intervalID) {
                    clearInterval(intervalID);
                    intervalID = null;
                }
                
                loginButton.click();
                
                // Attendre un peu que la modal soit complètement chargée
                setTimeout(() => {
                    // Chercher le bouton annuler dans la modal
                    const cancelLinks = document.querySelectorAll('#loginaccount .modal-footer a, #loginaccount button.modal-close, #loginaccount [data-dismiss="modal"]');
                    cancelLinks.forEach(link => {
                        link.removeEventListener("click", cancelLogin);
                        link.addEventListener("click", cancelLogin);
                    });
                    
                    // Aussi écouter la fermeture de la modal via ESC ou clic en dehors
                    const modal = document.querySelector('#loginaccount');
                    if (modal) {
                        // Observer les changements de style pour détecter la fermeture
                        const observer = new MutationObserver((mutations) => {
                            mutations.forEach((mutation) => {
                                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                                    const target = mutation.target as HTMLElement;
                                    if (target.style.display === 'none' || !target.classList.contains('open')) {
                                        observer.disconnect();
                                        cancelLogin(null);
                                    }
                                }
                            });
                        });
                        observer.observe(modal, { attributes: true });
                    }
                }, 500);
            }
        }
        else {
            if (intervalID) {
                clearInterval(intervalID);
                intervalID = null;
            }
            const configuration = await configurationService.get();

        // override bga user with configuration
        data.players.forEach(current => {
            const overridenUser = configuration.users.find(o => o.bgaUser === current.name);
            current.name = overridenUser && overridenUser.myludoUser && overridenUser.myludoUser.length > 0 ? overridenUser.myludoUser : current.name;
        });

        await loadPlays((plays => {
            const hasBeenPlayed = myludoHelper.hasBeenAlreadyPlayed(data, plays);

            addPlayButton.item(0).click();
            
            // Nettoyer l'URL maintenant qu'on a ouvert le formulaire
            cleanUrlFromBgaTableId();

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
                            if (addPlayerButton.item(0)) {
                                addPlayerButton.item(0).click();
                            }

                            documentHelper.getFirstHtmlElementByQuery(`label[for="name-${index}"]`).click();

                            const currentPlayer = documentHelper.getInputById(`name-${index}`);
                            currentPlayer.value = elt.name;

                            documentHelper.getFirstHtmlElementByQuery(`label[for="score-${index}"]`).click();
                            documentHelper.getInputById(`score-${index}`).value = elt.score ? elt.score.toString() : null;
                        });

                    } else {
                        data.players.forEach((elt, index) => {
                            if (addPlayerButton.item(0)) {
                                addPlayerButton.item(0).click();
                            }

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
        isPatchInProgress = false;
        // Restart checking in case of error
        if (!intervalID) {
            intervalID = setInterval(check, CHECK_INTERVAL_MS);
        }
    }
}

function cancelLogin(event) {
    // Empêcher le comportement par défaut si c'est un event
    if (event && event.preventDefault) {
        event.preventDefault();
    }
    
    // Retirer tous les event listeners
    const cancelLinks = document.querySelectorAll('#loginaccount .modal-footer a, #loginaccount button.modal-close, #loginaccount [data-dismiss="modal"]');
    cancelLinks.forEach(link => {
        link.removeEventListener("click", cancelLogin);
    });
    
    // S'assurer que l'intervalle est bien stoppé
    if (intervalID) {
        clearInterval(intervalID);
        intervalID = null;
    }
    
    // Nettoyer l'URL et retirer /plays - avec une vraie redirection
    let newUrl = window.location.href;
    
    // Retirer le paramètre bgatableid et /plays
    newUrl = newUrl.replace(/\/plays\?bgatableid=[^&#]+/, '');
    newUrl = newUrl.replace(/\/plays$/, '');
    
    // Forcer la redirection même si l'URL semble identique
    // car Myludo est une SPA et il faut recharger la vue
    setTimeout(() => {
        window.location.href = newUrl;
        // Forcer le reload si nécessaire
        if (window.location.href === newUrl) {
            window.location.reload();
        }
    }, 100);
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