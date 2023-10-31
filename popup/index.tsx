import AutoSubmit from "./components/AutoSubmit"
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
            <h2>{browser.i18n.getMessage("welcomeMessage")}</h2>
            <Status />
            <CustomPlace />
            <AutoSubmit />
        </div>
    )
}

export default PopupIndex
