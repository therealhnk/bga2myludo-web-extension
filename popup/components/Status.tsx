import 'bootstrap/dist/css/bootstrap.css';
import { useCallback, useEffect, useState } from 'react';
import { ConnectionStatus } from '~popup/models/StatusModel';
import boardGameArenaService from '~core/services/boardGameArenaService';
import myludoService from '~core/services/myludoService';

function getStatus(status: ConnectionStatus) {
    switch (status) {
        case ConnectionStatus.Connected:
            return <span className="badge text-bg-success rounded-pill">{chrome.i18n.getMessage("connected")}</span>;
        case ConnectionStatus.Loading:
            return <span className="badge text-bg-warning rounded-pill">{chrome.i18n.getMessage("loading")}</span>;
        case ConnectionStatus.Disconnected:
            return <span className="badge text-bg-danger rounded-pill">{chrome.i18n.getMessage("disconnected")}</span>;
    }
}

function Status() {
    const [bgaStatus, setBGAStatus] = useState(ConnectionStatus.Loading);
    const [myludoStatus, setMyludoStatus] = useState(ConnectionStatus.Loading);
    const [bgaPermission, setBGAPermission] = useState<boolean>();
    const [myludoPermission, setMyludoPermission] = useState<boolean>();

    useEffect(() => {
        boardGameArenaService
            .isConnected()
            .then((response) => { setBGAStatus(response ? ConnectionStatus.Connected : ConnectionStatus.Disconnected) });

        myludoService
            .isConnected()
            .then((response) => { setMyludoStatus(response ? ConnectionStatus.Connected : ConnectionStatus.Disconnected) });

        boardGameArenaService
            .hasPermission()
            .then((response) => { setBGAPermission(response) });

        myludoService
            .hasPermission()
            .then((response) => { setMyludoPermission(response) });
    }, []);

    const requestPermission = useCallback((host) => {
        switch (host) {
            case 'bga':
                boardGameArenaService.requestPermission();
                break;
            case 'myludo':
                myludoService.requestPermission();
                break;
        }
    }, []);

    return (
        <div>
            <div>
                <div>Board Game Arena : </div>
                <div>{getStatus(bgaStatus)} (permission : {bgaPermission ? 'granted' : <span>refused <button onClick={() => requestPermission('bga')}>Authorize</button></span>})</div>
            </div>
            <div>
                <div>Myludo : </div>
                <div>{getStatus(myludoStatus)} (permission : {myludoPermission ? 'granted' : <span>refused <button onClick={() => requestPermission('myludo')}>Authorize</button></span>})</div>
            </div>
        </div>
    )
}

export default Status