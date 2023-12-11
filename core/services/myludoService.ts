import { BackgroundMessages } from "~core/models/backgroundMessages";

export default class myludoService {
    static async isConnected(): Promise<boolean> {
        return chrome.runtime.sendMessage({ message: BackgroundMessages.GET_MYLUDO_TOKEN })
            .then(response => {
                if (response === null) return false;

                const headers = new Headers([["X-Csrf-Token", response]]);

                return fetch("https://www.myludo.fr/views/login/datas.php?type=init", { method: "GET", headers })
                    .then(response => { return response.json(); })
                    .then(response => response.user);
            })
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