import HistoryIcon from '@mui/icons-material/History';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import { Fragment } from 'react';
import type { Configuration as ConfigurationModel } from '~core/models/configuration';
import type { PlayerNotification } from '~core/models/playerNotification';
import '~popup/popup.scss';
import React = require('react');

type Props = {
    configuration: ConfigurationModel;
    notifications: PlayerNotification[];
}

export default function Notifications({ notifications, configuration }: Props) {
    const getFormattedDateAgo = (minutes: number) => {
        const minutesParHeure = 60;
        const secondesParJour = 1440;

        if (minutes >= secondesParJour) {
            const jours = Math.ceil(minutes / secondesParJour);
            return `${jours} ${chrome.i18n.getMessage("notificationsdateAgoSuffixDay")}${jours > 1 ? 's' : ''}`;
        } else if (minutes >= minutesParHeure) {
            const heures = Math.floor(minutes / minutesParHeure);
            return `${heures} ${chrome.i18n.getMessage("notificationsdateAgoSuffixHour")}heure${heures > 1 ? 's' : ''}`;
        } else {
            return `${minutes} ${chrome.i18n.getMessage("notificationsdateAgoSuffixMinute")}minute${minutes > 1 ? 's' : ''}`;
        }
    };

    return (
        <div className="notifications">
            <div className="title">{chrome.i18n.getMessage("notificationsTitle")}</div>
            <Typography color='secondary' className="message">
                {chrome.i18n.getMessage("notificationsMessage")}
            </Typography>
            <div>
                <List dense disablePadding>
                    {notifications && notifications.map((o, index) =>
                        <Fragment>
                            <ListItem key={o.id} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={o.gameName} src={o.img} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <span>
                                            <span className='notifications-item-primary'>{o.gameName}</span>
                                        </span>
                                    }
                                    secondary={
                                        <span>
                                            <div className='notifications-item-secondary'>
                                                <HistoryIcon className='icon' />
                                                <span className='text' >{chrome.i18n.getMessage("notificationsdateAgoPrefix")}{getFormattedDateAgo(o.dateAgo)}</span>
                                            </div>
                                            <div>
                                                <Tooltip title={chrome.i18n.getMessage("notificationsBgaLink")}>
                                                    <span>
                                                        <IconButton target='_blank' href={`https://boardgamearena.com/table?table=${o.tableId}`}>
                                                            <VisibilityIcon color="primary" />
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                                <Tooltip title={chrome.i18n.getMessage("notificationMyludoLink")}>
                                                    <span>
                                                        <IconButton target='_blank' href={`https://www.myludo.fr/#!/?bgatableid=${o.tableId}`}>
                                                            <SaveIcon color="primary" />
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        </span>
                                    }
                                />

                            </ListItem>
                            {index < notifications.length - 1 &&
                                < Divider />
                            }
                        </Fragment>
                    )}
                </List>
            </div>
        </div >
    )
}