import { Storage } from "@plasmohq/storage"
import type { Configuration } from "~core/models/configuration";

export default class configurationService {
    static async Get(): Promise<Configuration> {
        const storage = new Storage();

        const placeValue = await storage.get('place');

        const place = placeValue && placeValue.length > 0 ? placeValue : 'Board Game Arena';

        return { place };
    }
}