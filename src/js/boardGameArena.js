let intervalID = setInterval(patch, 500);

function patch() {
    const regexTablePage = /^https:\/\/boardgamearena\.com\/table\?table=/;
    const regexpEndGamePage = /^https:\/\/boardgamearena\.com\/(?!(?:.*\btable\?\b.*))\S*table=\d+$/;


    if (regexTablePage.test(window.location.href)) {
        patchTablePage();
    }

    if (regexpEndGamePage.test(window.location.href)) {
        patchEndGamePage();
    }

    return;
}

function patchTablePage() {
    if (document.getElementById("myludo_browserextension") !== null) return;

    const scores = document.getElementsByClassName('score-entry');

    if (scores.length === 0) return;

    const rematchButton = document.getElementById("rematch");

    if (rematchButton !== null) {
        const displayStyle = window.getComputedStyle(rematchButton).display;

        if (displayStyle !== 'none' || displayStyle !== 'hide') {
            const bgaButtonBar = document.getElementsByClassName("bgabuttonbar");

            if (bgaButtonBar !== null && bgaButtonBar.length > 0) {
                const gameName = getGameName();

                if (gameName !== null) {
                    const jsonFileURL = chrome.runtime.getURL('data/table.json');

                    fetch(jsonFileURL).then(response => response.json())
                        .then(data => {
                            const myludoId = data[gameName];

                            if (!myludoId) {
                                console.log(`[bga2myludo]missing myludo id for ${gameName}`);
                                return;
                            }

                            const connectedUser = document.getElementById('connected_username').innerText;

                            const result = [];

                            if (scores !== null) {
                                for (let elt of scores) {
                                    const playerName = elt.getElementsByClassName('name')[0].innerText.trim();
                                    const playerScore = elt.getElementsByClassName('score')[0].innerText.trim();

                                    result.push(`${playerName === connectedUser ? "Moi" : playerName}=${playerScore}`);
                                }
                            }

                            const link = document.createElement("a");
                            link.href = `https://www.myludo.fr/#!/game/${myludoId}?bga2myludo=1&${result.join("&")}`;
                            link.textContent = "Enregistrer la partie sur MyLudo";
                            link.target = "_blank"
                            link.classList.add("bgabutton");
                            link.classList.add("bgabutton_darkgray");
                            link.id = "myludo_browserextension";
                            link.style = "display: inline;"

                            Array.from(bgaButtonBar).forEach((element) => {
                                element.appendChild(link);
                            });
                        });
                }
            }
        }
    }
}

function patchEndGamePage() {
    if (document.getElementById("myludo_browserextension") !== null) return;

    const scores = document.getElementsByClassName('score-entry');

    if (scores.length === 0) return;

    const rematchButton = document.getElementById("createNew_btn");

    if (rematchButton !== null) {
        const displayStyle = window.getComputedStyle(rematchButton).display;

        if (displayStyle !== 'none' || displayStyle !== 'hide') {
            const bgaButtonBar = document.getElementById("generalactions");

            if (bgaButtonBar !== null) {
                const gameNameMatch = window.location.href.match(/\/([^/?]+)\?/)
                const gameName = gameNameMatch ? gameNameMatch[1] : null;

                if (gameName !== null) {
                    const jsonFileURL = chrome.runtime.getURL('data/table.json');

                    fetch(jsonFileURL).then(response => response.json())
                        .then(data => {
                            const myludoId = data[gameName];

                            if (!myludoId) {
                                console.log(`[bga2myludo]missing myludo id for ${gameName}`);
                                return;
                            }

                            const connectedUser = document.getElementById('connected_username').innerText;

                            const result = [];

                            if (scores !== null) {
                                for (let elt of scores) {
                                    const playerName = elt.getElementsByClassName('name')[0].innerText.trim();
                                    const playerScore = elt.getElementsByClassName('score')[0].innerHTML.split('<')[0].trim();

                                    result.push(`${playerName === connectedUser ? "Moi" : playerName}=${playerScore}`);
                                }
                            }

                            const link = document.createElement("a");
                            link.href = `https://www.myludo.fr/#!/game/${myludoId}?bga2myludo=1&${result.join("&")}`;
                            link.textContent = "Enregistrer la partie sur MyLudo";
                            link.target = "_blank"
                            link.classList.add("action-button");
                            link.classList.add("bgabutton");
                            link.classList.add("bgabutton_darkgray");
                            link.id = "myludo_browserextension";
                            link.style = "display: inline;"

                            bgaButtonBar.appendChild(link);
                        });
                }
            }
        }
    }
}

function getGameName() {
    const element = document.getElementById("table-module");
    const classValue = element.getAttribute("class");
    const classes = classValue.split(" ");
    const searchingTag = "tablewithgame_";

    for (var i = 0; i < classes.length; i++) {
        if (classes[i].indexOf(searchingTag) !== -1) {
            var termIndex = classes[i].indexOf(searchingTag) + searchingTag.length;
            return classes[i].substring(termIndex);
        }
    }

    return null;
}