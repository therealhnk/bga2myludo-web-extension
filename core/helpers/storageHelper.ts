export default class storageHelper {
    /**
     * Parses a JSON value read from storage, unwrapping it as many times as needed.
     *
     * Before the v5 (WXT) migration, @plasmohq/storage's `set()` JSON.stringified values a
     * second time on top of the manual JSON.stringify already done by the callers, while its
     * `get()` undid exactly one of those two layers automatically. Users who upgrade in place
     * still have that double-encoded string sitting in chrome.storage.local, so a single
     * JSON.parse() on read leaves it as a string instead of an object.
     */
    static parseJson<T>(raw: string | undefined | null): T | undefined {
        let value: unknown = raw;

        while (typeof value === "string") {
            try {
                value = JSON.parse(value);
            } catch {
                return undefined;
            }
        }

        return value as T | undefined;
    }
}
