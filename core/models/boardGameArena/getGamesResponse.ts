export interface GetGamesResponse {
    status: number;
    data: Data;
}

export interface Data {
    tables: Table[];
    stats: Stats;
}

export interface Stats {
    general: General;
    games: Game[];
    opponents: Opponent[];
}

export interface Game {
    table_game: string;
    game_name: string;
    game_id: string;
    cnt: string;
}

export interface General {
    played: string;
    score: string;
    victory: string;
    elo_win: string;
}

export interface Opponent {
    id: string;
    name: string;
    nbr: string;
    hits: string;
}

export interface Table {
    table_id: number;
    game_name: string;
    game_id: string;
    start: string;
    end: string;
    concede: string;
    unranked: string;
    normalend: string;
    players: string;
    player_names: string;
    scores: string;
    ranks: string;
    elo_win: string;
    elo_penalty: string;
    elo_after: string;
    arena_win: null;
    arena_after: string;
}