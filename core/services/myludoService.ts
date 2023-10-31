export default class myludoService {
    static async isConnected() {
        return new Promise(resolve => { chrome.runtime.sendMessage({ message: "getMyludoConnectedStatus" }, resolve) })
            .then(response => { return response as boolean; })
            .catch(() => { return false });
    }
    static async hasPermission() {
        return new Promise(resolve => { chrome.runtime.sendMessage({ message: "getMyludoPermission" }, resolve) })
            .then(response => { return response as boolean; })
            .catch(() => { return false });
    }
    static async requestPermission() {
        return new Promise(resolve => { chrome.runtime.sendMessage({ message: "requestMyludoPermission" }, resolve) })
            .then(response => { return response as boolean; })
            .catch(() => { return false });
    }
}