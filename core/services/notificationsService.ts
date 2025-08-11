import { Storage } from "@plasmohq/storage";
import timeHelper from "~core/helpers/timeHelper";
import type { PlayerNotification } from "~core/models/playerNotification";
import configurationService from "~core/services/configurationService";

export default class notificationsService {
    static async updateNotifications(notifications: PlayerNotification[]) {
        const lastNotifications = await notificationsService.getLastNotifications();
        let notificationsCount = await notificationsService.getNotificationsCount();

        if (notifications && notifications.length > 0) {
            for (const notification of notifications) {
                const alreadyExist = lastNotifications.find(o => o.id === notification.id);
                if (!alreadyExist) {
                    // Récupérer l'ID MyLudo avant d'ajouter dans le storage
                    const gameInfo = await configurationService.getGame(notification.bgaGameId);
                    notification.myLudoGameId = gameInfo?.currentMyludoId;
                    
                    lastNotifications.push(notification);
                    notificationsCount++;
                }
            }

            const storage = new Storage({ area: "local" });

            storage.set('lastNotifications', JSON.stringify(lastNotifications.sort((x, y) => y.timestamp - x.timestamp).slice(0, 99)));

            notificationsService.setNotificationsCount(notificationsCount);
        }
    }

    static async getLastNotifications() {
        const storage = new Storage({ area: "local" });

        return storage.get('lastNotifications')
            .then(result => {
                if (result) {
                    const notifications = JSON.parse(result) as PlayerNotification[];

                    notifications.forEach(o => {
                        o.timeAgoText = timeHelper.getTextualTimeAgo(o.timestamp);
                    });

                    return notifications;
                }
                else {
                    return [] as PlayerNotification[];
                }
            })
    }

    static async setNotificationsCount(count: number) {
        const storage = new Storage({ area: "local" });

        storage.set('notificationsCount', count);

        if (count > 0) {
            chrome.action.setBadgeTextColor({ color: "white" });
            chrome.action.setBadgeBackgroundColor({ color: '#404a86' });
            chrome.action.setBadgeText({ text: count > 99 ? "99+" : count.toString() });
        }
        else {
            chrome.action.setBadgeText({ text: '' });
        }
    }

    static async getNotificationsCount() {
        const storage = new Storage({ area: "local" });

        return storage.get('notificationsCount').then(result => {
            if (result) {
                return Number(result);
            }
            else {
                return 0;
            }
        });
    }

    static async clearStorage() {
        const storage = new Storage({ area: "local" });
        
        // Supprimer les notifications et le compteur
        await storage.remove('lastNotifications');
        await storage.remove('notificationsCount');
        
        // Réinitialiser le badge
        chrome.action.setBadgeText({ text: '' });
    }
}