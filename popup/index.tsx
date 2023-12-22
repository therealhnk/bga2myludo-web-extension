import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsIcon from '@mui/icons-material/Settings';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import TuneIcon from '@mui/icons-material/Tune';
import { CssBaseline, Divider, IconButton, ThemeProvider, Tooltip } from '@mui/material';
import icon from "data-base64:~assets/bga2myludo_icon.png";
import React, { useCallback, useEffect, useState } from 'react';
import type { Configuration as ConfigurationModel } from "~core/models/configuration";
import configurationService from "~core/services/configurationService";
import Configuration from '~popup/components/Configuration';
import '~popup/popup.scss';
import getTheme from '~theme/customTheme';
import ExportButton from "./components/ExportButton";
import Home from "./components/Home";
import ImportButton from "./components/ImportButton";
import Loader from "./components/Loader";
import OverridenGames from './components/OverriddenGames';
import Releases from './components/Releases';
import Status from "./components/Status";
import UserMatching from "./components/UserMatching";

export default function PopupIndex() {
    const [configuration, setConfiguration] = useState<ConfigurationModel>();
    const [showLoader, setShowLoader] = useState(true);
    const [activeSection, setActiveSection] = useState('Home');

    const theme = getTheme(configuration && configuration.darkMode);

    useEffect(() => {
        configurationService.get().then((result) => {
            setConfiguration(result);
            setShowLoader(false);
        });
    }, []);

    const refreshConfiguration = useCallback((configuration: ConfigurationModel) => {
        configurationService.set(configuration);
        setConfiguration(configuration);
    }, []);

    const toggleTheme = useCallback(() => {
        setConfiguration(current => {
            const updatedConfiguration = { ...current, darkMode: !current.darkMode };
            configurationService.set(updatedConfiguration)
            return updatedConfiguration;
        });
        ;
    }, [configuration]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='popup'>
                <header>
                    <div className="extension-name" onClick={() => setActiveSection('Home')}>
                        <img src={icon} alt="bga2myludo" />
                        <span>{chrome.i18n.getMessage("extensionName")}</span>
                    </div>

                    <Tooltip title={chrome.i18n.getMessage("configuration")}>
                        <IconButton size="small" onClick={() => setActiveSection('Configuration')}>
                            <SettingsIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={chrome.i18n.getMessage("userMatching")}>
                        <IconButton size="small" onClick={() => setActiveSection('UserMatching')}>
                            <SocialDistanceIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={chrome.i18n.getMessage("overridenGames")}>
                        <IconButton size="small" onClick={() => setActiveSection('OverridenGames')}>
                            <TuneIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={chrome.i18n.getMessage("importConfiguration")}>
                        <span>
                            <ImportButton configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
                        </span>
                    </Tooltip>
                    <Tooltip title={chrome.i18n.getMessage("exportConfiguration")}>
                        <span>
                            <ExportButton configuration={configuration} />
                        </span>
                    </Tooltip>
                    <Tooltip title={theme.palette.mode === 'dark' ? chrome.i18n.getMessage("dayMode") : chrome.i18n.getMessage("nightMode")}>
                        <IconButton onClick={toggleTheme}>
                            {theme.palette.mode === 'dark' ? <DarkModeIcon color="primary" /> : <LightModeIcon color="primary" />}
                        </IconButton>
                    </Tooltip>
                </header >

                <Divider />

                {(showLoader) ?
                    <Loader />
                    :
                    <div className="popup-body">
                        {activeSection === 'Home' && <Home />}
                        {activeSection === 'Configuration' && <Configuration configuration={configuration} onConfigurationUpdated={refreshConfiguration} />}
                        {activeSection === 'UserMatching' && <UserMatching configuration={configuration} onConfigurationUpdated={refreshConfiguration} />}
                        {activeSection === 'OverridenGames' && <OverridenGames configuration={configuration} onConfigurationUpdated={refreshConfiguration} />}
                        {activeSection === 'Releases' && <Releases />}
                    </div>
                }

                <Divider />

                <footer>
                    <Status onReleasesClick={() => setActiveSection('Releases')} />
                </footer>
            </div >
        </ThemeProvider>
    )
}