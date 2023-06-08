const intervalID = setInterval(patch, 125);

function patch() {
    if (!window.location.href.startsWith("https://www.myludo.fr/#!/game/")) {
        clearInterval(intervalID);
        return;
    }

    const url = window.location.href;

    const addPlayButton = document.getElementsByClassName('btn-play-open');

    if (url.includes("bga2myludo") && addPlayButton.length > 0) {
        clearInterval(intervalID);

        let parameters = [];
        url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (match, name, value) {
            if (name != "bga2myludo") {
                parameters.push({ player: decodeURIComponent(name), score: decodeURIComponent(value) });
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
                    const currentScoreLabel = document.querySelectorAll(`label[for="score-${index}"]`);

                    currentPlayer.value = elt.player;
                    currentScore.value = elt.score;
                    currentScoreLabel[0].classList.add("active");
                });
				
				document.getElementById(`location`).value = "Board Game Arena";

                document.getElementsByClassName('modal-content').item(0).scrollIntoView();

                clearInterval(intervalPopupID);
            }
        }, 125);

        window.location.href = window.location.href.replace(/[?&][^=]+=[^&]+/g, "");
    }
}