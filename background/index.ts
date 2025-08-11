import boardGameArenaRepository from "~core/repositories/boardGameArenaRepository";
import notificationsService from "~core/services/notificationsService";

chrome.runtime.onInstalled.addListener(async ({ reason, previousVersion }) => {
    const manifestData = chrome.runtime.getManifest();

    let showBoarding = false;
    if (reason === "install") {
        showBoarding = true;
    }

    if (reason === "update" && previousVersion) {
        const currentMinorVersion = manifestData.version.substring(0, 3);
        const previousMinorVersion = previousVersion.substring(0, 3);

        if (currentMinorVersion !== previousMinorVersion) {
            showBoarding = true;
        }

        // Migration v3.x.x vers v4.x.x : nettoyer le storage des notifications
        const currentMajor = parseInt(manifestData.version.split('.')[0]);
        const previousMajor = parseInt(previousVersion.split('.')[0]);

        if (previousMajor < 4 && currentMajor >= 4) {
            // Breaking change : structure PlayerNotification modifiée
            await notificationsService.clearStorage();
        }
    }

    if (showBoarding) {
        chrome.tabs.create({ url: chrome.runtime.getURL('tabs/onboarding.html') });
    }

    await chrome.alarms.create('check-notifications', {
        when: Date.now() + 10000,
        periodInMinutes: 10
    });
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
    boardGameArenaRepository.getPlayerNotifications()
        .then(response => {
            notificationsService.updateNotifications(response);
        });
})