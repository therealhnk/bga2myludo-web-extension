## Automated BGA Games Update

This PR updates the `games.json` file with the latest games from BoardGameArena.

### Changes
- Updated game list from BGA (beta games + final released games)
- Preserved existing game mappings
- Added any new games found
- Resolved MyLudo IDs automatically when the BGA title matches exactly (French edition first, most relevant search result when several match)
- Sorted games: mapped games first (alphabetical), then unmapped games (alphabetical)
- Bumped version patch number

## MyLudo mapping

### ✅ Résolus automatiquement (7)

- [`fountains`](https://en.boardgamearena.com/gamepanel?game=fountains) Fountains → [Fountains (2025)](https://www.myludo.fr/#!/game/fountains-90838) `fountains-90838` ⚠️ _pas d’édition FR (gb), vérifier s’il en existe une au titre différent_
- [`growsky`](https://en.boardgamearena.com/gamepanel?game=growsky) Grow Sky → [Grow Sky (2024)](https://www.myludo.fr/#!/game/grow-sky-80564) `grow-sky-80564` ⚠️ _pas d’édition FR (gb, jp), vérifier s’il en existe une au titre différent_
- [`pipoca`](https://en.boardgamearena.com/gamepanel?game=pipoca) Pipoca → [Pipoca (2025)](https://www.myludo.fr/#!/game/pipoca-99639) `pipoca-99639` ⚠️ _pas d’édition FR (pt), vérifier s’il en existe une au titre différent_
- [`rainbowallplay`](https://en.boardgamearena.com/gamepanel?game=rainbowallplay) Rainbow → [Rainbow (2026)](https://www.myludo.fr/#!/game/rainbow-96091) `rainbow-96091`
  - ⚠️ _3 autre(s) édition(s) au même titre, la plus pertinente a été retenue :_
    - [Rainbow (2010)](https://www.myludo.fr/#!/game/rainbow-5571) `rainbow-5571` _basegame, fr_
    - [Rainbow (2021)](https://www.myludo.fr/#!/game/rainbow-53711) `rainbow-53711` _basegame, fr, de_
    - [Rainbow (2019)](https://www.myludo.fr/#!/game/rainbow-59490) `rainbow-59490` _basegame, fr_
- [`serenity`](https://en.boardgamearena.com/gamepanel?game=serenity) Serenity → [Serenity (2026)](https://www.myludo.fr/#!/game/serenity-100279) `serenity-100279`
- [`throughthedesert`](https://en.boardgamearena.com/gamepanel?game=throughthedesert) Through the Desert → [Through the Desert (2025)](https://www.myludo.fr/#!/game/through-the-desert-91771) `through-the-desert-91771`
- [`winecellar`](https://en.boardgamearena.com/gamepanel?game=winecellar) Wine Cellar → [Wine Cellar (2025)](https://www.myludo.fr/#!/game/wine-cellar-89061) `wine-cellar-89061` ⚠️ _pas d’édition FR (gb), vérifier s’il en existe une au titre différent_

### ⚠️ À traiter manuellement (5)

- [`girasoles`](https://en.boardgamearena.com/gamepanel?game=girasoles) **Girasoles** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Girasoles/games/*/*/*/*/*/*/*/*/18/bymagic)
- [`grizzo`](https://en.boardgamearena.com/gamepanel?game=grizzo) **Grizzo** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Grizzo/games/*/*/*/*/*/*/*/*/18/bymagic)
- [`phopho`](https://en.boardgamearena.com/gamepanel?game=phopho) **Pho Pho** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Pho%20Pho/games/*/*/*/*/*/*/*/*/18/bymagic)
  - [Photo Tour North America -  Photo Projects (2024)](https://www.myludo.fr/#!/game/photo-tour-north-america-photo-projects-98360) `photo-tour-north-america-photo-projects-98360` _extension, gb_
  - [Photo Tour - North America (2024)](https://www.myludo.fr/#!/game/photo-tour-north-america-98359) `photo-tour-north-america-98359` _basegame, gb_
  - [Marvel Champions – Phoenix (2022)](https://www.myludo.fr/#!/game/marvel-champions-phoenix-59049) `marvel-champions-phoenix-59049` _extension, ?_
  - [Photo Safari (2011)](https://www.myludo.fr/#!/game/photo-safari-45391) `photo-safari-45391` _basegame, ?_
  - [Murder Phone (2026)](https://www.myludo.fr/#!/game/murder-phone-101471) `murder-phone-101471` _basegame, ?_
- [`riviera`](https://en.boardgamearena.com/gamepanel?game=riviera) **Riviera** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Riviera/games/*/*/*/*/*/*/*/*/18/bymagic)
  - [Riviera Quest (1989)](https://www.myludo.fr/#!/game/riviera-quest-49022) `riviera-quest-49022` _basegame, ?_
  - [Moomins on the Riviera (2014)](https://www.myludo.fr/#!/game/moomins-on-the-riviera-30509) `moomins-on-the-riviera-30509` _basegame, ?_
  - [Monopoly - Lombardia (2022)](https://www.myludo.fr/#!/game/monopoly-lombardia-83170) `monopoly-lombardia-83170` _basegame, it_
  - [Age of Steam 2014 Sets (2014)](https://www.myludo.fr/#!/game/age-of-steam-2014-sets-42892) `age-of-steam-2014-sets-42892` _extension, ?_
  - [Age of Steam 2016 Sets (2016)](https://www.myludo.fr/#!/game/age-of-steam-2016-sets-42894) `age-of-steam-2016-sets-42894` _extension, ?_
- [`yavalath`](https://en.boardgamearena.com/gamepanel?game=yavalath) **Yavalath** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Yavalath/games/*/*/*/*/*/*/*/*/18/bymagic)
  - [Mammalath (2019)](https://www.myludo.fr/#!/game/mammalath-51044) `mammalath-51044` _basegame, gb_

### Source URLs
- [Beta games](https://fr.boardgamearena.com/gamelist?isBetaStatus=) - Games currently in beta testing
- [Released games](https://fr.boardgamearena.com/gamelist?allGames=) - Games officially released

---
*This is an automated pull request generated by the daily update workflow.*
