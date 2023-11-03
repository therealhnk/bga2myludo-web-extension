import { faGear, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "data-base64:~assets/bga2myludo_icon.png";
import { useCallback, useEffect, useState } from "react";
import type { Configuration } from "~core/models/configuration";
import configurationService from "~core/services/configurationService";
import AutoSubmit from "./components/AutoSubmit";
import CustomPlace from "./components/CustomPlace";
import CustomUsers from "./components/CustomUsers";
import ExportButton from "./components/ExportButton";
import Home from "./components/Home";
import ImportButton from "./components/ImportButton";
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
                <div className="extension-name" onClick={() => setActiveSection('Home')}>
                    <img src={icon} alt="bga2myludo_icon" />
                    <span>{chrome.i18n.getMessage("extensionName")}</span>
                </div>

                <button title="CustomPlace" onClick={() => setActiveSection('Configuration')}>
                    <FontAwesomeIcon icon={faGear} size="lg" />
                </button>
                <button title="Users" onClick={() => setActiveSection('CustomUsers')}>
                    <FontAwesomeIcon icon={faUsers} size="lg" />
                </button>
                <ImportButton configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
                <ExportButton configuration={configuration} />
            </header >

            {(showLoader) ?
                <Loader />
                :
                <div className="popup-body">
                    {activeSection === 'Home' && <Home />}
                    {activeSection === 'Configuration' &&
                        <>
                            <AutoSubmit configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
                            <CustomPlace configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
                        </>
                    }
                    {activeSection === 'CustomUsers' && <CustomUsers configuration={configuration} onConfigurationUpdated={refreshConfiguration} />}
                </div>
            }

            <footer>
                <Status />
            </footer>
        </div >
    )
}

export default PopupIndex
