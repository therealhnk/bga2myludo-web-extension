import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useRef, useState } from 'react';
import { ConnectionStatus } from '~core/models/connectionStatus';
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

    useEffect(() => {
        boardGameArenaService
            .isConnected()
            .then((response) => { setBGAStatus(response ? ConnectionStatus.Connected : ConnectionStatus.Disconnected) });

        myludoService
            .isConnected()
            .then((response) => { setMyludoStatus(response ? ConnectionStatus.Connected : ConnectionStatus.Disconnected) });
    }, []);

    return (
        <div>
            <div>
                <div>Board Game Arena : </div>
                <div>{getStatus(bgaStatus)}</div>
            </div>
            <div>
                <div>Myludo : </div>
                <div>{getStatus(myludoStatus)}</div>
            </div>
        </div>
    )
}

export default Status