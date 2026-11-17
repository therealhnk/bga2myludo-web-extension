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

### ✅ Résolus automatiquement (5)

- [`andromedasedge`](https://en.boardgamearena.com/gamepanel?game=andromedasedge) Andromeda's Edge → [Andromeda's Edge (2024)](https://www.myludo.fr/#!/game/andromeda-s-edge-63136) `andromeda-s-edge-63136`
  - ⚠️ _1 autre(s) édition(s) au même titre, la plus pertinente a été retenue :_
    - [Andromeda's Edge (2025)](https://www.myludo.fr/#!/game/andromeda-s-edge-83920) `andromeda-s-edge-83920` _basegame, fr_
- [`bigsur`](https://en.boardgamearena.com/gamepanel?game=bigsur) Big Sur → [Big Sur (2025)](https://www.myludo.fr/#!/game/big-sur-90792) `big-sur-90792` ⚠️ _pas d’édition FR (gb), vérifier s’il en existe une au titre différent_
- [`dropsofevil`](https://en.boardgamearena.com/gamepanel?game=dropsofevil) Drops of Evil → [Drops of Evil (2026)](https://www.myludo.fr/#!/game/drops-of-evil-100497) `drops-of-evil-100497` ⚠️ _pas d’édition FR (gb), vérifier s’il en existe une au titre différent_
- [`loyaltyrome`](https://en.boardgamearena.com/gamepanel?game=loyaltyrome) Loyalty: Rome → [Loyalty - Rome (2026)](https://www.myludo.fr/#!/game/loyalty-rome-100293) `loyalty-rome-100293` ⚠️ _pas d’édition FR (gb, de), vérifier s’il en existe une au titre différent_
- [`wizardsgarden`](https://en.boardgamearena.com/gamepanel?game=wizardsgarden) Wizard's Garden → [Wizard's Garden (2019)](https://www.myludo.fr/#!/game/wizard-s-garden-34984) `wizard-s-garden-34984` ⚠️ _pas d’édition FR (gb, it), vérifier s’il en existe une au titre différent_

### ⚠️ À traiter manuellement (8)

- [`discipline`](https://en.boardgamearena.com/gamepanel?game=discipline) **Discipline: 3 Years at Jeremiah School of Magic** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Discipline%3A%203%20Years%20at%20Jeremiah%20School%20of%20Magic/games/*/*/*/*/*/*/*/*/18/bymagic)
- [`girasoles`](https://en.boardgamearena.com/gamepanel?game=girasoles) **Girasoles** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Girasoles/games/*/*/*/*/*/*/*/*/18/bymagic)
- [`gretchensgarden`](https://en.boardgamearena.com/gamepanel?game=gretchensgarden) **Gretchen's Garden** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Gretchen's%20Garden/games/*/*/*/*/*/*/*/*/18/bymagic)
- [`grizzo`](https://en.boardgamearena.com/gamepanel?game=grizzo) **Grizzo** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Grizzo/games/*/*/*/*/*/*/*/*/18/bymagic)
- [`makemeaplanet`](https://en.boardgamearena.com/gamepanel?game=makemeaplanet) **Make Me a Planet** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Make%20Me%20a%20Planet/games/*/*/*/*/*/*/*/*/18/bymagic)
  - [Thirsty Sword Lesbians - Advanced Lovers & Lesbians (2022)](https://www.myludo.fr/#!/game/thirsty-sword-lesbians-advanced-lovers-lesbians-58699) `thirsty-sword-lesbians-advanced-lovers-lesbians-58699` _extension, gb_
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
