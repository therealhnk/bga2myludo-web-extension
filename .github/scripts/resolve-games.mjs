// Résout automatiquement les jeux BGA sans identifiant MyLudo dans assets/games.json.
// Pour chaque entrée vide : nom réel via la page BGA, recherche sur MyLudo,
// et attribution de l'ID si un titre correspond exactement (après normalisation) :
// l'édition française en priorité, sinon une autre édition, la plus pertinente en cas de doublon.
// Les cas non résolus sont listés dans un rapport Markdown (utilisé dans la PR).
//
// Usage : node .github/scripts/resolve-games.mjs [games.json] [report.md]

import { appendFile, readFile, writeFile } from 'node:fs/promises';

const GAMES_PATH = process.argv[2] ?? 'assets/games.json';
const REPORT_PATH = process.argv[3] ?? 'resolve-report.md';
const USER_AGENT = 'Mozilla/5.0 (compatible; bga2myludo-bot; +https://github.com/therealhnk/bga2myludo-web-extension)';
const ACCEPTED_TYPES = new Set(['basegame', 'standalone']);
const DELAY_MS = 1000;
// Délai minimal entre deux appels MyLudo, pour ne pas se faire bannir
const MYLUDO_DELAY_MS = 10000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let lastMyludoCall = 0;
async function myludoFetch(url, options) {
    await sleep(lastMyludoCall + MYLUDO_DELAY_MS - Date.now());
    try {
        return await fetch(url, options);
    } finally {
        lastMyludoCall = Date.now();
    }
}

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
    const response = await myludoFetch('https://www.myludo.fr/', { headers: { 'User-Agent': USER_AGENT } });
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
    const response = await myludoFetch(`https://www.myludo.fr/${path}?${new URLSearchParams(params)}`, {
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
    for (const game of matches) {
        if (!game.languages) game.languages = (await getMyludoGame(session, game.id)).languages;
    }

    // Priorité aux éditions françaises ; à défaut, toutes les éditions présentes.
    // Les résultats sont triés par pertinence (bymagic) : on retient le premier.
    const french = matches.filter(isFrench);
    const pool = french.length ? french : matches;
    if (!pool.length) return { status: 'notfound', bgaId, bga, candidates: results.slice(0, 5) };
    return {
        status: 'resolved',
        bgaId,
        bga,
        game: pool[0],
        // Une édition FR peut exister sous un titre différent (ex. Forest Shuffle / Forêt Mixte) : signalé dans le rapport
        nonFrench: !french.length,
        others: pool.slice(1),
    };
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
        for (const o of resolved) {
            const warning = o.nonFrench ? ` ⚠️ _pas d’édition FR (${languages(o.game)}), vérifier s’il en existe une au titre différent_` : '';
            lines.push(`- ${bgaLink(o)} ${o.bga.name} → ${myludoLink(o.game)}${warning}`);
            if (o.others.length) lines.push(`  - ⚠️ _${o.others.length} autre(s) édition(s) au même titre, la plus pertinente a été retenue :_`);
            for (const other of o.others) lines.push(`    - ${myludoLink(other)} _${other.type}, ${languages(other)}_`);
        }
        lines.push('');
    }

    const reasons = {
        notfound: 'aucune correspondance exacte',
    };
    const pending = [...byStatus('notfound'), ...byStatus('error')];
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

// Exposé au workflow : la PR n'est fusionnée automatiquement que si tout est résolu
const unresolved = outcomes.filter((o) => o.status !== 'resolved').length;
if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `unresolved=${unresolved}\n`);
