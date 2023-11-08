import type { MappedUser } from "./mappedUser";

export class Configuration {
    place: string;
    fillPlace?: boolean;
    autoSubmit: boolean;
    darkMode: boolean;
    excludeFromStatistics: boolean;
    addTableLink?: boolean;
    users: MappedUser[];
}