// Résout automatiquement les jeux BGA sans identifiant MyLudo dans assets/games.json.
// Pour chaque entrée vide : nom réel via la page BGA, recherche sur MyLudo,
// et attribution de l'ID uniquement si un titre correspond exactement (après normalisation).
// Les cas non résolus sont listés dans un rapport Markdown (utilisé dans la PR).
//
// Usage : node .github/scripts/resolve-games.mjs [games.json] [report.md]

import { readFile, writeFile } from 'node:fs/promises';

const GAMES_PATH = process.argv[2] ?? 'assets/games.json';
const REPORT_PATH = process.argv[3] ?? 'resolve-report.md';
const USER_AGENT = 'Mozilla/5.0 (compatible; bga2myludo-bot; +https://github.com/therealhnk/bga2myludo-web-extension)';
const ACCEPTED_TYPES = new Set(['basegame', 'standalone']);
const DELAY_MS = 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const decodeHtml = (text) =>
    text
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;|&apos;/g, "'")
        .replace(/&bull;/g, '•');

// "Hegemony Of Faith" et "Hegemony of Faith !" doivent correspondre
const normalize = (text) =>
    text
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]/g, '');

async function getBgaGame(bgaId) {
    const url = `https://en.boardgamearena.com/gamepanel?game=${encodeURIComponent(bgaId)}`;
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!response.ok) throw new Error(`BGA HTTP ${response.status}`);
    const html = await response.text();

    const escapedId = bgaId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const jsonName = html.match(new RegExp(`"name":"${escapedId}","display_name_en":"((?:[^"\\\\]|\\\\.)*)"`));
    const titleName = html.match(/<title>Play (.+?) online on Board Game Arena/);
    const name = jsonName ? JSON.parse(`"${jsonName[1]}"`) : titleName ? decodeHtml(titleName[1]) : null;
    const bggId = html.match(/boardgamegeek\.com\/boardgame\/(\d+)/)?.[1] ?? null;

    return { name, bggId, url };
}

async function createMyludoSession() {
    const response = await fetch('https://www.myludo.fr/', { headers: { 'User-Agent': USER_AGENT } });
    const html = await response.text();
    const token = html.match(/name="csrf-token" content="([^"]+)"/)?.[1];
    if (!token) throw new Error('MyLudo CSRF token not found');
    const cookie = response.headers
        .getSetCookie()
        .map((c) => c.split(';')[0])
        .join('; ');
    return { token, cookie };
}

async function myludoRequest(session, path, params) {
    const response = await fetch(`https://www.myludo.fr/${path}?${new URLSearchParams(params)}`, {
        headers: {
            'User-Agent': USER_AGENT,
            'X-Requested-With': 'XMLHttpRequest',
            'X-Csrf-Token': session.token,
            Cookie: session.cookie,
        },
    });
    if (!response.ok) throw new Error(`MyLudo HTTP ${response.status}`);
    const data = await response.json();
    if (data.success === false) throw new Error(`MyLudo: ${data.message}`);
    return data;
}

// Mêmes paramètres que la recherche du site : .../18/bymagic
const searchMyludo = async (session, words) =>
    (await myludoRequest(session, 'views/search/datas.php', { type: 'search', tab: 'games', words, page: '1', limit: '18', order: 'bymagic' })).list ?? [];

// Les résultats de recherche n'ont pas toujours les langues, contrairement à la fiche du jeu
const getMyludoGame = (session, id) => myludoRequest(session, 'views/game/datas.php', { type: 'game', id });

const isFrench = (game) => Boolean(game.languages && 'fr' in game.languages);
const myludoSlug = (game) => `${game.code}-${game.id}`;
const myludoLink = (game) => `[${game.title}${game.edition ? ` (${game.edition})` : ''}](https://www.myludo.fr/#!/game/${myludoSlug(game)}) \`${myludoSlug(game)}\``;
const languages = (game) => (game.languages ? Object.keys(game.languages).join(', ') : '?');
const searchLink = (name) => `https://www.myludo.fr/#!/search/${encodeURIComponent(name)}/games/*/*/*/*/*/*/*/*/18/bymagic`;

