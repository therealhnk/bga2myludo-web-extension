import { BackgroundMessages } from "~core/models/backgroundMessages";
import type { Friend } from "~core/models/boardGameArena/friendsResponse";
import type { Table } from "~core/models/table";
import configurationService from "./configurationService";

export default class boardGameArenaService {
    static async getTableInformations(tableId: string) {
        const realTimeMode = ["0", "1", "2", "5", "9", 0, 1, 2, 5, 9];

        const connectedUser = await chrome.runtime.sendMessage({ message: BackgroundMessages.GET_BGA_USER })
            // wait for PLASMO 0.85+ for fix !
            //const connectedUser = await sendToBackground({ name: BackgroundMessages.GET_BGA_USER })
            .then(response => { return response; })
            .catch(() => { return [] });

        if (!connectedUser) return null;

        const response = await chrome.runtime.sendMessage({ message: BackgroundMessages.GET_BGA_TABLE, tableId: tableId })
            // wait for PLASMO 0.85+ for fix !
            //const response = await sendToBackground({ name: BackgroundMessages.GET_BGA_TABLE, body: { tableId: tableId } })
            .then(response => { return response; })
            .catch(() => { return [] });

        if (!response) return null;

        const configuration = await configurationService.get();

        const table: Table = {
            tableId: tableId,
            players: [],
            end: response.data.result.time_end,
            isCooperative: response.data.result.is_coop,
            isSolo: response.data.result.is_solo,
            isAbandoned: response.data.result.endgame_reason !== 'normal_end',
            gameId: response.data.game_name,
            duration: realTimeMode.includes(response.data.options[200]?.value) ? Math.floor(Number(response.data.result.time_duration) / 60) : undefined
        };

        response.data.result.player.forEach((item) => {
            let playerName = item.name;

            if (playerName === connectedUser.nickname &&
                configuration.customizeCurrentPlayer &&
                configuration.customCurrentPlayerName) {
                playerName = configuration.customCurrentPlayerName;
            }

            table.players.push({
                name: playerName,
                score: item.score ? Number(item.score) : null,
                rank: item.gamerank ? Number(item.gamerank) : null
            });
        });

        return table;
    }

    static async getFriends(): Promise<Friend[]> {
        return chrome.runtime.sendMessage({ message: BackgroundMessages.GET_BGA_FRIENDS })
            //return await sendToBackground({ name: BackgroundMessages.GET_BGA_FRIENDS })
            .then(response => { return response; })
            .catch(() => { return [] });
    }

    static async isConnected() {
        return chrome.runtime.sendMessage({ message: BackgroundMessages.GET_BGA_USER })
            //        return sendToBackground({ name: BackgroundMessages.GET_BGA_USER })
            .then(response => { return response; })
            .catch(() => { return false; });
    }

    static async hasPermission(): Promise<boolean> {
        return chrome.permissions
            .contains({ origins: ['https://boardgamearena.com/*'] })
            .then((result: boolean) => { return result; })
            .catch(() => { return false });
    }

    static async requestPermission() {
        chrome.permissions.request({ origins: ['https://boardgamearena.com/*'] });
    }
}