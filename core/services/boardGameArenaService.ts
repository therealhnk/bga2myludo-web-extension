import type { Friend, FriendsResponse } from "~core/models/boardGameArena/friendsResponse";
import type { GameStatsParameters } from "~core/models/boardGameArena/gameStatsParameters";
import type { GetGamesResponse } from "~core/models/boardGameArena/getGamesResponse";
import type { TableInfos } from "~core/models/boardGameArena/tableInfosResponse";
import type { WhoResponse } from "~core/models/boardGameArena/whoResponse";
import type { Table } from "~core/models/table";
import type { User } from "~core/models/user";
import configurationService from "./configurationService";

export default class boardGameArenaService {
    static async getGameStats(requestToken: string, connectedUser: User, parameters: GameStatsParameters) {
        const tables: Table[] = [];

        let url = `https://boardgamearena.com/gamestats/gamestats/getGames.html?`;
        url += `player=${parameters.player}`;
        url += `&updateStats=${parameters.page === 1 ? 1 : 0}`;
        url += `&page=${parameters.page}`;
        url += `&opponent_id=${parameters.opponentId ? parameters.opponentId : 0}`;
        url += `&finished=${parameters.finished ? parameters.finished : 0}`;
        url += parameters.gameId ? `&game_id=${parameters.gameId}` : '';
        url += parameters.startDate ? `&start_date=${parameters.startDate}` : '';
        url += parameters.endDate ? `&end_date=${parameters.endDate}` : '';

        return configurationService
            .get()
            .then((configuration) => {
                return boardGameArenaService
                    .fetch<GetGamesResponse>(url, requestToken)
                    .then(response => {
                        response.data.tables.forEach(current => {
                            const player_names = current.player_names.split(',');
                            const ranks = current.ranks ? current.ranks.split(',') : null;
                            const scores = current.scores ? current.scores.split(',') : null;

                            const table: Table = {
                                tableId: current.table_id,
                                players: [],
                                end: new Date(Number(current.end) * 1000),
                                isCooperative: false,
                                isSolo: false,
                                isAbandoned: current.normalend === "0",
                                gameId: current.game_name
                            };

                            player_names.forEach((value, index) => {
                                let playerName = value;

                                if (playerName === connectedUser.nickname &&
                                    configuration.customizeCurrentPlayer &&
                                    configuration.customCurrentPlayerName) {
                                    playerName = configuration.customCurrentPlayerName;
                                }

                                table.players.push({
                                    name: playerName,
                                    score: scores ? Number(scores[index]) : null,
                                    rank: ranks ? Number(ranks[index]) : null
                                });
                            });

                            tables.push(table);
                        });

                        return tables;
                    });
            });
    }

    static async getGamesFromTable(requestToken: string, connectedUser: User, tableId: number) {
        const url = `https://boardgamearena.com/table/table/tableinfos.html?id=${tableId}`;
        const realTimeMode = ["0", "1", "2", "5", "9", 0, 1, 2, 5, 9];

        return configurationService
            .get()
            .then((configuration) => {
                return boardGameArenaService
                    .fetch<TableInfos>(url, requestToken)
                    .then(response => {
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
                    });
            });
    }

    static async getUser() {
        return fetch(`https://boardgamearena.com/my?who`, {})
            .then(response => { return response.json() })
            .then(response => { return response as WhoResponse })
            .then(response => {
                if (response.error) {
                    return null;
                }
                else {
                    return {
                        id: response.id,
                        nickname: response.n
                    } as User
                }
            });
    }

    static async getFriends(): Promise<Friend[]> {
        return chrome.runtime.sendMessage({ message: "getBGAToken" })
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