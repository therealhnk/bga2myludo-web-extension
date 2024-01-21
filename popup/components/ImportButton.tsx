import FileUploadIcon from '@mui/icons-material/FileUpload';
import { IconButton } from '@mui/material';
import React, { forwardRef, useCallback, useRef } from 'react';
import { isFirefox } from 'react-device-detect';
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
        if (isFirefox) {
            const windowWidth = 400;
            const windowHeight = 100;

            const left = Math.round((screen.width - windowWidth) / 2);
            const top = Math.round((screen.height - windowHeight) / 2);

            chrome.windows.create({
                url: 'tabs/uploadConfiguration.html',
                type: 'popup',
                width: windowWidth,
                height: windowHeight,
                left,
                top
            });
        }
        else {
            hiddenFileInput.current?.click();
        }

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