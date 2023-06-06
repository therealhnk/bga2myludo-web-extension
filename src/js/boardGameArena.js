chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === 'bgaUpdated') {
            patch();
        }
    });

function patch() {
    console.log("boardGameArena.js");
    var rematchButton = document.getElementById("rematch");

    if (rematchButton !== null) {
        var displayStyle = window.getComputedStyle(rematchButton).display;

        if (displayStyle !== 'none' || displayStyle !== 'hide') {
            var bgaButtonBar = document.getElementsByClassName("bgabuttonbar");

            if (bgaButtonBar !== null && bgaButtonBar.length > 0) {
                var game = document.getElementById('table_name');

                if (game !== null) {
                    const jsonFileURL = chrome.runtime.getURL('locales/fr.json');

                    fetch(jsonFileURL).then(response => response.json())
                        .then(data => {
                            const myludoId = data[game.innerText];

                            if (!myludoId) {
                                console.warn(`[bga2myludo]missing myludo id for ${game.innerText}`);
                                return;
                            }

                            var link = document.createElement("a");
                            link.href = `https://www.myludo.fr/#!/game/${myludoId}`;
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

patch();