const myLudoEltId = "myludo_browserextension";
const jsonFileURL = chrome.runtime.getURL('data/table.json');

patch();

async function patch() {
    const regexTablePage = /^https:\/\/boardgamearena\.com\/table\?table=\d+#?$/;
    const regexpEndGamePage = /^https:\/\/boardgamearena\.com\/.*\btable=\d+.*$/;
    const regexpGameStatsPage = /^https:\/\/boardgamearena\.com\/gamestats/;


    if (regexTablePage.test(window.location.href)) {
        await patchTablePage();
    } else if (regexpEndGamePage.test(window.location.href)) {
        await patchEndGamePage();
    } else if (regexpGameStatsPage.test(window.location.href)) {
        await patchGameStatsPage();
    }

    setTimeout(() => patch(), 500)
}

async function patchTablePage() {
    if (document.getElementById(myLudoEltId) !== null) return;

    const reviewgameButton = document.getElementById("reviewgame");

    if (reviewgameButton !== null) {
        const displayStyle = window.getComputedStyle(reviewgameButton).display;

        if (displayStyle !== 'none' && displayStyle !== 'hide') {
            const bgaButtonBar = document.getElementsByClassName("bgabuttonbar");

            if (bgaButtonBar !== null && bgaButtonBar.length > 0) {
                await getMyLudoLink().then(link => {
                    if (link === null) {
                        addMyLudoField();
                    }
                    else {
                        Array.from(bgaButtonBar).forEach((element) => {
                            element.appendChild(link);
                        });
                    }
                });
            }
        }
    }
}

async function patchEndGamePage() {
    if (document.getElementById(myLudoEltId) !== null) return;

    const rematchButton = document.getElementById("createNew_btn");

    if (rematchButton !== null) {
        const displayStyle = window.getComputedStyle(rematchButton).display;

        if (displayStyle !== 'none' && displayStyle !== 'hide') {
            const bgaButtonBar = document.getElementById("generalactions");

            if (bgaButtonBar !== null) {
                await getMyLudoLink().then(link => {
                    if (link === null) {
                        addMyLudoField();
                    }
                    else {
                        bgaButtonBar.appendChild(link);
                    }
                });
            }
        }
    }
}

async function patchGameStatsPage() {
    if (document.getElementById(myLudoEltId) !== null) return;

    const loader = document.getElementById("tablestats_loading");

    if (loader === null) return;

    const displayStyle = window.getComputedStyle(loader).display;

    if (displayStyle !== 'none' && displayStyle !== 'hide') return;

    addMyLudoField()

    let page = 1;

    const requestToken = getRequestToken();

    if (requestToken === null) return null;

    const headers = {};
    headers["x-request-token"] = requestToken

    const resultUser = await fetch(`https://boardgamearena.com/my?who`, { headers })
        .then(response => response.json())
        .then(data => { return data; });

    const connectedUser = resultUser.n; // username

    fetchAndFeedStatsPage(requestToken, connectedUser, page);

    document.querySelector("#see_more_tables").addEventListener("click", () => {
        fetchAndFeedStatsPage(requestToken, connectedUser, ++page);
    });
}

