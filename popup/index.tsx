import { faDownload, faFileImport, faGear, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "data-base64:~assets/bga2myludo_icon.png";
import { useCallback, useEffect, useState } from "react";
import type { Configuration } from "~core/models/configuration";
import configurationService from "~core/services/configurationService";
import AutoSubmit from "./components/AutoSubmit";
import CustomPlace from "./components/CustomPlace";
import CustomUsers from "./components/CustomUsers";
import Home from "./components/Home";
import ImportExportConfiguration from "./components/ImportExportConfiguration";
import Loader from "./components/Loader";
import Status from "./components/Status";
import './index.scss';

function PopupIndex() {
    const [configuration, setConfiguration] = useState<Configuration>();
    const [showLoader, setShowLoader] = useState(true);
    const [activeSection, setActiveSection] = useState('Home');

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

                <button title="CustomPlace" onClick={() => setActiveSection('CustomPlace')}>
                    <FontAwesomeIcon icon={faGear} size="lg" />
                </button>
                <button title="AutoSubmit" onClick={() => setActiveSection('AutoSubmit')}>
                    <FontAwesomeIcon icon={faGear} size="lg" />
                </button>
                <button title="Users" onClick={() => setActiveSection('CustomUsers')}>
                    <FontAwesomeIcon icon={faUsers} size="lg" />
                </button>
                <button title="Export" onClick={() => setActiveSection('ImportExportConfiguration')}>
                    <FontAwesomeIcon icon={faDownload} size="lg" />
                </button>
                <button title="Import" onClick={() => setActiveSection('ImportExportConfiguration')}>
                    <FontAwesomeIcon icon={faFileImport} size="lg" />
                </button>
            </header >

            {(showLoader) ?
                <Loader />
                :
                <>
                    {activeSection === 'Home' && <Home />}
                    {activeSection === 'CustomPlace' && <CustomPlace configuration={configuration} onConfigurationUpdated={refreshConfiguration} />}
                    {activeSection === 'AutoSubmit' && <AutoSubmit configuration={configuration} onConfigurationUpdated={refreshConfiguration} />}
                    {activeSection === 'CustomUsers' && <CustomUsers configuration={configuration} onConfigurationUpdated={refreshConfiguration} />}
                    {activeSection === 'ImportExportConfiguration' && <ImportExportConfiguration configuration={configuration} onConfigurationUpdated={refreshConfiguration} />}
                </>
            }

            <footer>
                <Status />
            </footer>
        </div >
    )
}

export default PopupIndex
