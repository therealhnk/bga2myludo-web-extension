import { CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Configuration from "~components/Configuration";
import Loader from "~components/Loader";
import { Configuration as ConfigurationModel } from "~core/models/configuration";
import configurationService from "~core/services/configurationService";
import '~styles/common.scss';
import getTheme from "~theme/customTheme";

export default function OptionsIndex() {
    const [configuration, setConfiguration] = useState<ConfigurationModel>();
    const [showLoader, setShowLoader] = useState(true);

    const theme = getTheme(false);

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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="options">
                {(showLoader) ?
                    <Loader />
                    :
                    <Configuration configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
                }
            </div>
        </ThemeProvider>
    )
}