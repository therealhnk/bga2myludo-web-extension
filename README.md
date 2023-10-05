# bga2myludo-chrome-extension

Facilitez vous la saisie des parties de Board Game Arena sur Myludo !

L'extension BGA2Myludo permet de faciliter la saisie sur le site Myludo des parties jouées sur le site Board Game Arena.

Une fois l'extension installée, à la fin de vos parties sur BGA, vous verrez apparaitre un nouveau bouton "Enregistrer sur Myludo". En cliquant dessus, une fenêtre sur Myludo s'ouvrira avec l'ensemble des informations saisies, il ne vous restera qu'à cliquer sur valider !

Nb : je fais cette extension sur mon temps libre afin de gagner du temps lors des saisies de parties. N'hésitez pas à me contacter si vous constatez des bugs ou améliorations à apporter😘

# Ca ne fonctionne pas sur Firefox :-(

Si si a fonctionne, c'est juste un peu plus complexe :-)
Il faut donner les droits au plugin d'accéder aux données du site www.myludo.fr et www.boardgamearena.com
![unnamed](https://github.com/therealhnk/bga2myludo-chrome-extension/assets/4628609/ab29c267-578e-49ca-963e-f6e06e6b6f55)

# Considérations techniques

Ce projet a été initié avec le framework Plasmo (https://docs.plasmo.com/)

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
