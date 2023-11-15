import { Storage } from "@plasmohq/storage";
import { v4 as uuidv4 } from 'uuid';
import { Configuration } from "~core/models/configuration";

export default class configurationService {
    static async get(): Promise<Configuration> {
        const storage = new Storage();
        let configuration = new Configuration();

        const configurationSerialized = await storage.get('configuration')
        if (configurationSerialized) {
            configuration = JSON.parse(configurationSerialized) as Configuration;
        }

        configuration.fillPlace = configuration.fillPlace !== undefined ? configuration.fillPlace : true;
        configuration.autoUpdateUsers = configuration.autoUpdateUsers !== undefined ? configuration.autoUpdateUsers : true;
        configuration.addTableLink = configuration.addTableLink !== undefined ? configuration.addTableLink : true;
        configuration.place = configuration.place && configuration.place.length > 0 ? configuration.place : 'Board Game Arena';
        configuration.users = configuration.users ? configuration.users.sort((a, b) => (a.bgaUser < b.bgaUser ? -1 : 1)) : [];
        configuration.users.forEach((element) => { element.id = uuidv4() });

        return configuration;
    }

    static async set(configuration: Configuration) {
        const storage = new Storage();

        storage.set("configuration", JSON.stringify(configuration));
    }
}