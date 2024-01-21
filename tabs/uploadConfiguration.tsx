import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, CssBaseline, ThemeProvider } from "@mui/material";
import icon from "data-base64:~assets/bga2myludo_icon.png";
import React, { useEffect, useRef, useState } from "react";
import type { Configuration, Configuration as ConfigurationModel } from "~core/models/configuration";
import configurationService from "~core/services/configurationService";
import '~tabs/uploadConfiguration.scss';
import getTheme from "~theme/customTheme";

function UploadConfigurationPage() {
    const fileInputRef = useRef(null);
    const [configuration, setConfiguration] = useState<ConfigurationModel>();
    const theme = getTheme(configuration && configuration.darkMode);

    useEffect(() => {
        configurationService.get().then((result) => {
            setConfiguration(result);
        });
    }, []);

    const importConfiguration = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    const content = event.target.result as string;
                    const data = JSON.parse(content) as Configuration;
                    configurationService.set(data).then(() => {
                        window.close();
                    });
                }
            };
            reader.readAsText(file);
        }
        window.removeEventListener('focus', handleFocusBack);
    };

    const handleFocusBack = () => {
        setTimeout(() => { window.close() }, 300);
        window.removeEventListener('focus', handleFocusBack);
    };

    const clickedFileInput = () => {
        window.addEventListener('focus', handleFocusBack);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='popup'>
                <header>
                    <span className="extension-name">
                        <img src={icon} alt="bga2myludo" />
                        <span>{chrome.i18n.getMessage("extensionName")}</span>
                    </span>
                    <span className="file-upload">
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            onClick={() => fileInputRef.current.click()}
                        >
                            Upload file
                            <input
                                type="file"
                                id="fileInput"
                                accept=".json"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={importConfiguration}
                                onClick={clickedFileInput}
                            />
                        </Button>
                    </span>
                </header>
            </div>
        </ThemeProvider>
    )
}
export default UploadConfigurationPage;
