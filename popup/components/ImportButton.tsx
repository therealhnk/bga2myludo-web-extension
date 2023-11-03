import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useRef } from 'react';
import type { Configuration } from '~core/models/configuration';
import '~popup/index.scss';

type Props = {
    configuration: Configuration;
    onConfigurationUpdated: (configuration: Configuration) => void;
}

export default function ImportButton({ configuration, onConfigurationUpdated }: Props) {
    const hiddenFileInput = useRef(null);

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

    const handleClick = useCallback(() => {
        hiddenFileInput.current.click();
    }, [hiddenFileInput]);

    return (
        <>
            <button title={chrome.i18n.getMessage("importConfiguration")} onClick={handleClick}>
                <FontAwesomeIcon icon={faFileImport} size="lg" />
            </button>
            <input
                type="file"
                onChange={importConfiguration}
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                accept=".json"
            />
        </>
    )
}