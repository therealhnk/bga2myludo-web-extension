import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useCallback } from 'react';
import type { Configuration as ConfigurationModel } from '~core/models/configuration';
import '~popup/index.scss';

type Props = {
    configuration: ConfigurationModel;
    onConfigurationUpdated: (configuration: ConfigurationModel) => void;
}

export default function Configuration({ configuration, onConfigurationUpdated }: Props) {
    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        let value: any;
        switch (event.currentTarget.type) {
            case 'text':
                value = event.target.value;
                break;
            case 'checkbox':
                value = event.target.checked
                break;
        }

        onConfigurationUpdated({ ...configuration, [event.currentTarget.name]: value });
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
                                onChange={onChange}
                                name='autoSubmit'
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
                                onChange={onChange}
                                name='addTableLink'
                                size="small"
                            />
                        }
                        label={<span className='checkboxLabel'>{chrome.i18n.getMessage("configurationAddTableLinkLabel")}</span>}
                        title={chrome.i18n.getMessage("configurationAddTableLinkTitle")}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={configuration.excludeFromStatistics}
                                onChange={onChange}
                                name='excludeFromStatistics'
                                size="small"
                            />
                        }
                        label={<span className='checkboxLabel'>{chrome.i18n.getMessage("configurationExcludeFromStatisticsLabel")}</span>}
                        title={chrome.i18n.getMessage("configurationExcludeFromStatisticsTitle")}
                    />
                    <TextField
                        className='place'
                        value={configuration.place}
                        name='place'
                        onChange={onChange}
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