import { Storage } from "@plasmohq/storage";
import type { PlayerNotification } from "~core/models/playerNotification";
import boardGameArenaRepository from "~core/repositories/boardGameArenaRepository";

chrome.runtime.onInstalled.addListener(async ({ reason, previousVersion }) => {
    let showBoarding = false;
    if (reason === "install") {
        showBoarding = true;
    }

    if (reason === "update") {
        const manifestData = chrome.runtime.getManifest();

        const currentMajorVersion = manifestData.version.substring(0, 3);
        const previousMajorVersion = previousVersion.substring(0, 3);

        if (currentMajorVersion !== previousMajorVersion) {
            showBoarding = true;
        }
    }

    if (showBoarding) {
        chrome.tabs.create({ url: chrome.runtime.getURL('tabs/onboarding.html') });
    }

    await chrome.alarms.create('check-notifications', {
        when: Date.now(),
        periodInMinutes: 1
    });
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
    const storage = new Storage({ area: "local" });

    let lastNotifications: PlayerNotification[] = [];
    const lastNotificationsSerialized = await storage.get('lastNotifications');

    if (lastNotificationsSerialized) {
        lastNotifications = JSON.parse(lastNotificationsSerialized) as PlayerNotification[];
    }

    console.error("refresh notifications : " + lastNotifications && lastNotifications.length > 0 ? `${lastNotifications[0].id} : ${lastNotifications[0].timestamp}` : "from start");
    console.error(JSON.stringify(lastNotifications));
    console.error(JSON.stringify(lastNotifications[0]));

    boardGameArenaRepository.getPlayerNotifications(lastNotifications && lastNotifications.length > 0 ? lastNotifications[0] : null)
        .then(response => {
            storage.set("lastNotifications", JSON.stringify(response));
        });
    // chrome.action.setIcon({
    //     path: getIconPath(alarm.name),
    // });
})