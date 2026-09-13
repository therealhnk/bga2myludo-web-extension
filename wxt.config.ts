import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
// `~/...` and `@/...` both resolve to the project root out of the box (WXT's built-in aliases),
// so every former Plasmo `~core/...`, `~theme/...`, `~assets/...` import became `~/core/...`, `~/theme/...`, `~/assets/...`.
export default defineConfig({
    modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
    srcDir: ".",
    manifest: {
        default_locale: "fr",
        browser_specific_settings: {
            gecko: {
                id: "bga2myludo@gmail.com",
                strict_min_version: "109.0"
            },
            gecko_android: {
                strict_min_version: "121.0"
            }
        },
        host_permissions: [],
        permissions: ["alarms", "unlimitedStorage", "storage"]
    }
});
