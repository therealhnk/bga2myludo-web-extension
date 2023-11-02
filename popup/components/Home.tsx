import '~popup/index.scss';

export default function Home() {
    return (
        <div className="home">
            <span>{chrome.i18n.getMessage("welcomeMessage")}</span>
        </div>
    )
}