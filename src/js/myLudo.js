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

        const urlParams = new URL(`https://fake.com?${url.split("?")[1]}`).searchParams;
        const data = JSON.parse(urlParams.get("bga2myludo_data"));

        addPlayButton.item(0).click();

        const intervalPopupID = setInterval(() => {
            const addPlayerButton = document.getElementsByClassName('btn-add-player');

            if (addPlayerButton.length > 0) {
                clearInterval(intervalPopupID);

                if (data.isCooperative) document.getElementById('coop').click();
                if (data.isSolo) document.getElementById('solo').click();
                if (data.isAbandoned) document.getElementById('incomplete').click();
                // Reste à ajouter :
                // - La date via data.end

                if (data.isSolo) {
                    const currentPlayer = document.getElementById(`name-0`);
                    document.querySelectorAll(`label[for="name-0"]`)[0].click();
                    currentPlayer.value = data.players[0].name;

                    const currentScore = document.getElementById(`score-0`);
                    document.querySelectorAll(`label[for="score-0"]`)[0].click();
                    currentScore.value = data.players[0].score;
                }
                else {
                    data.players.forEach((elt, index) => {
                        addPlayerButton.item(0).click();

                        const currentPlayer = document.getElementById(`name-${index}`);
                        document.querySelectorAll(`label[for="name-${index}"]`)[0].click();
                        currentPlayer.value = elt.name;

                        const currentScore = document.getElementById(`score-${index}`);
                        document.querySelectorAll(`label[for="score-${index}"]`)[0].click();
                        currentScore.value = elt.score;

                        if (elt.rank === "1") {
                            currentPlayer.closest('.card-content').getElementsByClassName('btn-winner-player')[0].click();
                        }
                    });
                }

                const location = document.getElementById(`location`);
                document.querySelectorAll(`label[for="location"]`)[0].click();
                location.value = "Board Game Arena";

                const message = document.getElementById(`message`);
                document.querySelectorAll(`label[for="message"]`)[0].click();
                message.value = "Créé à l'aide de BGA2MyLudo";
            }
        }, 500);

        window.location.href = window.location.href.replace(/[?&][^=]+=[^&]+/g, "");
    }
}