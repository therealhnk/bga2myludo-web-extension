import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import type { Configuration as ConfigurationModel } from '~core/models/configuration';
import type { Notification as NotificationModel } from '~core/models/notification';
import '~popup/popup.scss';

type Props = {
    configuration: ConfigurationModel;
    notifications: NotificationModel[];
    onConfigurationUpdated: (configuration: ConfigurationModel) => void;
}

export default function Notifications({ notifications, configuration, onConfigurationUpdated }: Props) {
    return (
        <div className="notifications">
            <div className="title">{chrome.i18n.getMessage("notificationsTitle")}</div>
            <div>
                <List dense>
                    {notifications && notifications.map(o =>
                        <ListItem key={o.id}>
                            <ListItemText
                                primary={`${o.timestamp} - ${o.gameName}`}
                                secondary={o.gameLink}
                            />
                        </ListItem>
                    )}
                </List>
            </div>
        </div>
    )
}