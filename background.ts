import { BackgroundMessages } from "~core/models/backgroundMessages";
import type { TableInfos } from "~core/models/boardGameArena/tableInfosResponse";
import type { WhoResponse } from "~core/models/boardGameArena/whoResponse";
import type { User } from "~core/models/user";

export { };

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    let result = null;
    switch (request.message) {
        case BackgroundMessages.GET_BGA_TABLE:
            result = await getBgaTable(request.tableId);
            break;
        case BackgroundMessages.GET_BGA_USER:
            result = await getBgaUser();
            break;
        case BackgroundMessages.GET_BGA_FRIENDS:
            result = await getBgaFriends();
            break;
        case BackgroundMessages.GET_MYLUDO_USER:
            result = await getMyludoUser();
            break;
    }

    sendResponse(result);

    return true;
});

async function getBgaTable(tableId) {
    const headers = await getBgaHeaders();

    if (!headers) return null;

    return fetch(`https://boardgamearena.com/table/table/tableinfos.html?id=${tableId}`, { headers })
        .then(response => { return response.json() })
        .then(response => { return response as TableInfos })
        .catch(() => { return null; });
}

async function getBgaUser() {
    return fetch(`https://boardgamearena.com/my?who`, {})
        .then(response => { return response.json() })
        .then(response => { return response as WhoResponse })
        .then(response => {
            return {
                id: response.id,
                nickname: response.n
            } as User;
        }).catch(() => { return null; });
}

async function getMyludoUser() {
    const headers = await getMyludoHeaders();

    if (!headers) return null;

    return fetch(`https://www.myludo.fr/views/login/datas.php?type=init`, { method: "GET", headers })
        .then(response => { return response.json(); })
        .then(response => response.user)
        .catch(() => { return null; });
}

async function getBgaFriends() { }

async function getBgaHeaders() {
    //récupérer la home page pour récupérer le requestToken dans les balises meta
    return fetch("https://boardgamearena.com/", { method: "GET" })
        .then(response => { return response.text() })
        .then(response => {
            const regex = /requestToken:\s+'([^']+)'/;
            return new Headers([["x-request-token", response.match(regex)[1]]]);
        })
        .catch(() => { return null; })
}

async function getMyludoHeaders() {
    //récupérer la home page pour récupérer le x-csrf-token dans les balises meta
    return fetch("https://www.myludo.fr/", { method: "GET" })
        .then(response => { return response.text() })
        .then(response => {
            var regex = /<meta\s+name="csrf-token"\s+content="([^"]+)"/;
            return new Headers([["X-Csrf-Token", response.match(regex)[1]]]);
        })
        .catch(() => { return null; })
}

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