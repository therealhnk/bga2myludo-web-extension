import { BackgroundMessages } from "~core/models/backgroundMessages";

export default class myludoService {
    static async isConnected(): Promise<boolean> {
        return chrome.runtime.sendMessage({ message: BackgroundMessages.GET_MYLUDO_USER })
            // wait for PLASMO 0.85+ for fix !
            //return await sendToBackground({ name: BackgroundMessages.GET_MYLUDO_USER })
            .then(response => { return response; })
            .catch(() => { return false; });
    }

    static async hasPermission(): Promise<boolean> {
        return chrome.permissions
            .contains({ origins: ['https://www.myludo.fr/*'] })
            .then((result: boolean) => { return result; })
            .catch(() => { return false });
    }

    static async requestPermission() {
        chrome.permissions.request({ origins: ['https://www.myludo.fr/*'] });
    }
}