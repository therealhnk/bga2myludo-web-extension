export { };

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getMyludoConnectedStatus') {
        //récupérer la home page pour récupérer le x-csrf-token dans les balises meta
        fetch("https://www.myludo.fr/", { method: "GET" })
            .then(response => { return response.text() })
            .then(response => {
                var regex = /<meta\s+name="csrf-token"\s+content="([^"]+)"/;

                var match = response.match(regex);

                if (match) {
                    var csrfToken = match[1];

                    const headers = new Headers([["X-Csrf-Token", csrfToken]]);
                    fetch("https://www.myludo.fr/views/login/datas.php?type=init", { method: "GET", headers })
                        .then(response => { return response.json(); })
                        .then(response => sendResponse(response.user))
                        .catch(() => sendResponse(false))
                }
            })
            .catch(() => sendResponse(false));
    }

    if (request.message === 'getBGAToken') {
        //récupérer la home page pour récupérer le x-csrf-token dans les balises meta
        fetch("https://boardgamearena.com/", { method: "GET" })
            .then(response => { return response.text() })
            .then(response => {
                const regex = /requestToken:\s+'([^']+)'/;

                const requestToken = response.match(regex);
                sendResponse(requestToken[1])
            })
            .catch(() => sendResponse(null));
    }

    return true;
});

chrome.runtime.onInstalled.addListener(function (object) {
    let showBoarding = false;
    if (object.reason === "install") {
        showBoarding = true;
    }

    if (object.reason === "update") {
        const manifestData = chrome.runtime.getManifest();

        const currentMajorVersion = manifestData.version.charAt(0);
        const previousMajorVersion = object.previousVersion.charAt(0);

        if (currentMajorVersion !== previousMajorVersion) {
            showBoarding = true;
        }
    }

    if (showBoarding) {
        chrome.tabs.create({ url: `chrome-extension://${chrome.runtime.id}/tabs/onboarding.html` });
    }
});