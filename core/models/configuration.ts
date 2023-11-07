import type { MappedUser } from "./mappedUser";

export class Configuration {
    place: string;
    autoSubmit: boolean;
    addTableLink?: boolean;
    users: MappedUser[];
}