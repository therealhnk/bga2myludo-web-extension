import { sendToBackground } from "@plasmohq/messaging";
import { BackgroundMessages } from "~core/models/backgroundMessages";

export default class myludoService {
    static async isConnected() {
        return sendToBackground({ name: BackgroundMessages.GET_MYLUDO_USER })
            .then(response => {
                return response.message;
            })
            .catch(() => { return false; });
    }

    static async hasPermission() {
        return chrome.permissions
            .contains({ origins: ['https://www.myludo.fr/*'] })
            .then((result: boolean) => { return result; })
            .catch(() => { return false });
    }

    static async requestPermission() {
        chrome.permissions.request({ origins: ['https://www.myludo.fr/*'] });
    }
}