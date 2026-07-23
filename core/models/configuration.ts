import type { MappedGame } from "./mappedGame";
import type { MappedUser } from "./mappedUser";

export class Configuration {
    customizeCurrentPlayer?: boolean;
    customCurrentPlayerName: string;
    renameAllOpponents?: boolean;
    customOpponentsBaseName: string;
    keepOnlyTopOpponent?: boolean;
    fillPlace?: boolean;
    place: string;
    autoSubmit: boolean;
    darkMode: boolean;
    excludeFromStatistics: boolean;
    addTableLink?: boolean;
    users: MappedUser[];
    overridenGames: MappedGame[];
    autoUpdateUsers: boolean;
}