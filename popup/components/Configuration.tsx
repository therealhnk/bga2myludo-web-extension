import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useCallback } from 'react';
import type { Configuration as ConfigurationModel } from '~core/models/configuration';
import '~popup/index.scss';

type Props = {
    configuration: ConfigurationModel;
    onConfigurationUpdated: (configuration: ConfigurationModel) => void;
}

export default function Configuration({ configuration, onConfigurationUpdated }: Props) {
    const onChangeAutoSubmit = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        onConfigurationUpdated({ ...configuration, autoSubmit: event.target.checked });
    }, [configuration, onConfigurationUpdated]);

    const onChangeCustomPlace = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        onConfigurationUpdated({ ...configuration, place: event.target.value });
    }, [configuration, onConfigurationUpdated]);

    const onChangeAddTableLink = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        onConfigurationUpdated({ ...configuration, addTableLink: event.target.checked });
    }, [configuration, onConfigurationUpdated]);

    return (
        <div className='configuration'>
            <div className="title">{chrome.i18n.getMessage("configurationTitle")}</div>
            <div className="content">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={configuration.autoSubmit}
                                onChange={onChangeAutoSubmit}
                                size="small"
                            />
                        }
                        label={<span className='checkboxLabel'>{chrome.i18n.getMessage("configurationAutoSubmitLabel")}</span>}
                        title={chrome.i18n.getMessage("configurationAutoSubmitTitle")}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={configuration.addTableLink}
                                onChange={onChangeAddTableLink}
                                size="small"
                            />
                        }
                        label={<span className='checkboxLabel'>{chrome.i18n.getMessage("configurationAddTableLinkLabel")}</span>}
                        title={chrome.i18n.getMessage("configurationAddTableLinkTitle")}
                    />
                    <TextField
                        className='place'
                        value={configuration.place}
                        onChange={onChangeCustomPlace}
                        size="small"
                        label={<span className='checkboxLabel'>{chrome.i18n.getMessage("configurationPlaceLabel")}</span>}
                        title={chrome.i18n.getMessage("configurationPlaceTitle")}
                        variant="standard"
                        inputProps={{ style: { fontSize: 14 } }}
                    />
                </FormGroup>
            </div>
        </div>
    )
}