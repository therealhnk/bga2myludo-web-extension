export interface TableInfos {
    status: number;
    data: Data;
}

export interface Data {
    id: string;
    game_id: string;
    status: string;
    table_creator: string;
    has_tournament: string;
    max_player: string;
    level_filter: LevelFilter;
    filter_group: string;
    filter_lang: null;
    reputation_filter: ReputationFilter;
    progression: string;
    presentation: string;
    cancelled: string;
    unranked: string;
    min_player: string;
    filter_group_name: string;
    filter_group_visibility: string;
    filter_group_type: string;
    game_name: string;
    game_max_players: string;
    game_min_players: string;
    game_player_number: { [key: string]: number };
    game_status: string;
    game_premium: string;
    game_expansion_premium: string;
    sandbox: string;
    scheduled: string;
    gamestart: string;
    gameserver: string;
    duration: string;
    initial_reflexion_time_advice: string;
    additional_reflexion_time_advice: string;
    siteversion: string;
    gameversion: string;
    log_archived: string;
    news_id: null;
    player_number_advice: null;
    player_number_not_recommended: string;
    fast: string;
    medium: string;
    slow: string;
    league_number: string;
    players: { [key: string]: PlayerValue };
    level_filter_r: string;
    reputation_filter_r: string;
    current_player_nbr: null;
    current_present_player_nbr: null;
    player_display: any[];
    options_order: number[];
    options: { [key: string]: Option };
    beta_option_selected: boolean;
    alpha_option_selected: boolean;
    not_recommend_player_number: any[];
    beginner_not_recommended_player_number: any[];
    rtc_mode: null;
    result: Result;
    estimated_duration: number;
    time_profile: TimeProfile;
    pma: boolean;
    thumbs: { [key: string]: Thumb };
}

export interface LevelFilter {
    label: Label;
    details: LevelFilterDetails;
}

export interface LevelFilterDetails {
    Beginners: boolean;
    Apprentices: boolean;
    "Average players": boolean;
    "Good players": boolean;
    "Strong players": boolean;
    Experts: boolean;
    Masters: boolean;
}

export interface Label {
    log: string;
    args: any[];
}

export interface Option {
    name: string;
    values: ValueElement[] | { [key: string]: ValueValue };
    type: string;
    default: number | string;
    value: number | string;
    displaycondition?: Displaycondition[];
    template?: Template;
}

export interface Displaycondition {
    type: string;
    id: number;
    value: number[];
}

export interface Template {
    namearg: string;
    default: number;
}

export interface ValueElement {
    name: string;
    no_player_selection?: boolean;
    disable?: boolean;
}

export interface ValueValue {
    name: string;
    shortname?: string;
    tinyname?: string;
    tmdisplay?: string;
    description?: string;
    nobeginner?: boolean;
    no_player_selection?: boolean;
}

export interface PlayerValue {
    awards: Award[];
}

export interface Award {
    id: string;
    player: string;
    game: string;
    type_id: string;
    date: string;
    defending: string;
    linked_tournament: null;
    prestige: string;
    tgroup: null;
    tournament_name: null;
    championship_name: null;
    season: null;
    group_avatar: null;
    name: string;
    nametr: string;
    namearg: number;
    prestigeclass: number;
}

export interface ReputationFilter {
    label: string;
    details: ReputationFilterDetails;
}

export interface ReputationFilterDetails {
    opinion: number;
    leave: number;
    clock: number;
    karma: number;
}

export interface Result {
    id: string;
    time_start: Date;
    time_end: Date;
    time_duration: string;
    table_level: string;
    game_id: string;
    concede: string;
    endgame_reason: string;
    game_name: string;
    game_status: string;
    losers_not_ranked: boolean;
    is_coop: boolean;
    player: PlayerElement[];
    penalties: { [key: string]: Penalty };
    is_solo: boolean;
    stats: Stats;
    trophies: Trophies;
}

export interface Penalty {
    leave: number;
    clock: number;
}

export interface PlayerElement {
    player_id: string;
    score?: number;
    score_aux: string;
    name: string;
    th_name: null;
    avatar: string;
    gender: null | string;
    country: Country;
    gamerank?: number;
    is_tie: string;
    point_win: string;
    rank_after_game: string;
    finish_game: string;
    arena_points_win: null;
    arena_after_game: string;
    is_premium: string;
    is_beginner: string;
}

export interface Country {
    name: string;
    cur: string;
    code: string;
    flag_x: number;
    flag_y: number;
}

export interface Stats {
    table: { [key: string]: Table };
    player: StatsPlayer;
}

export interface StatsPlayer {
    reflexion_time: Announce;
    time_bonus_nbr: TimeBonusNbr;
    reflexion_time_sd: Announce;
    turnsNumber: Announce;
    takeCardFromDeck: Announce;
    takeFromDiscard: Announce;
    playedDuoCards: Announce;
    playedDuoCards1: Announce;
    playedDuoCards2: Announce;
    playedDuoCards3: Announce;
    playedDuoCards4: Announce;
    winWithMermaids: Announce;
    announce: Announce;
    announceStop: Announce;
    announceLastChance: Announce;
    lastChanceBetWon: Announce;
    lastChanceBetLost: Announce;
    cardsCollected2: Announce;
    cardsCollected1: Announce;
    cardsCollected3: Announce;
    cardsCollected4: Announce;
    playedDuoCards5: Announce;
    playedDuoCards6: Announce;
}

export interface Announce {
    id: number;
    name: string;
    type: Type;
    values: { [key: string]: string };
    valuelabels: any[];
    unit?: string;
}

export enum Type {
    Bool = "bool",
    Float = "float",
    Int = "int",
}

export interface TimeBonusNbr {
    id: number;
    name: string;
    type: Type;
    values: any[];
    valuelabels: any[];
}

export interface Table {
    id: number;
    name: string;
    type: Type;
    value: string;
}

export interface Trophies {
    "85159219": The85159219[];
}

export interface The85159219 {
    id: string;
    player: string;
    game: string;
    type_id: string;
    date: string;
    defending: string;
    linked_tournament: null;
    prestige: string;
    tournament_name: null;
    championship_name: null;
    name: string;
    nametr: string;
}

export interface Thumb {
    po_subject: string;
    t: string;
    n: string;
}

export interface TimeProfile {
    additional_time_per_move: number;
    maximum_time_per_move: number;
    extra_time_to_think_to_expel: number;
    initial_time_to_thing: number;
}