const myLudoEltId = "myludo_browserextension";

patch();

async function patch() {
    const regexTablePage = /^https:\/\/boardgamearena\.com\/table\?table=\d+#?$/;
    const regexpEndGamePage = /^https:\/\/boardgamearena\.com\/.*\btable=\d+.*$/;


    if (regexTablePage.test(window.location.href)) {
        await patchTablePage();
    } else if (regexpEndGamePage.test(window.location.href)) {
        await patchEndGamePage();
    }

    setTimeout(() => patch(), 500)
}

async function patchTablePage() {
    if (document.getElementById(myLudoEltId) !== null) return;

    const reviewgameButton = document.getElementById("reviewgame");

    if (reviewgameButton !== null) {
        const displayStyle = window.getComputedStyle(reviewgameButton).display;

        if (displayStyle !== 'none' && displayStyle !== 'hide') {
            const bgaButtonBar = document.getElementsByClassName("bgabuttonbar");

            if (bgaButtonBar !== null && bgaButtonBar.length > 0) {
                await getMyLudoLink().then(link => {
                    if (link === null) {
                        addMyLudoField();
                    }
                    else {
                        Array.from(bgaButtonBar).forEach((element) => {
                            element.appendChild(link);
                        });
                    }
                });
            }
        }
    }
}

async function patchEndGamePage() {
    if (document.getElementById(myLudoEltId) !== null) return;

    const rematchButton = document.getElementById("createNew_btn");

    if (rematchButton !== null) {
        const displayStyle = window.getComputedStyle(rematchButton).display;

        if (displayStyle !== 'none' && displayStyle !== 'hide') {
            const bgaButtonBar = document.getElementById("generalactions");

            if (bgaButtonBar !== null) {
                await getMyLudoLink().then(link => {
                    if (link === null) {
                        addMyLudoField();
                    }
                    else {
                        bgaButtonBar.appendChild(link);
                    }
                });
            }
        }
    }
}

function addMyLudoField() {
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", myLudoEltId);

    document.body.appendChild(input);
}

async function getMyLudoLink() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tableId = urlParams.get("table");

    const requestToken = getRequestToken();

    if (requestToken === null) return null;

    const headers = {};
    headers["x-request-token"] = requestToken

    const resultTable = await fetch(`https://boardgamearena.com/table/table/tableinfos.html?id=${tableId}`, { headers })
        .then(response => response.json())
        .then(data => { return data; });

    const gameName = resultTable.data.result.game_name;

    if (gameName !== null) {
        const jsonFileURL = chrome.runtime.getURL('data/table.json');

        return await fetch(jsonFileURL)
            .then(response => response.json())
            .then(async data => {
                const myludoId = data[gameName];
                let href = '';

                if (!myludoId) {
                    href = `https://www.myludo.fr/#!/search/${gameName}`;
                }
                else {
                    const result = {
                        players: [],
                        end: '',
                        isCooperative: false,
                        isSolo: false,
                        isAbandoned: false
                    };

                    const resultUser = await fetch(`https://boardgamearena.com/my?who`, { headers })
                        .then(response => response.json())
                        .then(data => { return data; });

                    const connectedUser = resultUser.n; // username 

                    resultTable.data.result.player.forEach((item) => {
                        result.players.push({
                            name: item.name === connectedUser ? "Moi" : item.name,
                            score: item.score,
                            rank: item.gamerank
                        });
                    });

                    result.end = resultTable.data.result.time_end;
                    result.isCooperative = resultTable.data.result.is_coop;
                    result.isSolo = resultTable.data.result.is_solo;
                    result.isAbandoned = resultTable.data.result.endgame_reason !== 'normal_end';

                    const json = JSON.stringify(result);
                    const data = btoa(json);

                    href = `https://www.myludo.fr/#!/game/${myludoId}?bga2myludo=1&bga2myludo_data=${data}`
                }

                const link = document.createElement("a");
                link.href = href;
                link.textContent = "Enregistrer la partie sur Myludo";
                link.target = "_blank"
                link.classList.add("action-button");
                link.classList.add("bgabutton");
                link.classList.add("bgabutton_darkgray");
                link.id = "myludo_browserextension";
                link.style = "display: inline;"

                return link;
            });
    }

    return null;
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