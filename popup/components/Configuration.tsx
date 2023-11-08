import { FormControlLabel, FormGroup, Grid, Switch, TextField } from '@mui/material';
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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={configuration.autoSubmit}
                                        onChange={onChange}
                                        name='autoSubmit'
                                        size="small"
                                    />
                                }
                                label={<span className='checkboxLabel'>{chrome.i18n.getMessage("configurationAutoSubmitLabel")}</span>}
                                labelPlacement="start"
                                title={chrome.i18n.getMessage("configurationAutoSubmitTitle")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={configuration.excludeFromStatistics}
                                        onChange={onChange}
                                        name='excludeFromStatistics'
                                        size="small"
                                    />
                                }
                                label={<span className='checkboxLabel'>{chrome.i18n.getMessage("configurationExcludeFromStatisticsLabel")}</span>}
                                labelPlacement="start"
                                title={chrome.i18n.getMessage("configurationExcludeFromStatisticsTitle")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={configuration.addTableLink}
                                        onChange={onChange}
                                        name='addTableLink'
                                        size="small"
                                    />
                                }
                                label={<span className='checkboxLabel'>{chrome.i18n.getMessage("configurationAddTableLinkLabel")}</span>}
                                labelPlacement="start"
                                title={chrome.i18n.getMessage("configurationAddTableLinkTitle")}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={configuration.fillPlace}
                                        onChange={onChange}
                                        name='fillPlace'
                                        size="small"
                                    />
                                }
                                label={<span className='checkboxLabel'>{chrome.i18n.getMessage("configurationfillPlaceLabel")}</span>}
                                labelPlacement="start"
                                title={chrome.i18n.getMessage("configurationfillPlaceTitle")}

                            />
                        </Grid>
                        {configuration.fillPlace &&
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        className='place'
                                        value={configuration.place}
                                        name='place'
                                        onChange={onChange}
                                        size="small"
                                        label={chrome.i18n.getMessage("configurationPlaceLabel")}
                                        title={chrome.i18n.getMessage("configurationPlaceTitle")}
                                        variant='standard'
                                        inputProps={{ style: { fontSize: 14 } }}
                                    />
                                </Grid>
                            </>
                        }
                    </Grid>
                </FormGroup>
            </div >
        </div >
    )
}