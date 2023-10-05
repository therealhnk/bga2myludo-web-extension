// To parse this data:
//
//   import { Convert, GetGamesResponse } from "./file";
//
//   const getGamesResponse = Convert.toGetGamesResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

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
    normalend: number;
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

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toGetGamesResponse(json: string): GetGamesResponse {
        return cast(JSON.parse(json), r("GetGamesResponse"));
    }

    public static getGamesResponseToJson(value: GetGamesResponse): string {
        return JSON.stringify(uncast(value, r("GetGamesResponse")), null, 2);
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
    "GetGamesResponse": o([
        { json: "status", js: "status", typ: 0 },
        { json: "data", js: "data", typ: r("Data") },
    ], false),
    "Data": o([
        { json: "tables", js: "tables", typ: a(r("Table")) },
        { json: "stats", js: "stats", typ: r("Stats") },
    ], false),
    "Stats": o([
        { json: "general", js: "general", typ: r("General") },
        { json: "games", js: "games", typ: a(r("Game")) },
        { json: "opponents", js: "opponents", typ: a(r("Opponent")) },
    ], false),
    "Game": o([
        { json: "table_game", js: "table_game", typ: "" },
        { json: "game_name", js: "game_name", typ: "" },
        { json: "game_id", js: "game_id", typ: "" },
        { json: "cnt", js: "cnt", typ: "" },
    ], false),
    "General": o([
        { json: "played", js: "played", typ: "" },
        { json: "score", js: "score", typ: "" },
        { json: "victory", js: "victory", typ: "" },
        { json: "elo_win", js: "elo_win", typ: "" },
    ], false),
    "Opponent": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "nbr", js: "nbr", typ: "" },
        { json: "hits", js: "hits", typ: "" },
    ], false),
    "Table": o([
        { json: "table_id", js: "table_id", typ: "" },
        { json: "game_name", js: "game_name", typ: "" },
        { json: "game_id", js: "game_id", typ: "" },
        { json: "start", js: "start", typ: "" },
        { json: "end", js: "end", typ: "" },
        { json: "concede", js: "concede", typ: "" },
        { json: "unranked", js: "unranked", typ: "" },
        { json: "normalend", js: "normalend", typ: "" },
        { json: "players", js: "players", typ: "" },
        { json: "player_names", js: "player_names", typ: "" },
        { json: "scores", js: "scores", typ: "" },
        { json: "ranks", js: "ranks", typ: "" },
        { json: "elo_win", js: "elo_win", typ: "" },
        { json: "elo_penalty", js: "elo_penalty", typ: "" },
        { json: "elo_after", js: "elo_after", typ: "" },
        { json: "arena_win", js: "arena_win", typ: null },
        { json: "arena_after", js: "arena_after", typ: "" },
    ], false),
};
