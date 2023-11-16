import { Divider, List, ListItemButton, ListItemIcon, ListItemText, Switch, TextField } from '@mui/material';
import { useCallback } from 'react';
import type { Configuration as ConfigurationModel } from '~core/models/configuration';
import '~styles/common.scss';

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

    const onClick = useCallback((name: string): void => {
        onConfigurationUpdated({ ...configuration, [name]: !configuration[name] });
    }, [configuration, onConfigurationUpdated]);

    return (
        <div className='configuration'>
            <div className="title">{chrome.i18n.getMessage("configurationTitle")}</div>
            <List dense disablePadding>
                <ListItemButton onClick={() => onClick("addTableLink")}>
                    <ListItemIcon>
                        <Switch checked={configuration.addTableLink} size='small' />
                    </ListItemIcon>
                    <ListItemText
                        primary={<span className='configuration-item-primary'>{chrome.i18n.getMessage("configurationAddTableLinkLabel")}</span>}
                        secondary={<span className='configuration-item-secondary'>{chrome.i18n.getMessage("configurationAddTableLinkTitle")}</span>}
                    />
                </ListItemButton>

                <Divider />

                <ListItemButton onClick={() => onClick("excludeFromStatistics")}>
                    <ListItemIcon>
                        <Switch checked={configuration.excludeFromStatistics} size='small' />
                    </ListItemIcon>
                    <ListItemText
                        primary={<span className='configuration-item-primary'>{chrome.i18n.getMessage("configurationExcludeFromStatisticsLabel")}</span>}
                        secondary={<span className='configuration-item-secondary'>{chrome.i18n.getMessage("configurationExcludeFromStatisticsTitle")}</span>}
                    />
                </ListItemButton>

                <Divider />

                <ListItemButton onClick={() => onClick("fillPlace")}>
                    <ListItemIcon>
                        <Switch checked={configuration.fillPlace} size='small' />
                    </ListItemIcon>
                    <ListItemText
                        className='configuration-item'
                        primary={<span className='configuration-item-primary'>{chrome.i18n.getMessage("configurationFillPlaceLabel")}</span>}
                        secondary={<span className='configuration-item-secondary'>{chrome.i18n.getMessage("configurationFillPlaceTitle")}</span>}
                    />
                </ListItemButton>
                {configuration.fillPlace &&
                    <div>
                        <TextField
                            className='configuration-textfield'
                            value={configuration.place}
                            name='place'
                            onChange={onChange}
                            size="small"
                            label={chrome.i18n.getMessage("configurationPlaceLabel")}
                            variant='standard'
                            inputProps={{ style: { fontSize: 14 } }}
                        />
                    </div>
                }

                <Divider />

                <ListItemButton onClick={() => onClick("autoSubmit")}>
                    <ListItemIcon>
                        <Switch checked={configuration.autoSubmit} size='small' />
                    </ListItemIcon>
                    <ListItemText
                        primary={<span className='configuration-item-primary'>{chrome.i18n.getMessage("configurationAutoSubmitLabel")}</span>}
                        secondary={<span className='configuration-item-secondary'>{chrome.i18n.getMessage("configurationAutoSubmitTitle")}</span>}
                    />
                </ListItemButton>

                <ListItemButton onClick={() => onClick("autoUpdateUsers")}>
                    <ListItemIcon>
                        <Switch checked={configuration.autoUpdateUsers} size='small' />
                    </ListItemIcon>
                    <ListItemText
                        primary={<span className='configuration-item-primary'>{chrome.i18n.getMessage("configurationAutoUpdateUsersLabel")}</span>}
                        secondary={<span className='configuration-item-secondary'>{chrome.i18n.getMessage("configurationAutoUpdateUsersTitle")}</span>}
                    />
                </ListItemButton>

                <ListItemButton onClick={() => onClick("customizeCurrentPlayer")}>
                    <ListItemIcon>
                        <Switch checked={configuration.customizeCurrentPlayer} size='small' />
                    </ListItemIcon>
                    <ListItemText
                        className='configuration-item'
                        primary={<span className='configuration-item-primary'>{chrome.i18n.getMessage("configurationCustomizeCurrentPlayerLabel")}</span>}
                        secondary={<span className='configuration-item-secondary'>{chrome.i18n.getMessage("configurationCustomizeCurrentPlayerTitle")}</span>}
                    />
                </ListItemButton>
                {configuration.customizeCurrentPlayer &&
                    <div>
                        <TextField
                            className='configuration-textfield'
                            value={configuration.customCurrentPlayerName}
                            name='customCurrentPlayerName'
                            onChange={onChange}
                            size="small"
                            label={chrome.i18n.getMessage("configurationCustomCurrentNamePlayerLabel")}
                            variant='standard'
                            inputProps={{ style: { fontSize: 14 } }}
                        />
                    </div>
                }

            </List>
        </div>
    )
}