import type { Player } from "./player";

export class Table {
    tableId: string;
    players: Player[];
    end: Date;
    isCooperative: boolean;
    isSolo: boolean;
    isAbandoned: boolean;
    gameId: string;
    duration?: number;
}