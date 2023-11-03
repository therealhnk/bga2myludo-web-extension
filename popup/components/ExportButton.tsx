import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import type { Configuration } from '~core/models/configuration';
import '~popup/index.scss';

type Props = {
    configuration: Configuration;
}

export default function ExportButton({ configuration }: Props) {
    const handleClick = useCallback(() => {
        const blob = new Blob([JSON.stringify(configuration)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "bga2myludo_configuration.json";
        a.click();

        URL.revokeObjectURL(url);
    }, [configuration]);

    return (
        <button title={chrome.i18n.getMessage("exportConfiguration")} onClick={handleClick}>
            <FontAwesomeIcon icon={faDownload} size="lg" />
        </button>
    )
}