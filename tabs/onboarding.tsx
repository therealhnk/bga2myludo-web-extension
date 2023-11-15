import icon from "data-base64:~assets/bga2myludo_icon.png";
import '~styles/onboarding.scss';

function BoardingPage() {
    const manifestData = chrome.runtime.getManifest();

    const currentVersion = manifestData.version;

    return (
        <div id='onboarding'>
            <div id="background">
                <div id="c-1"></div>
                <div id="c-2"></div>
            </div>
            <header>
                <img src={icon} alt="bga2myludo" />
                <span>{chrome.i18n.getMessage("extensionName")}</span>
                <span>version {currentVersion}</span>
            </header>
        </div>
    )
}
//chrome-extension://nodpmbpadgggdkpllmigkcmnphfegemf/tabs/onboarding.html

// se baser sur chrome-extension://mlomiejdfkolichcflejclcbmpeaniij/app/templates/onboarding.html

export default BoardingPage