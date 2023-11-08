import type { MappedUser } from "./mappedUser";

export class Configuration {
    place: string;
    autoSubmit: boolean;
    darkMode: boolean;
    excludeFromStatistics: boolean;
    addTableLink?: boolean;
    users: MappedUser[];
}