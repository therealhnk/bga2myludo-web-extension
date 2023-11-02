import { useCallback, useEffect, useState } from "react"
import type { Configuration } from "~core/models/configuration"
import configurationService from "~core/services/configurationService"
import AutoSubmit from "./components/AutoSubmit"
import CustomPlace from "./components/CustomPlace"
import CustomUsers from "./components/CustomUsers"
import ImportExportConfiguration from "./components/ImportExportConfiguration"
import Status from "./components/Status"

function PopupIndex() {
    const [configuration, setConfiguration] = useState<Configuration>();

    useEffect(() => {
        configurationService.get().then((result) => {
            setConfiguration(result);
        });
    }, []);

    const refreshConfiguration = useCallback((configuration: Configuration) => {
        setConfiguration(configuration);
        configurationService.set(configuration);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: 16,
                width: '540px'
            }}>
            <h2>{chrome.i18n.getMessage("welcomeMessage")}</h2>
            <Status />
            <CustomPlace configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
            <AutoSubmit configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
            <CustomUsers configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
            <ImportExportConfiguration configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
        </div>
    )
}

export default PopupIndex
