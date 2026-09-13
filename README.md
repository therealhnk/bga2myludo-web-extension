# bga2myludo-web-extension

Facilitez vous la saisie des parties de Board Game Arena sur Myludo !

[![demo](https://img.youtube.com/vi/NAIOlyNR2dQ/0.jpg)](https://www.youtube.com/watch?v=NAIOlyNR2dQ)

L'extension BGA2Myludo permet de faciliter la saisie sur le site Myludo des parties jouées sur le site Board Game Arena.

Une fois l'extension installée, à la fin de vos parties sur BGA, vous verrez apparaitre un nouveau bouton "Enregistrer sur Myludo". En cliquant dessus, une fenêtre sur Myludo s'ouvrira avec l'ensemble des informations saisies, il ne vous restera qu'à cliquer sur valider !

Nb : je fais cette extension sur mon temps libre afin de gagner du temps lors des saisies de parties. N'hésitez pas à me contacter si vous constatez des bugs ou améliorations à apporter😘

## Liens vers l'extension
Chrome : https://chrome.google.com/webstore/detail/bga2myludo/milabpkocghjifbnhfpglfdljnljagfj

Firefox : https://addons.mozilla.org/af/firefox/addon/bga2myludo

Edge : https://microsoftedge.microsoft.com/addons/detail/bga2myludo/lkccpffjneolnhkhejllkfopoajjokgm

Opera :
https://addons.opera.com/fr/extensions/details/bga2myludo/


## Ca ne fonctionne pas sur Firefox :-(

Si si ça fonctionne, c'est juste un peu plus complexe :-)

Il faut donner les droits au plugin d'accéder aux données du site www.myludo.fr et www.boardgamearena.com

![unnamed](https://github.com/therealhnk/bga2myludo-chrome-extension/assets/4628609/ab29c267-578e-49ca-963e-f6e06e6b6f55)

# Considérations techniques

Ce projet a été initié avec le framework Plasmo (https://docs.plasmo.com/), puis migré vers WXT (https://wxt.dev/) à partir de la version 5.0.

## Démarrage

Pour lancer le serveur de developement : 

```bash
pnpm dev
# ou pour Firefox
pnpm dev:firefox
```

## Build

```bash
pnpm build
# ou pour Firefox
pnpm build:firefox
```
