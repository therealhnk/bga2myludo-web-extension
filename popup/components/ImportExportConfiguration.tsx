import 'bootstrap/dist/css/bootstrap.css';
import { useCallback } from 'react';
import type { Configuration } from '~core/models/configuration';
import configurationService from '~core/services/configurationService';

type Props = {
    configuration: Configuration;
    onConfigurationUpdated: (configuration: Configuration) => void;
}

export default function ImportExportConfiguration({ configuration, onConfigurationUpdated }: Props) {
    const exportConfiguration = useCallback(async () => {
        const configuration = JSON.stringify(await configurationService.get());
        const blob = new Blob([configuration], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "bga2myludo_configuration.json";
        a.click();

        URL.revokeObjectURL(url);
    }, []);

    const importConfiguration = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    const content = event.target.result as string;
                    const data = JSON.parse(content) as Configuration;
                    onConfigurationUpdated(data);
                }
            };
            reader.readAsText(file);
        }
        e.target.value = '';
    }, [onConfigurationUpdated]);

    return (
        <div>
            <div>
                <div>
                    import : <input type="file" onChange={importConfiguration} accept=".json" />
                </div>
                <div><button onClick={exportConfiguration}>export</button></div>
            </div >
        </div >
    )
}