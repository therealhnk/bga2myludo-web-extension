import { Storage } from "@plasmohq/storage";
import games from "data-env:assets/games.json";
import { v4 as uuidv4 } from 'uuid';
import { Configuration } from "~core/models/configuration";
import type { MappedGame } from "~core/models/mappedGame";

export default class configurationService {
    static async get(): Promise<Configuration> {
        const storage = new Storage({ area: "local" });
        let configuration = new Configuration();

        const configurationSerialized = await storage.get('configuration')
        if (configurationSerialized) {
            configuration = JSON.parse(configurationSerialized) as Configuration;
        }

        configuration.fillPlace = configuration.fillPlace !== undefined ? configuration.fillPlace : true;
        configuration.place = configuration.place && configuration.place.length > 0 ? configuration.place : 'Board Game Arena';

        configuration.customizeCurrentPlayer = configuration.customizeCurrentPlayer !== undefined ? configuration.customizeCurrentPlayer : true;
        configuration.customCurrentPlayerName = configuration.customCurrentPlayerName && configuration.customCurrentPlayerName.length > 0 ? configuration.customCurrentPlayerName : 'Moi';

        configuration.autoUpdateUsers = configuration.autoUpdateUsers !== undefined ? configuration.autoUpdateUsers : true;
        configuration.addTableLink = configuration.addTableLink !== undefined ? configuration.addTableLink : true;

        configuration.users = configuration.users ? configuration.users.sort((a, b) => (a.bgaUser < b.bgaUser ? -1 : 1)) : [];
        configuration.users.forEach((element) => { element.id = uuidv4() });

        configuration.overridenGames = configuration.overridenGames !== undefined ? configuration.overridenGames : [];

        return configuration;
    }

    static async set(configuration: Configuration) {
        const storage = new Storage({ area: "local" });

        storage.set("configuration", JSON.stringify(configuration));
    }

    static async getGames(): Promise<MappedGame[]> {
        return configurationService.get().then(configuration => {
            return Object.keys(games).reduce((acc, key) => {
                acc.push({
                    bgaId: key,
                    defaultMyludoId: games[key],
                    overridenMyludoId: configuration.overridenGames.find(item => item.bgaId === key)?.overridenMyludoId,
                    currentMyludoId: configuration.overridenGames.find(item => item.bgaId === key)?.overridenMyludoId || games[key]
                });
                return acc;
            }, [] as MappedGame[]);
        })
    }

    static async getGame(bgaGameId: string): Promise<MappedGame> {
        return configurationService.getGames().then(games => {
            return games.find(o => o.bgaId === bgaGameId);
        })
    }
}