import { BackgroundMessages } from "~core/models/backgroundMessages";
import type { Friend, FriendsResponse } from "~core/models/boardGameArena/friendsResponse";
import type { WhoResponse } from "~core/models/boardGameArena/whoResponse";
import type { Table } from "~core/models/table";
import configurationService from "./configurationService";

export default class boardGameArenaService {
    static async getTableInformations(tableId: string) {
        const realTimeMode = ["0", "1", "2", "5", "9", 0, 1, 2, 5, 9];

        const connectedUser = await chrome.runtime.sendMessage({ message: BackgroundMessages.GET_BGA_USER })

        if (!connectedUser) return null;

        const response = await chrome.runtime.sendMessage({ message: BackgroundMessages.GET_BGA_TABLE, tableId: tableId });

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
        return chrome.runtime.sendMessage({ message: BackgroundMessages.GET_BGA_TOKEN })
            .then((token: string) => {
                return boardGameArenaService
                    .fetch<FriendsResponse>(`https://boardgamearena.com/community/community/friends.html`, token)
                    .then(response => {
                        if (!response.data && !response.data.friends) {
                            return [];
                        }
                        else {
                            return response.data.friends;
                        }
                    });
            })
            .catch(() => { return []; });
    }

    static async isConnected() {
        return fetch(`https://boardgamearena.com/my?who`, {})
            .then(response => { return response.json() })
            .then(response => { return response as WhoResponse })
            .then(response => { return !response.error; })
            .catch(() => { return false });
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

    static async fetch<T>(url: string, requestToken: string) {
        const headers = new Headers([["x-request-token", requestToken]]);

        return fetch(url, { headers }).then(response => response.json() as T);
    }
}