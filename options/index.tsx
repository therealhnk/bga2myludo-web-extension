import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { CssBaseline, Divider, IconButton, ThemeProvider } from '@mui/material';
import { useCallback, useEffect, useState } from "react";
import Configuration from '~/components/Configuration';
import type { Configuration as ConfigurationModel } from "~/core/models/configuration";
import ExportButton from "~/popup/components/ExportButton";
import ImportButton from "~/popup/components/ImportButton";
import Status from "~/popup/components/Status";
import UserMatching from "~/popup/components/UserMatching";
import '~/styles/common.scss';
import getTheme from '~/theme/customTheme';
import configurationService from "~core/services/configurationService";
import Loader from "../components/Loader";

export default function OptionsIndex() {
    const [configuration, setConfiguration] = useState<ConfigurationModel>();
    const [showLoader, setShowLoader] = useState(true);
    const [activeSection, setActiveSection] = useState('Configuration');

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
                    <IconButton size="small" title={chrome.i18n.getMessage("configuration")} onClick={() => setActiveSection('Configuration')}>
                        <SettingsIcon color="primary" />
                    </IconButton>
                    <IconButton size="small" title={chrome.i18n.getMessage("userMatching")} onClick={() => setActiveSection('UserMatching')}>
                        <PeopleIcon color="primary" />
                    </IconButton>
                    <ImportButton configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
                    <ExportButton configuration={configuration} />
                    <IconButton
                        onClick={toggleTheme}
                        title={theme.palette.mode === 'dark' ? chrome.i18n.getMessage("dayMode") : chrome.i18n.getMessage("nightMode")}
                    >
                        {theme.palette.mode === 'dark' ? <DarkModeIcon color="primary" /> : <LightModeIcon color="primary" />}
                    </IconButton>
                </header >

                <Divider />

                {(showLoader) ?
                    <Loader />
                    :
                    <div className="popup-body">
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