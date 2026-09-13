import { storage } from "wxt/utils/storage";
import games from "~/assets/games.json";
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_OPPONENTS_BASE_NAME } from "~/core/constants";
import { Configuration } from "~/core/models/configuration";
import type { MappedGame } from "~/core/models/mappedGame";

export default class configurationService {
    static async get(): Promise<Configuration> {
        let configuration = new Configuration();

        const configurationSerialized = await storage.getItem<string>('local:configuration');
        if (configurationSerialized) {
            configuration = JSON.parse(configurationSerialized) as Configuration;
        }

        configuration.fillPlace = configuration.fillPlace !== undefined ? configuration.fillPlace : true;
        configuration.place = configuration.place && configuration.place.length > 0 ? configuration.place : 'Board Game Arena';

        configuration.customizeCurrentPlayer = configuration.customizeCurrentPlayer !== undefined ? configuration.customizeCurrentPlayer : true;
        configuration.customCurrentPlayerName = configuration.customCurrentPlayerName && configuration.customCurrentPlayerName.length > 0 ? configuration.customCurrentPlayerName : 'Moi';

        configuration.autoUpdateUsers = configuration.autoUpdateUsers !== undefined ? configuration.autoUpdateUsers : true;
        configuration.addTableLink = configuration.addTableLink !== undefined ? configuration.addTableLink : true;

        configuration.renameAllOpponents = configuration.renameAllOpponents !== undefined ? configuration.renameAllOpponents : false;
        configuration.customOpponentsBaseName = configuration.customOpponentsBaseName && configuration.customOpponentsBaseName.length > 0 ? configuration.customOpponentsBaseName : DEFAULT_OPPONENTS_BASE_NAME;

        configuration.keepOnlyTopOpponent = configuration.keepOnlyTopOpponent !== undefined ? configuration.keepOnlyTopOpponent : false;

        configuration.users = configuration.users ? configuration.users.sort((a, b) => (a.bgaUser < b.bgaUser ? -1 : 1)) : [];
        configuration.users.forEach((element) => { element.id = uuidv4() });

        configuration.overridenGames = configuration.overridenGames !== undefined ? configuration.overridenGames : [];

        return configuration;
    }

    static async set(configuration: Configuration) {
        storage.setItem("local:configuration", JSON.stringify(configuration));
    }

    static async getGames(): Promise<MappedGame[]> {
        const gamesMap = games as Record<string, string>;

        return configurationService.get().then(configuration => {
            return Object.keys(gamesMap).reduce((acc, key) => {
                acc.push({
                    bgaId: key,
                    defaultMyludoId: gamesMap[key],
                    overridenMyludoId: configuration.overridenGames.find(item => item.bgaId === key)?.overridenMyludoId ?? '',
                    currentMyludoId: configuration.overridenGames.find(item => item.bgaId === key)?.overridenMyludoId || gamesMap[key]
                });
                return acc;
            }, [] as MappedGame[]);
        })
    }

    static async getGame(bgaGameId: string): Promise<MappedGame | undefined> {
        return configurationService.getGames().then(games => {
            return games.find(o => o.bgaId === bgaGameId);
        })
    }
}