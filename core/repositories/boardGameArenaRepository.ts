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

                    response.data.news.forEach(o => {
                        const match = o.html.match(regex);
                        const matchGameId = o.img.match(regexGameId);

                        if (match && match.length > 2) {
                            const tableId = match[1];
                            const gameName = match[2];

                            playerNotifications.push({
                                id: o.id,
                                type: o.news_type,
                                timestamp: Number(o.timestamp) * 1000,
                                gameId: matchGameId[1],
                                tableId: tableId,
                                timeAgoText: "n/a"
                            });
                        }
                    });

                    return playerNotifications.sort((x, y) => y.timestamp - x.timestamp);
                }
            })
            .catch((error) => { 
                console.error('Failed to fetch BGA games:', error);
                return [];
            });
    }

    static async getTable(tableId: string) {
        const headers = await boardGameArenaRepository.getHeaders();

        if (!headers) return null;

        return fetch(`https://boardgamearena.com/table/table/tableinfos.html?id=${tableId}`, { headers })
            .then(response => { return response.json() })
            .then(response => { return response as TableInfos })
            .catch((error) => { 
                console.error('Failed to fetch table information:', error);
                return null;
            });
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
            }).catch((error) => { 
                console.error('Failed to fetch BGA user:', error);
                return null;
            });
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
            .catch((error) => { 
                console.error('Failed to fetch BGA friends list:', error);
                return [];
            });
    }

    static async getHeaders() {
        //récupérer la home page pour récupérer le requestToken dans les balises meta
        return fetch("https://boardgamearena.com/", { method: "GET" })
            .then(response => { return response.text() })
            .then(response => {
                const regex = /requestToken:\s+'([^']+)'/;
                const match = response.match(regex);
                
                if (!match || match.length < 2) {
                    console.error("Failed to extract BGA request token from response");
                    throw new Error("Failed to extract request token");
                }
                
                return new Headers([["x-request-token", match[1]]]);
            })
            .catch((error) => { 
                console.error("Error fetching BGA headers:", error);
                return null; 
            })
    }
}