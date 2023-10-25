export default class myludoService {
    static async isConnected() {
        return new Promise(resolve => { chrome.runtime.sendMessage({ message: "getMyludoConnectedStatus" }, resolve) })
            .then(response => { return response as boolean; })
            .catch(() => { return false });
    }
}