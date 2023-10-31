import CustomPlace from "./components/CustomPlace"
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
            <CustomPlace />
        </div>
    )
}

export default PopupIndex
