import type { BoardResponse } from "~core/models/boardGameArena/BoardResponse";
import type { TableInfos } from "~core/models/boardGameArena/tableInfosResponse";
import type { WhoResponse } from "~core/models/boardGameArena/whoResponse";
import { PlayerNotification } from "~core/models/playerNotification";
import type { User } from "~core/models/user";

export default class boardGameArenaRepository {
    static async getPlayerNotifications(): Promise<PlayerNotification[]> {
        const user = await boardGameArenaRepository.getUser();

        const headers = await boardGameArenaRepository.getHeaders();

        if (!headers) return null;

        let url = `https://boardgamearena.com/message/board`;

        const formData = new FormData();
        formData.append('type', 'playernotif');
        formData.append('social', 'false');
        formData.append('per_page', '20');
        formData.append('id', user.id);

        return fetch(url,
            {
                headers,
                method: 'POST',
                body: formData
            })
            .then(async response => {
                return response.json();
            })
            .then(response => {
                return response as BoardResponse;
            })
            .then(response => {
                if (!response) {
                    return [];
                }
                else {
                    const regex = /<a\s+href="\/table\?table=([^"]+)"><span class="gamename">([^<]+)<\/span>/;
                    const regexGameId = /\/(\w+)\/icon\//;

                    const playerNotifications: PlayerNotification[] = [];

                    response.data.forEach(o => {
                        const match = o.html.match(regex);
                        const matchGameId = o.img.match(regexGameId);

                        if (match && match.length > 2) {
                            const tableId = match[1];
                            const gameName = match[2];

                            playerNotifications.push({
                                id: o.id,
                                type: o.news_type,
                                dateAgo: Number(o.date_ago),
                                timestamp: Number(o.timestamp),
                                gameId: matchGameId[1],
                                tableId: tableId
                            });
                        }
                    });

                    return playerNotifications.sort((x, y) => y.timestamp - x.timestamp);
                }
            })
            .catch(() => { return []; });
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