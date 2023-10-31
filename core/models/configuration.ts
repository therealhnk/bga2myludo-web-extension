import type { MappedUser } from "./mappedUser";

export class Configuration {
    place: string;
    autoSubmit: boolean;
    users: MappedUser[];
}