async function resolve(session, bgaId) {
    const bga = await getBgaGame(bgaId);
    if (!bga.name) return { status: 'error', bgaId, bga, reason: 'nom introuvable sur BGA' };

    const results = await searchMyludo(session, bga.name);
    const target = normalize(bga.name);
    const matches = results.filter((game) => ACCEPTED_TYPES.has(game.type) && normalize(game.title) === target);
    if (matches.length === 1 && !matches[0].languages) {
        matches[0].languages = (await getMyludoGame(session, matches[0].id)).languages;
    }

    // Validation automatique uniquement si la correspondance est unique et en français :
    // une édition non française peut cacher une édition FR au titre différent (ex. Forest Shuffle / Forêt Mixte)
    if (matches.length === 1 && isFrench(matches[0])) return { status: 'resolved', bgaId, bga, game: matches[0] };
    if (matches.length === 1) return { status: 'unverified', bgaId, bga, candidates: matches };
    if (matches.length > 1) return { status: 'ambiguous', bgaId, bga, candidates: matches };
    return { status: 'notfound', bgaId, bga, candidates: results.slice(0, 5) };
}

// Même tri que le workflow : jeux mappés puis non mappés, ordre alphabétique des clés
function sortGames(games) {
    const entries = Object.entries(games).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return Object.fromEntries([...entries.filter(([, v]) => v !== ''), ...entries.filter(([, v]) => v === '')]);
}

function buildReport(outcomes) {
    if (!outcomes.length) return '_Aucun nouveau jeu à mapper._\n';
    const lines = [];
    const byStatus = (status) => outcomes.filter((o) => o.status === status);
    const bgaLink = (o) => `[\`${o.bgaId}\`](${o.bga.url})`;
    const bggLink = (o) => (o.bga.bggId ? ` · [BGG](https://boardgamegeek.com/boardgame/${o.bga.bggId})` : '');

    const resolved = byStatus('resolved');
    if (resolved.length) {
        lines.push(`### ✅ Résolus automatiquement (${resolved.length})`, '');
        for (const o of resolved) lines.push(`- ${bgaLink(o)} ${o.bga.name} → ${myludoLink(o.game)}`);
        lines.push('');
    }

    const reasons = {
        unverified: 'correspondance unique mais sans édition française, vérifier s’il existe une édition FR au titre différent',
        ambiguous: 'plusieurs éditions portent ce titre',
        notfound: 'aucune correspondance exacte',
    };
    const pending = [...byStatus('unverified'), ...byStatus('ambiguous'), ...byStatus('notfound'), ...byStatus('error')];
    if (pending.length) {
        lines.push(`### ⚠️ À traiter manuellement (${pending.length})`, '');
        for (const o of pending) {
            const name = o.bga.name ?? '?';
            lines.push(`- ${bgaLink(o)} **${name}** — ${reasons[o.status] ?? o.reason} · [Recherche MyLudo](${searchLink(name)})${bggLink(o)}`);
            for (const candidate of o.candidates ?? []) lines.push(`  - ${myludoLink(candidate)} _${candidate.type}, ${languages(candidate)}_`);
        }
        lines.push('');
    }

    return lines.join('\n');
}

const games = JSON.parse(await readFile(GAMES_PATH, 'utf8'));
const unmapped = Object.keys(games).filter((key) => games[key] === '');
console.log(`${unmapped.length} jeu(x) sans identifiant MyLudo`);

const outcomes = [];
if (unmapped.length) {
    const session = await createMyludoSession();
    for (const bgaId of unmapped) {
        try {
            const outcome = await resolve(session, bgaId);
            outcomes.push(outcome);
            if (outcome.status === 'resolved') games[bgaId] = myludoSlug(outcome.game);
            console.log(`${bgaId}: ${outcome.status}${outcome.game ? ` → ${games[bgaId]}` : ''}${outcome.reason ? ` (${outcome.reason})` : ''}`);
        } catch (error) {
            outcomes.push({ status: 'error', bgaId, bga: { url: `https://boardgamearena.com/gamepanel?game=${bgaId}` }, reason: error.message });
            console.log(`${bgaId}: error (${error.message})`);
        }
        await sleep(DELAY_MS);
    }
}

await writeFile(GAMES_PATH, JSON.stringify(sortGames(games), null, 2) + '\n');
await writeFile(REPORT_PATH, buildReport(outcomes));
