import '~popup/index.scss';

export default function Home() {
    return (
        <div className="home">
            <div className="message">{chrome.i18n.getMessage("welcomeMessage")}</div>
        </div>
    )
}