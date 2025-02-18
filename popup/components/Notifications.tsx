import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, ImageList, ImageListItem, ImageListItemBar, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import type { PlayerNotification } from '~core/models/playerNotification';
import notificationsService from '~core/services/notificationsService';
import '~popup/popup.scss';

type Props = {
    onNotificationsRefresh: () => void;
}

export default function Notifications({ onNotificationsRefresh }: Props) {
    const [notifications, setNotifications] = useState<PlayerNotification[]>([]);

    useEffect(() => {
        onNotificationsRefresh();

        notificationsService.getLastNotifications()
            .then(result => {
                setNotifications(result);
            })
    }, []);

    return (
        <div className="notifications">
            <div className="title">{chrome.i18n.getMessage("notificationsTitle")}</div>
            {(!notifications || notifications.length === 0) &&
                <div className="message">{chrome.i18n.getMessage("notificationsMessageEmpty")}</div>
            }
            <div>
                <ImageList>
                    {notifications && notifications.map((o) =>
                        <ImageListItem key={o.id}>
                            <div style={{
                                width: "100%",
                                height: "125px",
                                backgroundImage: `url(https://x.boardgamearena.net/data/gamemedia/${o.gameId}/banner/default_500.jpg)`,
                                backgroundPosition: 'center'
                            }}>
                                <div style={{
                                    width: "100%",
                                    height: "125px",
                                    backgroundImage: `url(https://x.boardgamearena.net/data/gamemedia/${o.gameId}/title/en_500.png)`,
                                    backgroundPosition: 'center center',
                                    backgroundSize: "cover"
                                }}></div>
                            </div>
                            <ImageListItemBar
                                subtitle={`${chrome.i18n.getMessage("notificationsdateAgoPrefix")}${o.timeAgoText}`}
                                actionIcon={
                                    <span>
                                        <Tooltip title={chrome.i18n.getMessage("notificationsBgaLink")}>
                                            <span>
                                                <IconButton target='_blank' href={`https://boardgamearena.com/table?table=${o.tableId}`}>
                                                    <VisibilityIcon sx={{ color: "white" }} />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Tooltip title={chrome.i18n.getMessage("notificationMyludoLink")}>
                                            <span>
                                                <IconButton target='_blank' href={`https://www.myludo.fr/#!/home?bgatableid=${o.tableId}`}>
                                                    <SaveIcon sx={{ color: "white" }} />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </span>
                                }
                            />
                        </ImageListItem>
                    )}
                </ImageList >
            </div >
        </div >
    )
}