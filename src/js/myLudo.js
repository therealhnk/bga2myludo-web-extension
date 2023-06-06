chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === 'myLudoUpdated') {
            patch()
        }
    }
);

let intervalID = setInterval(patch, 250);

function patch() {
    console.log("myLudo.js");

    const url = window.location.href;

    const addPlayButton = document.getElementsByClassName('btn-play-open');

    if (url.includes("bga2myludo") && addPlayButton.length > 0) {
        clearInterval(intervalID);

        let parameters = {};
        url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (match, name, value) {
            if (name != "bga2myludo") parameters[name] = decodeURIComponent(value);
        });

        addPlayButton.item(0).click();

        window.location.href = window.location.href.replace(/[?&][^=]+=[^&]+/g, "");
    }
}