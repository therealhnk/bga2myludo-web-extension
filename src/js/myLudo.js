chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === 'myLudoUpdated') {
            patch()
        }
    }
);

const intervalID = setInterval(patch, 250);

function patch() {
    console.log("myLudo.js");

    const url = window.location.href;

    const addPlayButton = document.getElementsByClassName('btn-play-open');

    if (url.includes("bga2myludo") && addPlayButton.length > 0) {
        clearInterval(intervalID);

        let parameters = [];
        url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (match, name, value) {
            if (name != "bga2myludo") {
                parameters.push({ player: name, score: decodeURIComponent(value) });
            }
        });

        addPlayButton.item(0).click();

        const intervalPopupID = setInterval(() => {
            const addPlayerButton = document.getElementsByClassName('btn-add-player');

            if (addPlayerButton.length > 0) {

                parameters.forEach((elt, index) => {
                    addPlayerButton.item(0).click();

                    const currentPlayer = document.getElementById(`name-${index}`);
                    const currentScore = document.getElementById(`score-${index}`);

                    currentPlayer.value = elt.player;
                    currentScore.value = elt.score;
                });

                clearInterval(intervalPopupID);
            }
        }, 250);

        window.location.href = window.location.href.replace(/[?&][^=]+=[^&]+/g, "");
    }
}