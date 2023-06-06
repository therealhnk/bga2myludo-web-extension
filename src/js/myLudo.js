chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === 'myLudoUpdated') {
            patch()
        }
    }
);

function patch() {
    console.log("myLudo.js");
}

patch();