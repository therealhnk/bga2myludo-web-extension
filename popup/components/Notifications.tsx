import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, ImageList, ImageListItem, ImageListItemBar, Tooltip } from '@mui/material';
import { Storage } from "@plasmohq/storage";
import React, { useEffect, useState } from 'react';
import type { PlayerNotification } from '~core/models/playerNotification';
import '~popup/popup.scss';

type Props = {
    onNotificationsRefresh: () => void;
}

export default function Notifications({ onNotificationsRefresh }: Props) {
    const [notifications, setNotifications] = useState<PlayerNotification[]>([]);

    const storage = new Storage({ area: "local" });

    useEffect(() => {
        onNotificationsRefresh();

        storage.get('lastNotifications').then(result => {
            if (result) {
                setNotifications(JSON.parse(result) as PlayerNotification[]);
            }
        });
    }, [storage]);

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
            {(!notifications || notifications.length === 0) &&
                <div className="message">{chrome.i18n.getMessage("notificationsMessageEmpty")}</div>
            }
            <div>
                <ImageList>
                    {notifications && notifications.map((o, index) =>
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
                                subtitle={`${chrome.i18n.getMessage("notificationsdateAgoPrefix")}${getFormattedDateAgo(o.dateAgo)}`}
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
                                                <IconButton target='_blank' href={`https://www.myludo.fr/#!/?bgatableid=${o.tableId}`}>
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