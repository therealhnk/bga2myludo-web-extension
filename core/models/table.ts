import type { Player } from "./player";

export class Table {
    tableId: string;
    players: Player[];
    // snapshot des joueurs avant renommage par renameAllOpponents, utilisé pour la détection de doublon sur Myludo
    originalPlayers?: Player[];
    end: Date;
    isCooperative: boolean;
    isSolo: boolean;
    isAbandoned: boolean;
    gameId: string;
    duration?: number;
}