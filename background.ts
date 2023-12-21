import { BackgroundMessages } from "~core/models/backgroundMessages";
import type { TableInfos } from "~core/models/boardGameArena/tableInfosResponse";
import type { WhoResponse } from "~core/models/boardGameArena/whoResponse";
import type { User } from "~core/models/user";

export { };

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === BackgroundMessages.GET_MYLUDO_TOKEN) {
        //récupérer la home page pour récupérer le x-csrf-token dans les balises meta
        fetch("https://www.myludo.fr/", { method: "GET" })
            .then(response => { return response.text() })
            .then(response => {
                var regex = /<meta\s+name="csrf-token"\s+content="([^"]+)"/;

                const requestToken = response.match(regex);

                sendResponse(requestToken[1]);
            })
            .catch(() => sendResponse(null));
    }

    if (request.message === BackgroundMessages.GET_BGA_TOKEN) {
        //récupérer la home page pour récupérer le requestToken dans les balises meta
        fetch("https://boardgamearena.com/", { method: "GET" })
            .then(response => { return response.text() })
            .then(response => {
                const regex = /requestToken:\s+'([^']+)'/;

                const requestToken = response.match(regex);

                sendResponse(requestToken[1]);
            })
            .catch(() => sendResponse(null));
    }

    if (request.message === BackgroundMessages.GET_BGA_TABLE) {
        fetch("https://boardgamearena.com/", { method: "GET" })
            .then(response => { return response.text() })
            .then(response => {
                const regex = /requestToken:\s+'([^']+)'/;

                const requestToken = response.match(regex);

                const headers = new Headers([["x-request-token", requestToken[1]]]);

                fetch(`https://boardgamearena.com/table/table/tableinfos.html?id=${request.tableId}`, { headers })
                    .then(response => { return response.json() })
                    .then(response => { return response as TableInfos })
                    .then(response => { sendResponse(response); })
                    .catch(() => sendResponse(null));
            })
            .catch(() => sendResponse(null));
    }

    if (request.message === BackgroundMessages.GET_BGA_USER) {
        return fetch(`https://boardgamearena.com/my?who`, {})
            .then(response => { return response.json() })
            .then(response => { return response as WhoResponse })
            .then(response => {
                sendResponse({
                    id: response.id,
                    nickname: response.n
                } as User);
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