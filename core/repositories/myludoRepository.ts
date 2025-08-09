
export default class myludoRepository {
    static async getHeaders() {
        //récupérer la home page pour récupérer le x-csrf-token dans les balises meta
        return fetch("https://www.myludo.fr/", { method: "GET" })
            .then(response => { return response.text() })
            .then(response => {
                const regex = /<meta\s+name="csrf-token"\s+content="([^"]+)"/;
                const match = response.match(regex);
                
                if (!match || match.length < 2) {
                    console.error("Failed to extract Myludo CSRF token from response");
                    throw new Error("Failed to extract CSRF token");
                }
                
                return new Headers([["X-Csrf-Token", match[1]]]);
            })
            .catch((error) => { 
                console.error("Error fetching Myludo headers:", error);
                return null; 
            })
    }

    static async getUser() {
        const headers = await myludoRepository.getHeaders();

        if (!headers) return null;

        return fetch(`https://www.myludo.fr/views/login/datas.php?type=init`, { method: "GET", headers })
            .then(response => { return response.json(); })
            .then(response => { return response.user })
            .catch((error) => { 
                console.error('Failed to fetch Myludo user:', error);
                return null;
            });
    }
}