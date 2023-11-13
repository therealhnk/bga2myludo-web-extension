import { useCallback, useEffect, useState } from "react";
import Configuration from "~components/Configuration";
import Loader from "~components/Loader";
import type { Configuration as ConfigurationModel } from "~core/models/configuration";
import configurationService from "~core/services/configurationService";

export default function OptionsIndex() {
    const [configuration, setConfiguration] = useState<ConfigurationModel>();
    const [showLoader, setShowLoader] = useState(true);

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

    return <div>
        {(showLoader) ?
            <Loader />
            :
            <Configuration configuration={configuration} onConfigurationUpdated={refreshConfiguration} />
        }
    </div>
}