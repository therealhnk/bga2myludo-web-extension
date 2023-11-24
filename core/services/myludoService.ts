export default class myludoService {
    static async isConnected() {
        return chrome.runtime.sendMessage({ message: "getMyludoConnectedStatus" })
            .then(response => { return response as boolean; })
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