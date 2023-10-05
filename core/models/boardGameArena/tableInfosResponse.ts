// To parse this data:
//
//   import { Convert, TableInfos } from "./file";
//
//   const tableInfos = Convert.toTableInfos(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

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

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toTableInfos(json: string): TableInfos {
        return cast(JSON.parse(json), r("TableInfos"));
    }

    public static tableInfosToJson(value: TableInfos): string {
        return JSON.stringify(uncast(value, r("TableInfos")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) { }
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "TableInfos": o([
        { json: "status", js: "status", typ: 0 },
        { json: "data", js: "data", typ: r("Data") },
    ], false),
    "Data": o([
        { json: "id", js: "id", typ: "" },
        { json: "game_id", js: "game_id", typ: "" },
        { json: "status", js: "status", typ: "" },
        { json: "table_creator", js: "table_creator", typ: "" },
        { json: "has_tournament", js: "has_tournament", typ: "" },
        { json: "max_player", js: "max_player", typ: "" },
        { json: "level_filter", js: "level_filter", typ: r("LevelFilter") },
        { json: "filter_group", js: "filter_group", typ: "" },
        { json: "filter_lang", js: "filter_lang", typ: null },
        { json: "reputation_filter", js: "reputation_filter", typ: r("ReputationFilter") },
        { json: "progression", js: "progression", typ: "" },
        { json: "presentation", js: "presentation", typ: "" },
        { json: "cancelled", js: "cancelled", typ: "" },
        { json: "unranked", js: "unranked", typ: "" },
        { json: "min_player", js: "min_player", typ: "" },
        { json: "filter_group_name", js: "filter_group_name", typ: "" },
        { json: "filter_group_visibility", js: "filter_group_visibility", typ: "" },
        { json: "filter_group_type", js: "filter_group_type", typ: "" },
        { json: "game_name", js: "game_name", typ: "" },
        { json: "game_max_players", js: "game_max_players", typ: "" },
        { json: "game_min_players", js: "game_min_players", typ: "" },
        { json: "game_player_number", js: "game_player_number", typ: m(0) },
        { json: "game_status", js: "game_status", typ: "" },
        { json: "game_premium", js: "game_premium", typ: "" },
        { json: "game_expansion_premium", js: "game_expansion_premium", typ: "" },
        { json: "sandbox", js: "sandbox", typ: "" },
        { json: "scheduled", js: "scheduled", typ: "" },
        { json: "gamestart", js: "gamestart", typ: "" },
        { json: "gameserver", js: "gameserver", typ: "" },
        { json: "duration", js: "duration", typ: "" },
        { json: "initial_reflexion_time_advice", js: "initial_reflexion_time_advice", typ: "" },
        { json: "additional_reflexion_time_advice", js: "additional_reflexion_time_advice", typ: "" },
        { json: "siteversion", js: "siteversion", typ: "" },
        { json: "gameversion", js: "gameversion", typ: "" },
        { json: "log_archived", js: "log_archived", typ: "" },
        { json: "news_id", js: "news_id", typ: null },
        { json: "player_number_advice", js: "player_number_advice", typ: null },
        { json: "player_number_not_recommended", js: "player_number_not_recommended", typ: "" },
        { json: "fast", js: "fast", typ: "" },
        { json: "medium", js: "medium", typ: "" },
        { json: "slow", js: "slow", typ: "" },
        { json: "league_number", js: "league_number", typ: "" },
        { json: "players", js: "players", typ: m(r("PlayerValue")) },
        { json: "level_filter_r", js: "level_filter_r", typ: "" },
        { json: "reputation_filter_r", js: "reputation_filter_r", typ: "" },
        { json: "current_player_nbr", js: "current_player_nbr", typ: null },
        { json: "current_present_player_nbr", js: "current_present_player_nbr", typ: null },
        { json: "player_display", js: "player_display", typ: a("any") },
        { json: "options_order", js: "options_order", typ: a(0) },
        { json: "options", js: "options", typ: m(r("Option")) },
        { json: "beta_option_selected", js: "beta_option_selected", typ: true },
        { json: "alpha_option_selected", js: "alpha_option_selected", typ: true },
        { json: "not_recommend_player_number", js: "not_recommend_player_number", typ: a("any") },
        { json: "beginner_not_recommended_player_number", js: "beginner_not_recommended_player_number", typ: a("any") },
        { json: "rtc_mode", js: "rtc_mode", typ: null },
        { json: "result", js: "result", typ: r("Result") },
        { json: "estimated_duration", js: "estimated_duration", typ: 0 },
        { json: "time_profile", js: "time_profile", typ: r("TimeProfile") },
        { json: "pma", js: "pma", typ: true },
        { json: "thumbs", js: "thumbs", typ: m(r("Thumb")) },
    ], false),
    "LevelFilter": o([
        { json: "label", js: "label", typ: r("Label") },
        { json: "details", js: "details", typ: r("LevelFilterDetails") },
    ], false),
    "LevelFilterDetails": o([
        { json: "Beginners", js: "Beginners", typ: true },
        { json: "Apprentices", js: "Apprentices", typ: true },
        { json: "Average players", js: "Average players", typ: true },
        { json: "Good players", js: "Good players", typ: true },
        { json: "Strong players", js: "Strong players", typ: true },
        { json: "Experts", js: "Experts", typ: true },
        { json: "Masters", js: "Masters", typ: true },
    ], false),
    "Label": o([
        { json: "log", js: "log", typ: "" },
        { json: "args", js: "args", typ: a("any") },
    ], false),
    "Option": o([
        { json: "name", js: "name", typ: "" },
        { json: "values", js: "values", typ: u(a(r("ValueElement")), m(r("ValueValue"))) },
        { json: "type", js: "type", typ: "" },
        { json: "default", js: "default", typ: u(0, "") },
        { json: "value", js: "value", typ: u(0, "") },
        { json: "displaycondition", js: "displaycondition", typ: u(undefined, a(r("Displaycondition"))) },
        { json: "template", js: "template", typ: u(undefined, r("Template")) },
    ], false),
    "Displaycondition": o([
        { json: "type", js: "type", typ: "" },
        { json: "id", js: "id", typ: 0 },
        { json: "value", js: "value", typ: a(0) },
    ], false),
    "Template": o([
        { json: "namearg", js: "namearg", typ: "" },
        { json: "default", js: "default", typ: 0 },
    ], false),
    "ValueElement": o([
        { json: "name", js: "name", typ: "" },
        { json: "no_player_selection", js: "no_player_selection", typ: u(undefined, true) },
        { json: "disable", js: "disable", typ: u(undefined, true) },
    ], false),
    "ValueValue": o([
        { json: "name", js: "name", typ: "" },
        { json: "shortname", js: "shortname", typ: u(undefined, "") },
        { json: "tinyname", js: "tinyname", typ: u(undefined, "") },
        { json: "tmdisplay", js: "tmdisplay", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "nobeginner", js: "nobeginner", typ: u(undefined, true) },
        { json: "no_player_selection", js: "no_player_selection", typ: u(undefined, true) },
    ], false),
    "PlayerValue": o([
        { json: "awards", js: "awards", typ: a(r("Award")) },
    ], false),
    "Award": o([
        { json: "id", js: "id", typ: "" },
        { json: "player", js: "player", typ: "" },
        { json: "game", js: "game", typ: "" },
        { json: "type_id", js: "type_id", typ: "" },
        { json: "date", js: "date", typ: "" },
        { json: "defending", js: "defending", typ: "" },
        { json: "linked_tournament", js: "linked_tournament", typ: null },
        { json: "prestige", js: "prestige", typ: "" },
        { json: "tgroup", js: "tgroup", typ: null },
        { json: "tournament_name", js: "tournament_name", typ: null },
        { json: "championship_name", js: "championship_name", typ: null },
        { json: "season", js: "season", typ: null },
        { json: "group_avatar", js: "group_avatar", typ: null },
        { json: "name", js: "name", typ: "" },
        { json: "nametr", js: "nametr", typ: "" },
        { json: "namearg", js: "namearg", typ: 0 },
        { json: "prestigeclass", js: "prestigeclass", typ: 0 },
    ], false),
    "ReputationFilter": o([
        { json: "label", js: "label", typ: "" },
        { json: "details", js: "details", typ: r("ReputationFilterDetails") },
    ], false),
    "ReputationFilterDetails": o([
        { json: "opinion", js: "opinion", typ: 0 },
        { json: "leave", js: "leave", typ: 0 },
        { json: "clock", js: "clock", typ: 0 },
        { json: "karma", js: "karma", typ: 0 },
    ], false),
    "Result": o([
        { json: "id", js: "id", typ: "" },
        { json: "time_start", js: "time_start", typ: Date },
        { json: "time_end", js: "time_end", typ: Date },
        { json: "time_duration", js: "time_duration", typ: "" },
        { json: "table_level", js: "table_level", typ: "" },
        { json: "game_id", js: "game_id", typ: "" },
        { json: "concede", js: "concede", typ: "" },
        { json: "endgame_reason", js: "endgame_reason", typ: "" },
        { json: "game_name", js: "game_name", typ: "" },
        { json: "game_status", js: "game_status", typ: "" },
        { json: "losers_not_ranked", js: "losers_not_ranked", typ: true },
        { json: "is_coop", js: "is_coop", typ: true },
        { json: "player", js: "player", typ: a(r("PlayerElement")) },
        { json: "penalties", js: "penalties", typ: m(r("Penalty")) },
        { json: "is_solo", js: "is_solo", typ: true },
        { json: "stats", js: "stats", typ: r("Stats") },
        { json: "trophies", js: "trophies", typ: r("Trophies") },
    ], false),
    "Penalty": o([
        { json: "leave", js: "leave", typ: 0 },
        { json: "clock", js: "clock", typ: 0 },
    ], false),
    "PlayerElement": o([
        { json: "player_id", js: "player_id", typ: "" },
        { json: "score", js: "score", typ: "" },
        { json: "score_aux", js: "score_aux", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "th_name", js: "th_name", typ: null },
        { json: "avatar", js: "avatar", typ: "" },
        { json: "gender", js: "gender", typ: u(null, "") },
        { json: "country", js: "country", typ: r("Country") },
        { json: "gamerank", js: "gamerank", typ: "" },
        { json: "is_tie", js: "is_tie", typ: "" },
        { json: "point_win", js: "point_win", typ: "" },
        { json: "rank_after_game", js: "rank_after_game", typ: "" },
        { json: "finish_game", js: "finish_game", typ: "" },
        { json: "arena_points_win", js: "arena_points_win", typ: null },
        { json: "arena_after_game", js: "arena_after_game", typ: "" },
        { json: "is_premium", js: "is_premium", typ: "" },
        { json: "is_beginner", js: "is_beginner", typ: "" },
    ], false),
    "Country": o([
        { json: "name", js: "name", typ: "" },
        { json: "cur", js: "cur", typ: "" },
        { json: "code", js: "code", typ: "" },
        { json: "flag_x", js: "flag_x", typ: 0 },
        { json: "flag_y", js: "flag_y", typ: 0 },
    ], false),
    "Stats": o([
        { json: "table", js: "table", typ: m(r("Table")) },
        { json: "player", js: "player", typ: r("StatsPlayer") },
    ], false),
    "StatsPlayer": o([
        { json: "reflexion_time", js: "reflexion_time", typ: r("Announce") },
        { json: "time_bonus_nbr", js: "time_bonus_nbr", typ: r("TimeBonusNbr") },
        { json: "reflexion_time_sd", js: "reflexion_time_sd", typ: r("Announce") },
        { json: "turnsNumber", js: "turnsNumber", typ: r("Announce") },
        { json: "takeCardFromDeck", js: "takeCardFromDeck", typ: r("Announce") },
        { json: "takeFromDiscard", js: "takeFromDiscard", typ: r("Announce") },
        { json: "playedDuoCards", js: "playedDuoCards", typ: r("Announce") },
        { json: "playedDuoCards1", js: "playedDuoCards1", typ: r("Announce") },
        { json: "playedDuoCards2", js: "playedDuoCards2", typ: r("Announce") },
        { json: "playedDuoCards3", js: "playedDuoCards3", typ: r("Announce") },
        { json: "playedDuoCards4", js: "playedDuoCards4", typ: r("Announce") },
        { json: "winWithMermaids", js: "winWithMermaids", typ: r("Announce") },
        { json: "announce", js: "announce", typ: r("Announce") },
        { json: "announceStop", js: "announceStop", typ: r("Announce") },
        { json: "announceLastChance", js: "announceLastChance", typ: r("Announce") },
        { json: "lastChanceBetWon", js: "lastChanceBetWon", typ: r("Announce") },
        { json: "lastChanceBetLost", js: "lastChanceBetLost", typ: r("Announce") },
        { json: "cardsCollected2", js: "cardsCollected2", typ: r("Announce") },
        { json: "cardsCollected1", js: "cardsCollected1", typ: r("Announce") },
        { json: "cardsCollected3", js: "cardsCollected3", typ: r("Announce") },
        { json: "cardsCollected4", js: "cardsCollected4", typ: r("Announce") },
        { json: "playedDuoCards5", js: "playedDuoCards5", typ: r("Announce") },
        { json: "playedDuoCards6", js: "playedDuoCards6", typ: r("Announce") },
    ], false),
    "Announce": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: r("Type") },
        { json: "values", js: "values", typ: m("") },
        { json: "valuelabels", js: "valuelabels", typ: a("any") },
        { json: "unit", js: "unit", typ: u(undefined, "") },
    ], false),
    "TimeBonusNbr": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: r("Type") },
        { json: "values", js: "values", typ: a("any") },
        { json: "valuelabels", js: "valuelabels", typ: a("any") },
    ], false),
    "Table": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: r("Type") },
        { json: "value", js: "value", typ: "" },
    ], false),
    "Trophies": o([
        { json: "85159219", js: "85159219", typ: a(r("The85159219")) },
    ], false),
    "The85159219": o([
        { json: "id", js: "id", typ: "" },
        { json: "player", js: "player", typ: "" },
        { json: "game", js: "game", typ: "" },
        { json: "type_id", js: "type_id", typ: "" },
        { json: "date", js: "date", typ: "" },
        { json: "defending", js: "defending", typ: "" },
        { json: "linked_tournament", js: "linked_tournament", typ: null },
        { json: "prestige", js: "prestige", typ: "" },
        { json: "tournament_name", js: "tournament_name", typ: null },
        { json: "championship_name", js: "championship_name", typ: null },
        { json: "name", js: "name", typ: "" },
        { json: "nametr", js: "nametr", typ: "" },
    ], false),
    "Thumb": o([
        { json: "po_subject", js: "po_subject", typ: "" },
        { json: "t", js: "t", typ: "" },
        { json: "n", js: "n", typ: "" },
    ], false),
    "TimeProfile": o([
        { json: "additional_time_per_move", js: "additional_time_per_move", typ: 0 },
        { json: "maximum_time_per_move", js: "maximum_time_per_move", typ: 0 },
        { json: "extra_time_to_think_to_expel", js: "extra_time_to_think_to_expel", typ: 0 },
        { json: "initial_time_to_thing", js: "initial_time_to_thing", typ: 0 },
    ], false),
    "Type": [
        "bool",
        "float",
        "int",
    ],
};
