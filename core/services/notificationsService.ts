import { Storage } from "@plasmohq/storage";
import timeHelper from "~core/helpers/timeHelper";
import type { PlayerNotification } from "~core/models/playerNotification";

export default class notificationsService {
    static async updateNotifications(notifications: PlayerNotification[]) {
        const lastNotifications = await notificationsService.getLastNotifications();
        let notificationsCount = await notificationsService.getNotificationsCount();

        if (notifications && notifications.length > 0) {
            notifications.forEach(notification => {
                const alreadyExist = lastNotifications.find(o => o.id === notification.id);
                if (!alreadyExist) {
                    lastNotifications.push(notification);
                    notificationsCount++;
                }
            });

            notificationsService.setLastNotifications(
                lastNotifications
                    .sort((x, y) => y.timestamp - x.timestamp)
                    .slice(0, 99));

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

    static async setLastNotifications(notifications: PlayerNotification[]) {
        const storage = new Storage({ area: "local" });

        storage.set('lastNotifications', JSON.stringify(notifications));
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
}