import type { PlayerResultsResponse } from "~core/models/boardGameArena/playerResultsResponse";
import type { TableInfos } from "~core/models/boardGameArena/tableInfosResponse";
import type { WhoResponse } from "~core/models/boardGameArena/whoResponse";
import type { User } from "~core/models/user";

export default class boardGameArenaRepository {
    static async getLatestPlayerResults(fromTime?: number, fromId?: number) {
        const user = await boardGameArenaRepository.getUser();

        const headers = await boardGameArenaRepository.getHeaders();

        if (!headers) return null;

        return fetch(`https://boardgamearena.com/message/board?type=playerresult&id=${user.id}&social=false&page=0&per_page=10&from_time=${fromTime}&from_id=${fromId}`, { headers })
            .then(response => { return response.json() })
            .then(response => { return response as PlayerResultsResponse })
            .catch(() => { return null; });
    }

    static async getTable(tableId: string) {
        const headers = await boardGameArenaRepository.getHeaders();

        if (!headers) return null;

        return fetch(`https://boardgamearena.com/table/table/tableinfos.html?id=${tableId}`, { headers })
            .then(response => { return response.json() })
            .then(response => { return response as TableInfos })
            .catch(() => { return null; });
    }

    static async getUser(): Promise<User> {
        return fetch(`https://boardgamearena.com/my?who`, {})
            .then(response => { return response.json() })
            .then(response => { return response as WhoResponse })
            .then(response => {
                return {
                    id: response.id,
                    nickname: response.n,
                    token: response.s
                } as User;
            }).catch(() => { return null; });
    }

    static async getFriends() {
        const headers = await boardGameArenaRepository.getHeaders();

        if (!headers) return null;

        return fetch(`https://boardgamearena.com/community/community/friends.html`, { headers })
            .then(response => { return response.json() })
            .then(response => {
                if (!response.data && !response.data.friends) {
                    return [];
                }
                else {
                    return response.data.friends;
                }
            })
            .catch(() => { return []; });
    }

    static async getHeaders() {
        //récupérer la home page pour récupérer le requestToken dans les balises meta
        return fetch("https://boardgamearena.com/", { method: "GET" })
            .then(response => { return response.text() })
            .then(response => {
                const regex = /requestToken:\s+'([^']+)'/;
                return new Headers([["x-request-token", response.match(regex)[1]]]);
            })
            .catch(() => { return null; })
    }
}