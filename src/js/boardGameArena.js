let intervalID = setInterval(patch, 250);

function patch() {
    if (!window.location.href.startsWith("https://boardgamearena.com/table?table=")) {
        return;
    }

    if (document.getElementById("myludo_browserextension") !== null) return;

    const scores = document.getElementsByClassName('score-entry');

    if (scores.length === 0) return;

    const rematchButton = document.getElementById("rematch");

    if (rematchButton !== null) {
        const displayStyle = window.getComputedStyle(rematchButton).display;

        if (displayStyle !== 'none' || displayStyle !== 'hide') {
            const bgaButtonBar = document.getElementsByClassName("bgabuttonbar");

            if (bgaButtonBar !== null && bgaButtonBar.length > 0) {
                const game = document.getElementById('table_name');

                if (game !== null) {
                    const jsonFileURL = chrome.runtime.getURL('locales/fr.json');

                    fetch(jsonFileURL).then(response => response.json())
                        .then(data => {
                            const myludoId = data[game.innerText];

                            if (!myludoId) {
                                console.log(`[bga2myludo]missing myludo id for ${game.innerText}`);
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
                            link.classList.add("bgabutton_gray");
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
