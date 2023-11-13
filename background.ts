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
    return true;
});

chrome.runtime.onInstalled.addListener(function (object) {
    chrome.tabs.create({ url: `chrome-extension://${chrome.runtime.id}/options.html` });
});