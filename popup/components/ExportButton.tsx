import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { IconButton } from '@mui/material';
import React from 'react';
import type { Configuration } from '~core/models/configuration';
import '~popup/popup.scss';

type Props = {
    configuration: Configuration;
}

export default function ExportButton({ configuration }: Props) {
    const blob = new Blob([JSON.stringify(configuration)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    return (
        <IconButton
            size="small"
            href={url}
            download={"bga2myludo_configuration.json"}
        >
            <FileDownloadIcon color="primary" />
        </IconButton>
    )
}