function fetchAndFeedStatsPage(requestToken, connectedUser, page) {
    const headers = {};
    headers["x-request-token"] = requestToken

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const player = urlParams.get("player");
    const opponent_id = urlParams.get("opponent_id");
    const game_id = urlParams.get("game_id");
    const start_date = urlParams.get("start_date");
    const end_date = urlParams.get("end_date");
    const finished = urlParams.get("finished");

    let url = `https://boardgamearena.com/gamestats/gamestats/getGames.html?player=${player}&updateStats=${page === 1 ? 1 : 0}&page=${page}`;
    url += `&opponent_id=${opponent_id ? opponent_id : 0}`;
    url += `&finished=${finished ? finished : 0}`;
    url += game_id ? `&game_id=${game_id}` : '';
    url += start_date ? `&start_date=${start_date}` : '';
    url += end_date ? `&end_date=${end_date}` : '';

    fetch(url, { headers })
        .then(response => response.json())
        .then(result => {
            fetch(jsonFileURL)
                .then(response => response.json())
                .then(jsonFile => {
                    const timeout = setTimeout(() => {
                        if (!document.querySelector(`#gamelist_inner a[href="/table?table=${result.data.tables[result.data.tables.length - 1].table_id}"]`)) return;

                        clearTimeout(timeout);

                        result.data.tables.forEach((table) => {
                            const currentTable = {
                                end: table.end,
                                game_name: table.game_name,
                                game_id: table.game_id,
                                normalend: table.normalend,
                                player_names: table.player_names.split(','),
                                ranks: table.ranks ? table.ranks.split(',') : null,
                                scores: table.scores ? table.scores.split(',') : null,
                                table_id: table.table_id
                            };

                            let href = '';

                            const myludoId = jsonFile[currentTable.game_name];

                            if (!myludoId) {
                                href = `https://www.myludo.fr/#!/search/${currentTable.game_name}`;
                            }
                            else {
                                const result = {
                                    table: { id: currentTable.table_id },
                                    players: [],
                                    end: '',
                                    isCooperative: false,
                                    isSolo: false,
                                    isAbandoned: currentTable.normalend === 0
                                };

                                currentTable.player_names.forEach((value, index) => {
                                    result.players.push({
                                        name: value === connectedUser ? "Moi" : value,
                                        score: currentTable.scores ? currentTable.scores[index] : null,
                                        rank: currentTable.ranks ? currentTable.ranks[index] : null
                                    });
                                });

                                result.end = new Date(Number(currentTable.end) * 1000);

                                const json = JSON.stringify(result);
                                const data = btoa(json);

                                href = `https://www.myludo.fr/#!/game/${myludoId}?bga2myludo=1&bga2myludo_data=${data}`
                            }

                            const link = document.createElement("a");
                            link.href = href;
                            link.textContent = "Enregistrer la partie sur Myludo";
                            link.target = "_blank"
                            link.classList.add("action-button");
                            link.classList.add("bgabutton");
                            link.classList.add("bgabutton_darkgray");
                            link.id = `myludo_browserextension_${currentTable.table_id}`;
                            link.style = "display: inline;"

                            const cell = document.createElement("td");
                            cell.appendChild(link);

                            document.querySelector(`#gamelist_inner a[href="/table?table=${currentTable.table_id}"]`).closest("tr").appendChild(cell);
                        });
                    }, 250);
                });

        });
}

function addMyLudoField() {
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", myLudoEltId);

    document.body.appendChild(input);
}

async function getMyLudoLink() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tableId = urlParams.get("table");

    const requestToken = getRequestToken();

    if (requestToken === null) return null;

    const headers = {};
    headers["x-request-token"] = requestToken

    const resultTable = await fetch(`https://boardgamearena.com/table/table/tableinfos.html?id=${tableId}`, { headers })
        .then(response => response.json())
        .then(data => { return data; });

    const gameName = resultTable.data.result.game_name;

    if (gameName !== null) {
        return await fetch(jsonFileURL)
            .then(response => response.json())
            .then(async data => {
                const myludoId = data[gameName];
                let href = '';

                if (!myludoId) {
                    href = `https://www.myludo.fr/#!/search/${gameName}`;
                }
                else {
                    const result = {
                        table: { id: tableId },
                        players: [],
                        end: '',
                        isCooperative: false,
                        isSolo: false,
                        isAbandoned: false
                    };

                    const resultUser = await fetch(`https://boardgamearena.com/my?who`, { headers })
                        .then(response => response.json())
                        .then(data => { return data; });

                    const connectedUser = resultUser.n; // username 

                    resultTable.data.result.player.forEach((item) => {
                        result.players.push({
                            name: item.name === connectedUser ? "Moi" : item.name,
                            score: item.score,
                            rank: item.gamerank
                        });
                    });

                    result.end = resultTable.data.result.time_end;
                    result.isCooperative = resultTable.data.result.is_coop;
                    result.isSolo = resultTable.data.result.is_solo;
                    result.isAbandoned = resultTable.data.result.endgame_reason !== 'normal_end';

                    const json = JSON.stringify(result);
                    const data = btoa(json);

                    href = `https://www.myludo.fr/#!/game/${myludoId}?bga2myludo=1&bga2myludo_data=${data}`
                }

                const link = document.createElement("a");
                link.href = href;
                link.textContent = "Enregistrer la partie sur Myludo";
                link.target = "_blank"
                link.classList.add("action-button");
                link.classList.add("bgabutton");
                link.classList.add("bgabutton_darkgray");
                link.id = "myludo_browserextension";
                link.style = "display: inline;"

                return link;
            });
    }

    return null;
}

function getRequestToken() {
    const regex = /requestToken:\s+'([^']+)'/;

    const requestToken = document.head.outerHTML.match(regex);

    if (requestToken) {
        return requestToken[1];
    } else {
        return null;
    }
}
