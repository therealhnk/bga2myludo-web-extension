import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { CssBaseline, Divider, IconButton, ThemeProvider, createTheme } from '@mui/material';
import { indigo } from '@mui/material/colors';
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


export default function PopupIndex() {
    const [configuration, setConfiguration] = useState<ConfigurationModel>();
    const [showLoader, setShowLoader] = useState(true);
    const [activeSection, setActiveSection] = useState('Home');

    const theme = createTheme({
        palette: {
            mode: configuration && configuration.darkMode ? 'dark' : 'light',
            primary: indigo
        },
    });

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

                    <IconButton size="small" title={chrome.i18n.getMessage("configuration")} onClick={() => setActiveSection('Configuration')}>
                        <SettingsIcon />
                    </IconButton>
                    <IconButton size="small" title={chrome.i18n.getMessage("userMatching")} onClick={() => setActiveSection('UserMatching')}>
                        <PeopleIcon />
                    </IconButton>
                    <ImportButton configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
                    <ExportButton configuration={configuration} />
                    <IconButton
                        onClick={toggleTheme}
                        title={theme.palette.mode === 'dark' ? chrome.i18n.getMessage("dayMode") : chrome.i18n.getMessage("nightMode")}
                    >
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </header >

                <Divider />

                {(showLoader) ?
                    <Loader />
                    :
                    <div className="popup-body">
                        {activeSection === 'Home' && <Home />}
                        {activeSection === 'Configuration' && <Configuration configuration={configuration} onConfigurationUpdated={refreshConfiguration} />}
                        {activeSection === 'UserMatching' && <UserMatching configuration={configuration} onConfigurationUpdated={refreshConfiguration} />}
                    </div>
                }

                <Divider />

                <footer>
                    <Status />
                </footer>
            </div >
        </ThemeProvider>
    )
}