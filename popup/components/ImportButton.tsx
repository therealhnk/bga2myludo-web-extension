import FileUploadIcon from '@mui/icons-material/FileUpload';
import { IconButton } from '@mui/material';
import { useCallback, useRef } from 'react';
import type { Configuration } from '~core/models/configuration';
import '~popup/popup.scss';

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
            <IconButton size="small" title={chrome.i18n.getMessage("importConfiguration")} onClick={handleClick}>
                <FileUploadIcon color="primary" />
            </IconButton>
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