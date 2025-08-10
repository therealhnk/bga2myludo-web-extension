
import configurationService from "~core/services/configurationService";

export default class boardGameArenaHelper {
    static async getMyLudoLink(tableId: string, gameId: string | null) {
        const link = document.createElement("a");
        link.target = "_blank";
        link.classList.add("myludo-browser-extension-button");

        try {
            // Si gameId est null, retourner un lien en erreur
            if (!gameId) {
                link.href = "https://www.myludo.fr/#!/contact/technique";
                link.textContent = chrome.i18n.getMessage("linkErrorText");
                return link;
            }
            // Vérifier si le jeu est mappé dans games.json
            const gameInfo = await configurationService.getGame(gameId);

            if (gameInfo && gameInfo.currentMyludoId) {
                // Jeu mappé - redirection directe vers la page du jeu
                link.href = `https://www.myludo.fr/#!/game/${gameInfo.currentMyludoId}/plays?bgatableid=${tableId}`;
                link.textContent = chrome.i18n.getMessage("myludoLinkText");
            } else {
                // Jeu non mappé - lien vers contact technique
                link.href = "https://www.myludo.fr/#!/contact/technique";
                link.textContent = chrome.i18n.getMessage("gameUnavailableText");
                link.title = chrome.i18n.getMessage("gameUnavailableTooltip");
            }
        } catch (error) {
            console.error("Error creating Myludo link:", error);
            // Fallback en cas d'erreur
            link.href = "https://www.myludo.fr/#!/contact/technique";
            link.textContent = chrome.i18n.getMessage("linkErrorText");
        }

        return link;
    }

    static async getMyLudoButton(tableId: string, gameId: string | null) {
        const link = document.createElement("a");
        link.target = "_blank";
        link.classList.add("myludo-browser-extension-button");
        link.classList.add("action-button");
        link.classList.add("bgabutton");
        link.style.cssText = "display: inline;";

        try {
            // Si gameId est null, retourner un bouton en erreur
            if (!gameId) {
                link.href = "https://www.myludo.fr/#!/contact/technique";
                link.textContent = chrome.i18n.getMessage("linkErrorText");
                link.classList.add("bgabutton_red");
                return link;
            }
            // Vérifier si le jeu est mappé dans games.json
            const gameInfo = await configurationService.getGame(gameId);

            if (gameInfo && gameInfo.currentMyludoId) {
                // Jeu mappé - redirection directe vers la page du jeu
                link.href = `https://www.myludo.fr/#!/game/${gameInfo.currentMyludoId}/plays?bgatableid=${tableId}`;
                link.textContent = chrome.i18n.getMessage("myLudoLinkText");
                link.classList.add("bgabutton_darkgray");
            } else {
                // Jeu non mappé - lien vers contact technique
                link.href = "https://www.myludo.fr/#!/contact/technique";
                link.textContent = chrome.i18n.getMessage("gameUnavailableText");
                link.classList.add("bgabutton_red");
                link.title = chrome.i18n.getMessage("gameUnavailableTooltip");
            }
        } catch (error) {
            console.error("Error creating Myludo link:", error);
            // Fallback en cas d'erreur
            link.href = "https://www.myludo.fr/#!/contact/technique";
            link.textContent = chrome.i18n.getMessage("linkErrorText");
            link.classList.add("bgabutton_red");
        }

        return link;
    }

    static extractGameIdFromIcon(iconElement: Element): string | null {
        try {
            // Extraire l'ID du jeu depuis le style background-image
            const style = iconElement.getAttribute('style');
            if (!style) return null;

            // Pattern pour extraire: gamemedia/{gameId}/icon
            const match = style.match(/gamemedia\/([^\/]+)\/icon/);
            if (match && match[1]) {
                return match[1];
            }

            return null;
        } catch (error) {
            console.error("Error extracting game ID from icon:", error);
            return null;
        }
    }

    static extractGameIdFromTablePage(): string | null {
        try {
            // Chercher dans #pageheader .game_image_box img.game_image
            const gameImage = document.querySelector('#pageheader .game_image_box img.game_image');
            if (!gameImage) return null;

            const src = gameImage.getAttribute('src');
            if (!src) return null;

            // Pattern pour extraire: gamemedia/{gameId}/box
            const match = src.match(/gamemedia\/([^\/]+)\/box/);
            if (match && match[1]) {
                return match[1];
            }

            return null;
        } catch (error) {
            console.error("Error extracting game ID from table page:", error);
            return null;
        }
    }

    static extractGameIdFromEndGamePage(): string | null {
        try {
            // Extraire depuis l'URL: https://boardgamearena.com/1/yatzy?table=712581227
            // Le gameId se trouve entre le dernier / et ?table
            const url = window.location.href;
            const match = url.match(/\/([^\/]+)\?table=/);
            if (match && match[1]) {
                return match[1];
            }

            return null;
        } catch (error) {
            console.error("Error extracting game ID from end game page:", error);
            return null;
        }
    }
}