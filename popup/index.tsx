import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';
import icon from "data-base64:~assets/bga2myludo_icon.png";
import { useCallback, useEffect, useState } from "react";
import type { Configuration as ConfigurationModel } from "~core/models/configuration";
import configurationService from "~core/services/configurationService";
import Configuration from './components/Configuration';
import ExportButton from "./components/ExportButton";
import Home from "./components/Home";
import ImportButton from "./components/ImportButton";
import Loader from "./components/Loader";
import Status from "./components/Status";
import UserMatching from "./components/UserMatching";
import './index.scss';

function PopupIndex() {
    const [configuration, setConfiguration] = useState<ConfigurationModel>();
    const [showLoader, setShowLoader] = useState(true);
    const [activeSection, setActiveSection] = useState('Home');

    useEffect(() => {
        configurationService.get().then((result) => {
            setConfiguration(result);
            setShowLoader(false);
        });
    }, []);

    const refreshConfiguration = useCallback((configuration: ConfigurationModel) => {
        setConfiguration(configuration);
        configurationService.set(configuration);
    }, []);

    return (
        <div className='popup'>
            <header>
                <div className="extension-name" onClick={() => setActiveSection('Home')}>
                    <img src={icon} alt="bga2myludo" />
                    <span>{chrome.i18n.getMessage("extensionName")}</span>
                </div>

                <Button variant="outlined" size="small" title={chrome.i18n.getMessage("configuration")} onClick={() => setActiveSection('Configuration')}>
                    <SettingsIcon />
                </Button >
                <Button variant="outlined" size="small" title={chrome.i18n.getMessage("userMatching")} onClick={() => setActiveSection('UserMatching')}>
                    <PeopleIcon />
                </Button >
                <ImportButton configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
                <ExportButton configuration={configuration} />
            </header >

            {(showLoader) ?
                <Loader />
                :
                <div className="popup-body">
                    {activeSection === 'Home' && <Home />}
                    {activeSection === 'Configuration' && <Configuration configuration={configuration} onConfigurationUpdated={refreshConfiguration} />}
                    {activeSection === 'UserMatching' && <UserMatching configuration={configuration} onConfigurationUpdated={refreshConfiguration} />}
                </div>
            }

            <footer>
                <Status />
            </footer>
        </div >
    )
}

export default PopupIndex
