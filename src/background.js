chrome.tabs.onUpdated.addListener(
    function (tabId, changeInfo, tab) {
        if (changeInfo.status === 'complete') {
            if (request.url.startWith("https://boardgamearena.com/table?table=")) {
                chrome.tabs.sendMessage(tabId, { message: 'bgaUpdated' });
            }
            if (request.url.startWith("https://www.myludo.fr/#!/game/")) {
                chrome.tabs.sendMessage(tabId, { message: 'myLudoUpdated' });
            }
        }
    }
);