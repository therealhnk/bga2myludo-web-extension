import type { MappedUser } from "./mappedUser";

export class Configuration {
    place: string;
    autoSubmit: boolean;
    darkMode: boolean;
    addTableLink?: boolean;
    users: MappedUser[];
}