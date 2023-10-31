import { Storage } from "@plasmohq/storage"
import type { Configuration } from "~core/models/configuration";

export default class configurationService {
    static async get(): Promise<Configuration> {
        const storage = new Storage();

        const placeValue = await storage.get('place');
        const place = placeValue && placeValue.length > 0 ? placeValue : 'Board Game Arena';

        const autoSubmitValue = await storage.get('autoSubmit');
        const autoSubmit = autoSubmitValue && autoSubmitValue.length > 0 ? autoSubmitValue === 'true' : false;

        return { place, autoSubmit };
    }

    static async setAutoSubmit(value: boolean) {
        const storage = new Storage();
        storage.set("autoSubmit", String(value));
    }

    static async setPlace(value: string) {
        const storage = new Storage();
        storage.set("place", value);
    }
}