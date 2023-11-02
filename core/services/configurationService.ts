import { Storage } from "@plasmohq/storage"
import type { Configuration } from "~core/models/configuration";
import type { MappedUser } from "~core/models/mappedUser";

export default class configurationService {
    static async get(): Promise<Configuration> {
        const storage = new Storage();

        const placeValue = await storage.get('place');
        const place = placeValue && placeValue.length > 0 ? placeValue : 'Board Game Arena';

        const autoSubmitValue = await storage.get('autoSubmit');
        const autoSubmit = autoSubmitValue && autoSubmitValue.length > 0 ? autoSubmitValue === 'true' : false;

        const usersValue = await storage.get('users');
        const users = (JSON.parse(usersValue) as MappedUser[]).sort((a, b) => (a.bgaUser < b.bgaUser ? -1 : 1));

        return { place, autoSubmit, users };
    }

    static async set(configuration: Configuration) {
        configurationService.setAutoSubmit(configuration.autoSubmit);
        configurationService.setPlace(configuration.place);
        configurationService.setUsers(configuration.users);
    }

    static async setAutoSubmit(value: boolean) {
        const storage = new Storage();
        storage.set("autoSubmit", String(value));
    }

    static async setPlace(value: string) {
        const storage = new Storage();
        storage.set("place", value);
    }

    static async setUsers(value: MappedUser[]) {
        const storage = new Storage();
        storage.set("users", JSON.stringify(value));
    }
}