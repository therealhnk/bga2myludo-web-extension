export default class documentHelper {
    static getFirstInputByName(name: string) {
        return document.getElementsByName(name)[0] as HTMLInputElement;
    }

    static getInputById(id: string) {
        return document.getElementById(id) as HTMLInputElement;
    }

    static getFirstHtmlElementByQuery(query: string) {
        return document.querySelector(query) as HTMLElement;
    }
}