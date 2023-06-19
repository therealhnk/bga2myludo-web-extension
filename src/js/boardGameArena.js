let intervalID = setInterval(patch, 500);

function patch() {
    const regexTablePage = /^https:\/\/boardgamearena\.com\/table\?table=/;
    const regexpEndGamePage = /^https:\/\/boardgamearena\.com\/(?!(?:.*\btable\?\b.*))\S*table=\d+$/;


    if (regexTablePage.test(window.location.href) || regexpEndGamePage.test(window.location.href)) {
        patchTablePage()
    }

    return;
}

async function patchTablePage() {
    if (document.getElementById("myludo_browserextension") !== null) return;

    const rematchButton = document.getElementById("rematch");

    if (rematchButton !== null) {
        const displayStyle = window.getComputedStyle(rematchButton).display;

        if (displayStyle !== 'none' && displayStyle !== 'hide') {
            const bgaButtonBar = document.getElementsByClassName("bgabuttonbar");

            if (bgaButtonBar !== null && bgaButtonBar.length > 0) {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const tableId = urlParams.get("table");

                const result = await fetch(`https://boardgamearena.com/account/account/getRequestToken.html?bgachromeext`)
                    .then(response => response.json())
                    .then(data => { return data; });

                const headers = {};
                headers["x-request-token"] = result.data.request_token;

                const resultTable = await fetch(`https://boardgamearena.com/table/table/tableinfos.html?id=${tableId}`, { headers })
                    .then(response => response.json())
                    .then(data => { return data; });

                const gameName = resultTable.data.result.game_name;

                if (gameName !== null) {
                    const jsonFileURL = chrome.runtime.getURL('data/table.json');

                    fetch(jsonFileURL).then(response => response.json())
                        .then(async data => {
                            const myludoId = data[gameName];
                            let href = '';

                            if (!myludoId) {
                                href = `https://www.myludo.fr/#!/search/${gameName}`;
                            }
                            else {
                                const result = [];

                                const resultUser = await fetch(`https://boardgamearena.com/my?who`, { headers })
                                    .then(response => response.json())
                                    .then(data => { return data; });

                                const connectedUser = resultUser.n; // username 

                                resultTable.data.result.player.forEach((item) => {
                                    result.push(`${item.name === connectedUser ? "Moi" : item.name}=${item.score}`);
                                    console.log(`${item.name} - place : ${item.gamerank} - score : ${item.score}`);
                                });

                                console.log("date de fin : " + resultTable.data.result.time_end);
                                console.log("coop : " + resultTable.data.result.is_coop);
                                // abandon_by_decision => partie pas terminé
                                // normal_end => partie terminé
                                console.log("endgame_reason : " + resultTable.data.result.endgame_reason);

                                href = `https://www.myludo.fr/#!/game/${myludoId}?bga2myludo=1&${result.join("&")}`
                            }

                            const link = document.createElement("a");
                            link.href = href;
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