export default class timeHelper {
    static getTextualTimeAgo = (time: number) => {
        const millisecondsDifference = new Date().getTime() - time;
        const minutes = Math.floor(millisecondsDifference / (1000 * 60));

        const minutesParHeure = 60;
        const secondesParJour = 1440;

        if (minutes >= secondesParJour) {
            const jours = Math.ceil(minutes / secondesParJour);
            return `${jours} ${chrome.i18n.getMessage("notificationsdateAgoSuffixDay")}${jours > 1 ? 's' : ''}`;
        } else if (minutes >= minutesParHeure) {
            const heures = Math.floor(minutes / minutesParHeure);
            return `${heures} ${chrome.i18n.getMessage("notificationsdateAgoSuffixHour")}${heures > 1 ? 's' : ''}`;
        } else {
            return `${minutes} ${chrome.i18n.getMessage("notificationsdateAgoSuffixMinute")}${minutes > 1 ? 's' : ''}`;
        }
    };
}