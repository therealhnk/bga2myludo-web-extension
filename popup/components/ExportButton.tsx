import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { IconButton } from '@mui/material';
import { useCallback } from 'react';
import type { Configuration } from '~core/models/configuration';
import '~styles/common.scss';

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
        <IconButton size="small" title={chrome.i18n.getMessage("exportConfiguration")} onClick={handleClick}>
            <FileDownloadIcon color="primary" />
        </IconButton>
    )
}