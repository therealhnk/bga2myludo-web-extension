import Status from "./components/Status"

function PopupIndex() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: 16,
                width: '360px'
            }}>
            <h2>{chrome.i18n.getMessage("welcomeMessage")}</h2>
            <Status />
        </div>
    )
}

export default PopupIndex
