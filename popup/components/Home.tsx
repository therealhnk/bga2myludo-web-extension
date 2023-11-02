import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {
    return (
        <div>
            {chrome.i18n.getMessage("welcomeMessage")}
        </div>
    )
}