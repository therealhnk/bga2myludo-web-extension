import { Card, CardContent, Container, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import icon from "data-base64:~assets/bga2myludo_icon.png";
import '~tabs/onboarding.scss';
import getTheme from "~theme/customTheme";

function BoardingPage() {
    const manifestData = chrome.runtime.getManifest();
    const theme = getTheme(false);
    const currentVersion = manifestData.version;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
                <Container maxWidth="sm">
                    <Card sx={{ maxWidth: 550 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Bienvenue sur BGA2Myludo
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                L'extension qui vous permet d'exporter vos parties BGA sur Myludo !
                            </Typography>
                            <Typography variant="body1">
                                Découvrez les fonctionnalités enrichies de cette nouvelle version :
                            </Typography>
                            <Typography variant="body2">
                                <ul>
                                    <li>Configurez l'extension selon vos préférences</li>
                                    <li>Associez vos amis sur BGA avec ceux sur Myludo en toute simplicité</li>
                                    <li>Choisissez la correspondance entre les jeux BGA et ceux de Myludo</li>
                                    <li>Sauvegardez et transférez votre configuration rapidement</li>
                                    <li>Gardez un oeil sur l'état de la connection avec les plateformes Board Game Arena et Myludo</li>
                                </ul>
                            </Typography>
                            <Typography variant="h6" component="div" align="center">
                                Pour configurer le comportement selon votre goût
                            </Typography>
                            <Typography variant="h6" component="div" align="center">
                                Il vous suffit de cliquer sur l'icône de l'extension !
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        </ThemeProvider>
    )

}

export default BoardingPage