import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import { Button, CircularProgress, Grid } from "@mui/material";
import { green, orange, red } from "@mui/material/colors";
import bgaIcon from "data-base64:~assets/bga_icon.png";
import myludoIcon from "data-base64:~assets/myludo_icon.png";
import { useCallback, useEffect, useState } from 'react';
import boardGameArenaService from '~core/services/boardGameArenaService';
import myludoService from '~core/services/myludoService';
import '~popup/index.scss';
import { ConnectionStatus } from '~popup/models/StatusModel';

function getHostUrl(host: string) {
    switch (host) {
        case 'bga':
            return 'https://fr.boardgamearena.com/account';
        case 'myludo':
            return 'https://www.myludo.fr/#!/presentation?bga2myludo=login';
    }

    return null;
}

function getMessage(status: ConnectionStatus) {
    switch (status) {
        case ConnectionStatus.Connected:
            return chrome.i18n.getMessage("connected");
        case ConnectionStatus.Loading:
            return chrome.i18n.getMessage("loading");
        case ConnectionStatus.Disconnected:
            return chrome.i18n.getMessage("disconnected");
        case ConnectionStatus.Unauthorized:
            return chrome.i18n.getMessage("unauthorized");
        case ConnectionStatus.Unknown:
            return chrome.i18n.getMessage("unknown");
    }
}

function getStatus(promisePermission: Promise<boolean>, promiseConnectionState: Promise<boolean>) {
    return Promise
        .all([promisePermission, promiseConnectionState])
        .then((values) => {
            if (values[0]) {// si on est autorisé 
                if (values[1]) {// si on est connecté
                    return ConnectionStatus.Connected;
                } else {
                    return ConnectionStatus.Disconnected;
                }
            } else {
                return ConnectionStatus.Unauthorized
            }
        })
        .catch(() => {
            return ConnectionStatus.Unknown;
        });
}

function Status() {
    const [bgaStatus, setBGAStatus] = useState(ConnectionStatus.Loading);
    const [myludoStatus, setMyludoStatus] = useState(ConnectionStatus.Loading);

    useEffect(() => {
        getStatus(boardGameArenaService.hasPermission(), boardGameArenaService.isConnected())
            .then((result) => setBGAStatus(result));

        getStatus(myludoService.hasPermission(), myludoService.isConnected())
            .then((result) => setMyludoStatus(result));
    }, []);

    const requestPermission = useCallback((host: string) => {
        switch (host) {
            case 'bga':
                boardGameArenaService.requestPermission();
                break;
            case 'myludo':
                myludoService.requestPermission();
                break;
        }
    }, []);

    function getStatusIcon(host: string, status: ConnectionStatus) {
        switch (status) {
            case ConnectionStatus.Connected:
                return <CheckIcon fontSize='small' sx={{ color: green[500] }} />
            case ConnectionStatus.Loading:
                return <CircularProgress size="1.25rem" />
            case ConnectionStatus.Disconnected:
                // return <IconButton href={getHostUrl(host)} target="_blank">
                return <WarningIcon fontSize='small' sx={{ color: orange[500] }} />
            // </IconButton>
            case ConnectionStatus.Unauthorized:
                // return <IconButton onClick={() => requestPermission(host)}>
                return <ErrorIcon fontSize='small' sx={{ color: red[500] }} />
            // </IconButton>
            case ConnectionStatus.Unknown:
                return <ErrorIcon fontSize='small' sx={{ color: red[500] }} />
        }
    }

    return (
        <Grid container>
            <Grid item xs={6} textAlign='center'>
                <Button title={getMessage(bgaStatus)} fullWidth>
                    <div className="status">
                        <span><img className="icon" src={bgaIcon} alt="Board Game Arena" /></span>
                        <span>{getStatusIcon('bga', bgaStatus)}</span>
                    </div>
                </Button>
            </Grid>
            <Grid item xs={6} textAlign='center'>
                <Button title={getMessage(myludoStatus)} fullWidth>
                    <div className="status">
                        <span><img className="icon" src={myludoIcon} alt="Myludo" /></span>
                        <span>{getStatusIcon('myludo', myludoStatus)}</span>
                    </div>
                </Button>
            </Grid>
        </Grid>
    )
}

export default Status