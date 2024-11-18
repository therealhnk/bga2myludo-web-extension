import { Card, CardContent, Container, CssBaseline, Grid, ThemeProvider, Typography } from "@mui/material";
import icon from "data-base64:~assets/bga2myludo_icon.png";
import React from "react";
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
                <Container className="container">
                    <Grid container spacing={1} justifyContent="center">
                        <Grid item sm={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Bienvenue sur BGA2Myludo
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        L'extension qui vous permet d'exporter vos parties BGA sur Myludo !
                                    </Typography>
                                    <Typography variant="body1" component="div" align="center">
                                        Pour configurer le comportement selon votre goût
                                    </Typography>
                                    <Typography variant="body1" component="div" align="center">
                                        Il vous suffit de cliquer sur l'icône de l'extension !
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Version 3.8
                                    </Typography>
                                    <Typography variant="body1">
                                        Ajout du lien myLudo sur la <a href="https://boardgamearena.com/player?section=lastresults" target="_blank">page des derniers resultats</a>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Version 3.7
                                    </Typography>
                                    <Typography variant="body1">
                                        Nettoyage d'automne
                                    </Typography>
                                    <Typography variant="body2" className="onboarding-paragraph">
                                        Grosse maj des jeux supportés (+49)
                                        <br />Correction de vieux bugs latents :
                                        <br />- Calcul du delai de partie dans les notifications
                                        <br />- Détection des parties en doublon KO avec des pseudos avec caractères spéciaux
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Version 3.6
                                    </Typography>
                                    <Typography variant="body1">
                                        Remise à plat sur les conditions de victoires
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Version 3.5
                                    </Typography>
                                    <Typography variant="body1">
                                        Corrections sur les conditions de victoires
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Version 3.4
                                    </Typography>
                                    <Typography variant="body1">
                                        Ajout des notifications
                                    </Typography>
                                    <Typography variant="body2" className="onboarding-paragraph">
                                        Si, comme moi, vous jouez en tour par tour, il peut arriver de passer à côté des parties terminées. Désormais, le plugin vous alerte dès qu'une partie vient de se terminer. Il vous suffira ensuite de vous rendre sur la cloche et de cliquer sur le bouton "Sauvegarder".
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Version 3.3
                                    </Typography>
                                    <Typography variant="body1">
                                        On the road again !
                                    </Typography>
                                    <Typography variant="body2" className="onboarding-paragraph">
                                        Désolé de vous avoir fait subir une version toute naze avec la 3.2 :-(<br />
                                        Au passage, j'ai pu constater que de nombreuses personnes ne savaient pas qu'il était possible de configurer le comportement du plugin.<br />
                                        J'ai fait une petite vidéo pour vous montrer comment faire.
                                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/AQTH3saUhvQ?si=HACFggMimjtvd6V-" title="How to pin extension and browse configuration" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                        Bisous, Benjamin.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Version 3.2
                                    </Typography>
                                    <Typography variant="body1">
                                        Shit happens
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Version 3.1
                                    </Typography>
                                    <Typography variant="body1">
                                        Maîtrisez l'extension avec notre dernière fonctionnalité : la correspondance des jeux !
                                    </Typography>
                                    <Typography variant="body2" className="onboarding-paragraph">
                                        Pour éviter que vos parties sur BGA ne soient liées à une édition inappropriée de votre jeu favori, suivez simplement ces étapes : rendez-vous dans le menu "Correspondance des jeux" et indiquez l'identifiant Myludo correspondant (trouvable dans l'URL, par exemple : https://www.myludo.fr/#!/game/trio-<span className="highlight">61611</span>).
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Version 3.0
                                    </Typography>
                                    <Typography variant="body1">
                                        Découvrez les évolutions incluses dans cette nouvelle version :
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                        <ul>
                                            <li>Configurez l'extension selon vos préférences</li>
                                            <li>Associez vos amis sur BGA avec ceux sur Myludo en toute simplicité</li>
                                            <li>Sauvegardez et transférez votre configuration rapidement</li>
                                            <li>Gardez un oeil sur l'état de la connection avec les plateformes Board Game Arena et Myludo</li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </ThemeProvider >
    )

}

export default BoardingPage