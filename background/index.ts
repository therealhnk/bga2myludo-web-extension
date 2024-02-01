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
        periodInMinutes: 10
    });
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
    const storage = new Storage({ area: "local" });

    const lastNotificationsSerialized = await storage.get('lastNotifications');
    const notificationCountSerialized = await storage.get('notificationsCount');

    let lastNotifications: PlayerNotification[] = lastNotificationsSerialized ? JSON.parse(lastNotificationsSerialized) as [] : [];
    let notificationsCount = notificationCountSerialized ? Number(notificationCountSerialized) : 0;

    boardGameArenaRepository.getPlayerNotifications()
        .then(response => {
            if (response && response.length > 0) {
                response.forEach(notification => {
                    const alreadyExist = lastNotifications.find(o => o.id === notification.id);
                    if (!alreadyExist) {
                        lastNotifications.push(notification);
                        notificationsCount++;
                    }
                });

                storage.set("lastNotifications", JSON.stringify(
                    lastNotifications
                        .sort((x, y) => y.timestamp - x.timestamp)
                        .slice(0, 99)));

                storage.set("notificationsCount", notificationsCount);
            }

            if (notificationsCount > 0) {
                chrome.action.setBadgeTextColor({ color: "white" });
                chrome.action.setBadgeBackgroundColor({ color: '#d32f2f' });
                chrome.action.setBadgeText({ text: notificationsCount > 99 ? "99+" : notificationsCount.toString() });
            }
            else {
                chrome.action.setBadgeText({ text: '' });
            }
        });
})