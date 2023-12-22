
export default class myludoRepository {
    static async getHeaders() {
        //récupérer la home page pour récupérer le x-csrf-token dans les balises meta
        return fetch("https://www.myludo.fr/", { method: "GET" })
            .then(response => { return response.text() })
            .then(response => {
                var regex = /<meta\s+name="csrf-token"\s+content="([^"]+)"/;
                return new Headers([["X-Csrf-Token", response.match(regex)[1]]]);
            })
            .catch(() => { return null; })
    }

    static async getUser() {
        const headers = await myludoRepository.getHeaders();

        if (!headers) return null;

        return fetch(`https://www.myludo.fr/views/login/datas.php?type=init`, { method: "GET", headers })
            .then(response => { return response.json(); })
            .then(response => { return response.user })
            .catch(() => { return null; });
    }
}