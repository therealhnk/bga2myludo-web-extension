import { BackgroundMessages } from "~core/models/backgroundMessages";
import boardGameArenaRepository from "~core/repositories/boardGameArenaRepository";
import myludoRepository from "~core/repositories/myludoRepository";

export { };

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    let result = null;
    switch (request.message) {
        case BackgroundMessages.GET_BGA_TABLE:
            result = await boardGameArenaRepository.getTable(request.tableId);
            break;
        case BackgroundMessages.GET_BGA_USER:
            result = await boardGameArenaRepository.getUser();
            break;
        case BackgroundMessages.GET_BGA_FRIENDS:
            result = await boardGameArenaRepository.getFriends();
            break;
        case BackgroundMessages.GET_MYLUDO_USER:
            result = await myludoRepository.getUser();
            break;
    }

    sendResponse(result);

    return true;
});

chrome.runtime.onInstalled.addListener(function (object) {
    let showBoarding = false;
    if (object.reason === "install") {
        showBoarding = true;
    }

    if (object.reason === "update") {
        const manifestData = chrome.runtime.getManifest();

        const currentMajorVersion = manifestData.version.substring(0, 3);
        const previousMajorVersion = object.previousVersion.substring(0, 3);

        if (currentMajorVersion !== previousMajorVersion) {
            showBoarding = true;
        }
    }

    if (showBoarding) {
        chrome.tabs.create({ url: chrome.runtime.getURL('tabs/onboarding.html') });
    }
});