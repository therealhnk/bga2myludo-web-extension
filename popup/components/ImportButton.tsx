import FileUploadIcon from '@mui/icons-material/FileUpload';
import { IconButton } from '@mui/material';
import React, { forwardRef, useCallback, useRef } from 'react';
import type { Configuration } from '~core/models/configuration';
import '~popup/popup.scss';

type Props = {
    configuration: Configuration;
    onConfigurationUpdated: (configuration: Configuration) => void;
}

const ImportButton = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const importConfiguration = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    const content = event.target.result as string;
                    const data = JSON.parse(content) as Configuration;
                    props.onConfigurationUpdated(data);
                }
            };
            reader.readAsText(file);
        }
        e.target.value = '';
    }, [props.onConfigurationUpdated]);

    const handleClick = useCallback(() => {
        hiddenFileInput.current?.click();
    }, [hiddenFileInput]);

    return (
        <>
            <IconButton size="small" onClick={handleClick}>
                <FileUploadIcon color="primary" />
            </IconButton>
            <input
                type="file"
                onChange={importConfiguration}
                ref={(hiddenFileInput as React.RefObject<HTMLInputElement>) || ref}
                style={{ display: 'none' }}
                accept=".json"
            />
        </>
    );
});

export default ImportButton;