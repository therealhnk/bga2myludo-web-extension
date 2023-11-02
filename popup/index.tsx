import icon from "data-base64:~assets/bga2myludo_icon.png";
import { useCallback, useEffect, useState } from "react";
import type { Configuration } from "~core/models/configuration";
import configurationService from "~core/services/configurationService";
import AutoSubmit from "./components/AutoSubmit";
import CustomPlace from "./components/CustomPlace";
import CustomUsers from "./components/CustomUsers";
import ImportExportConfiguration from "./components/ImportExportConfiguration";
import Loader from "./components/Loader";
import Status from "./components/Status";
import './index.scss';

function PopupIndex() {
    const [configuration, setConfiguration] = useState<Configuration>();
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        configurationService.get().then((result) => {
            setConfiguration(result);
            setShowLoader(false);
        });
    }, []);

    const refreshConfiguration = useCallback((configuration: Configuration) => {
        setConfiguration(configuration);
        configurationService.set(configuration);
    }, []);

    return (
        <div className='popup'>
            <header>
                <img src={icon} alt="bga2myludo_icon" />
                <span className="extension-name">{chrome.i18n.getMessage("extensionName")}</span>
            </header>

            {(showLoader) ?
                <Loader />
                :
                <>
                    <CustomPlace configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
                    <AutoSubmit configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
                    <CustomUsers configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
                    <ImportExportConfiguration configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
                </>
            }

            <footer>
                <Status />
            </footer>
        </div>
    )
}

export default PopupIndex
