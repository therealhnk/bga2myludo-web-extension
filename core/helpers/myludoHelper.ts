export default class myludoHelper {
    static convertToDate(text) {
        const monthText = ["janv", "févr", "mars", "avr", "mai", "juin", "juill", "août", "sept", "oct", "nov", "déc"];
        let result = new Date(1900, 0, 1);

        text.replace(/(\d+) ([\p{L}\s]+) (\d+)/u, (match, day, month, year) => {
            const monthIndex = monthText.indexOf(month);

            if (monthIndex >= 0) {
                result = new Date(
                    year,
                    monthIndex,
                    day
                );
            }
        });

        return result;
    }

    static hasBeenAlreadyPlayed(currentPlay, plays) {
        console.log(plays);
        const currentPlayersFootPrint = JSON.stringify(
            currentPlay.players
                .map(o => { return { name: o.name, score: o.score }; })
                .sort(function (a, b) {// on effectue d'abord un tri par score descendant puis un tri alpha des pseudos
                    if (Number(a.score) < Number(b.score)) return 1;
                    if (Number(a.score) > Number(b.score)) return -1;
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0
                })
        ).toLowerCase();

        return plays.some(o =>
            myludoHelper.trunkDateToDay(o.end).getTime() === myludoHelper.trunkDateToDay(currentPlay.end).getTime() &&
            JSON.stringify(o.players).toLowerCase() === currentPlayersFootPrint
        );
    }

    static trunkDateToDay(dateString: string) {
        return new Date(new Date(dateString).toDateString());
    }
}