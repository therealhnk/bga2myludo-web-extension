import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import { useCallback, useState } from 'react';
import type { Configuration } from '~core/models/configuration';

type Props = {
    configuration: Configuration;
    onConfigurationUpdated: (configuration: Configuration) => void;
}

export default function ImportExportConfiguration({ configuration, onConfigurationUpdated }: Props) {
    const [success, setSuccess] = useState<boolean>();
    const importConfiguration = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        try {
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
            setSuccess(true);
        } catch (e) {
            setSuccess(false);
        }
    }, [onConfigurationUpdated]);

    return (
        <div className="import">
            <div className="message">{chrome.i18n.getMessage("importMessage")}</div>
            <div className="file">
                <input type="file" onChange={importConfiguration} accept=".json" />
                {success === true && <FontAwesomeIcon color="green" icon={faCheck} size="lg" />}
                {success === false && <FontAwesomeIcon color="red" icon={faXmark} size="lg" />}
            </div>
        </div>
    )
}