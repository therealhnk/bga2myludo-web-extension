
export default class boardGameArenaHelper {
    static getMyLudoLink(tableId: string) {
        const link = document.createElement("a");
        link.href = `https://www.myludo.fr/#!/?bgatableid=${tableId}`;
        link.target = "_blank"
        link.textContent = chrome.i18n.getMessage("myLudoLinkText");
        link.classList.add("action-button");
        link.classList.add("bgabutton");
        link.classList.add("bgabutton_darkgray");
        link.classList.add("myludo-browser-extension-button");
        link.style.cssText = "display: inline;"

        return link;
    }
}