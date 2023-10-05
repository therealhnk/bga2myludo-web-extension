import type { GameStatsParameters } from "~core/models/boardGameArena/gameStatsParameters";
import type { GetGamesResponse, Table } from "~core/models/boardGameArena/getGamesResponse";
import type { TableInfos } from "~core/models/boardGameArena/tableInfosResponse";
import type { WhoResponse } from "~core/models/boardGameArena/whoResponse";
import type { Game } from "~core/models/table";
import type { User } from "~core/models/user";

export default class boardGameArenaService {
    static async getGameStats(requestToken: string, connectedUser: User, parameters: GameStatsParameters) {
        const games: Game[] = [];

        let url = `https://boardgamearena.com/gamestats/gamestats/getGames.html?`;
        url += `player=${parameters.player}`;
        url += `&updateStats=${parameters.page === 1 ? 1 : 0}`;
        url += `&page=${parameters.page}`;
        url += `&opponent_id=${parameters.opponentId ? parameters.opponentId : 0}`;
        url += `&finished=${parameters.finished ? parameters.finished : 0}`;
        url += parameters.gameId ? `&game_id=${parameters.gameId}` : '';
        url += parameters.startDate ? `&start_date=${parameters.startDate}` : '';
        url += parameters.endDate ? `&end_date=${parameters.endDate}` : '';

        return boardGameArenaService
            .fetch<GetGamesResponse>(url, requestToken)
            .then(response => {
                response.data.tables.forEach(table => {
                    const player_names = table.player_names.split(',');
                    const ranks = table.ranks ? table.ranks.split(',') : null;
                    const scores = table.scores ? table.scores.split(',') : null;

                    const game: Game = {
                        tableId: table.table_id,
                        players: [],
                        end: new Date(Number(table.end) * 1000),
                        isCooperative: false,
                        isSolo: false,
                        isAbandoned: table.normalend === 0,
                        gameId: table.game_name
                    };

                    player_names.forEach((value, index) => {
                        game.players.push({
                            name: value === connectedUser.nickname ? "Moi" : value,
                            score: scores ? Number(scores[index]) : null,
                            rank: ranks ? Number(ranks[index]) : null
                        });
                    });

                    games.push(game);
                });

                return games;
            });
    }

    static async getGamesFromTable(requestToken: string, connectedUser: User, tableId: number) {
        const url = `https://boardgamearena.com/table/table/tableinfos.html?id=${tableId}`;

        return boardGameArenaService
            .fetch<TableInfos>(url, requestToken)
            .then(response => {
                const game: Game = {
                    tableId: tableId,
                    players: [],
                    end: response.data.result.time_end,
                    isCooperative: response.data.result.is_coop,
                    isSolo: response.data.result.is_solo,
                    isAbandoned: response.data.result.endgame_reason !== 'normal_end',
                    gameId: response.data.game_name
                };

                response.data.result.player.forEach((item) => {
                    game.players.push({
                        name: item.name === connectedUser.nickname ? "Moi" : item.name,
                        score: item.score ? Number(item.score) : null,
                        rank: item.gamerank ? Number(item.gamerank) : null
                    });
                });

                return game;
            });
    }

    static async getUser(requestToken: string) {
        return boardGameArenaService
            .fetch<WhoResponse>(`https://boardgamearena.com/my?who`, requestToken)
            .then(response => {
                return {
                    id: response.id,
                    nickname: response.n
                } as User
            });
    }

    static async fetch<T>(url: string, requestToken: string) {
        const headers = new Headers([["x-request-token", requestToken]]);

        return fetch(url, { headers }).then(response => response.json() as T);
    }
}