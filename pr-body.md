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

### ✅ Résolus automatiquement (15)

- [`alchimix`](https://en.boardgamearena.com/gamepanel?game=alchimix) Alchimix → [Alchimix (2026)](https://www.myludo.fr/#!/game/alchimix-89030) `alchimix-89030`
- [`bottleimp`](https://en.boardgamearena.com/gamepanel?game=bottleimp) Bottle Imp → [Bottle Imp (1995)](https://www.myludo.fr/#!/game/bottle-imp-4658) `bottle-imp-4658` ⚠️ _pas d’édition FR (gb), vérifier s’il en existe une au titre différent_
- [`colorfield`](https://en.boardgamearena.com/gamepanel?game=colorfield) Colorfield → [Color Field (2023)](https://www.myludo.fr/#!/game/color-field-65524) `color-field-65524` ⚠️ _pas d’édition FR (gb), vérifier s’il en existe une au titre différent_
- [`courtisans`](https://en.boardgamearena.com/gamepanel?game=courtisans) Courtisans → [Courtisans (2024)](https://www.myludo.fr/#!/game/courtisans-73844) `courtisans-73844`
  - ⚠️ _1 autre(s) édition(s) au même titre, la plus pertinente a été retenue :_
    - [Courtisans (1998)](https://www.myludo.fr/#!/game/courtisans-18047) `courtisans-18047` _basegame, fr_
- [`evenglow`](https://en.boardgamearena.com/gamepanel?game=evenglow) Evenglow → [Evenglow (2026)](https://www.myludo.fr/#!/game/evenglow-101188) `evenglow-101188` ⚠️ _pas d’édition FR (gb), vérifier s’il en existe une au titre différent_
- [`factoryfunner`](https://en.boardgamearena.com/gamepanel?game=factoryfunner) Factory Funner → [Factory Funner (2016)](https://www.myludo.fr/#!/game/factory-funner-26825) `factory-funner-26825`
- [`greetingsfromearth`](https://en.boardgamearena.com/gamepanel?game=greetingsfromearth) Greetings from Earth → [Greetings from Earth (2026)](https://www.myludo.fr/#!/game/greetings-from-earth-102846) `greetings-from-earth-102846` ⚠️ _pas d’édition FR (gb, de), vérifier s’il en existe une au titre différent_
- [`inanutshell`](https://en.boardgamearena.com/gamepanel?game=inanutshell) In a Nutshell → [In a Nut Shell (2025)](https://www.myludo.fr/#!/game/in-a-nut-shell-96240) `in-a-nut-shell-96240` ⚠️ _pas d’édition FR (gb), vérifier s’il en existe une au titre différent_
- [`minikincity`](https://en.boardgamearena.com/gamepanel?game=minikincity) Minikin City → [Minikin City (2026)](https://www.myludo.fr/#!/game/minikin-city-99499) `minikin-city-99499`
- [`nightatthezoo`](https://en.boardgamearena.com/gamepanel?game=nightatthezoo) Night At The Zoo → [Night at the Zoo (2026)](https://www.myludo.fr/#!/game/night-at-the-zoo-100058) `night-at-the-zoo-100058` ⚠️ _pas d’édition FR (gb), vérifier s’il en existe une au titre différent_
- [`nine`](https://en.boardgamearena.com/gamepanel?game=nine) Nine → [Nine (2024)](https://www.myludo.fr/#!/game/nine-75471) `nine-75471`
  - ⚠️ _1 autre(s) édition(s) au même titre, la plus pertinente a été retenue :_
    - [Nine (2019)](https://www.myludo.fr/#!/game/nine-32481) `nine-32481` _basegame, fr, gb_
- [`rebelprincess`](https://en.boardgamearena.com/gamepanel?game=rebelprincess) Rebel Princess → [Rebel Princess (2023)](https://www.myludo.fr/#!/game/rebel-princess-70848) `rebel-princess-70848` ⚠️ _pas d’édition FR (gb, es), vérifier s’il en existe une au titre différent_
  - ⚠️ _1 autre(s) édition(s) au même titre, la plus pertinente a été retenue :_
    - [Rebel Princess (2024)](https://www.myludo.fr/#!/game/rebel-princess-83779) `rebel-princess-83779` _basegame, gb_
- [`tanbo`](https://en.boardgamearena.com/gamepanel?game=tanbo) Tanbo → [Tanbo (2025)](https://www.myludo.fr/#!/game/tanbo-83705) `tanbo-83705`
- [`thecrewjourneyendearth`](https://en.boardgamearena.com/gamepanel?game=thecrewjourneyendearth) The Crew: Journey to the Ends of the Earth → [The Crew - Journey to the Ends of the Earth (2026)](https://www.myludo.fr/#!/game/the-crew-journey-to-the-ends-of-the-earth-94499) `the-crew-journey-to-the-ends-of-the-earth-94499` ⚠️ _pas d’édition FR (gb), vérifier s’il en existe une au titre différent_
- [`trinkettrove`](https://en.boardgamearena.com/gamepanel?game=trinkettrove) Trinket Trove → [Trinket Trove (2025)](https://www.myludo.fr/#!/game/trinket-trove-88975) `trinket-trove-88975` ⚠️ _pas d’édition FR (gb), vérifier s’il en existe une au titre différent_

### ⚠️ À traiter manuellement (9)

- [`borealisarcticexpeditions`](https://en.boardgamearena.com/gamepanel?game=borealisarcticexpeditions) **Borealis: Arctic Expeditions** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Borealis%3A%20Arctic%20Expeditions/games/*/*/*/*/*/*/*/*/18/bymagic)
  - [Borealis (2025)](https://www.myludo.fr/#!/game/borealis-88538) `borealis-88538` _basegame, gb_
- [`eighteenroyalgorgerailsoffremont`](https://en.boardgamearena.com/gamepanel?game=eighteenroyalgorgerailsoffremont) **18RoyalGorge: The Rails of Fremont County and the Royal Gorge Wars** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/18RoyalGorge%3A%20The%20Rails%20of%20Fremont%20County%20and%20the%20Royal%20Gorge%20Wars/games/*/*/*/*/*/*/*/*/18/bymagic)
- [`elenco`](https://en.boardgamearena.com/gamepanel?game=elenco) **Elenco** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Elenco/games/*/*/*/*/*/*/*/*/18/bymagic)
- [`necklace`](https://en.boardgamearena.com/gamepanel?game=necklace) **Necklace** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Necklace/games/*/*/*/*/*/*/*/*/18/bymagic)
  - [Scene Of The Crime (2022)](https://www.myludo.fr/#!/game/scene-of-the-crime-99054) `scene-of-the-crime-99054` _basegame, ?_
  - [The Lost Necklace (2015)](https://www.myludo.fr/#!/game/the-lost-necklace-930) `the-lost-necklace-930` _basegame, ?_
  - [Queen 's Necklace (2015)](https://www.myludo.fr/#!/game/queen-s-necklace-19102) `queen-s-necklace-19102` _basegame, gb_
- [`snakesladders`](https://en.boardgamearena.com/gamepanel?game=snakesladders) **Snakes Ladders: Extreme Jungle Edition** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Snakes%20Ladders%3A%20Extreme%20Jungle%20Edition/games/*/*/*/*/*/*/*/*/18/bymagic)
- [`tapfour`](https://en.boardgamearena.com/gamepanel?game=tapfour) **Tap 4e** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Tap%204e/games/*/*/*/*/*/*/*/*/18/bymagic)
  - [Donning the Purple - Votes & Virtue expansion (2020)](https://www.myludo.fr/#!/game/donning-the-purple-votes-virtue-expansion-38833) `donning-the-purple-votes-virtue-expansion-38833` _extension, gb_
  - [Flesh and Blood TCG - Tapis de jeu - Pulsewave Harpoon (2022)](https://www.myludo.fr/#!/game/flesh-and-blood-tcg-tapis-de-jeu-pulsewave-harpoon-66717) `flesh-and-blood-tcg-tapis-de-jeu-pulsewave-harpoon-66717` _accessoire, ?_
- [`thestampgarden`](https://en.boardgamearena.com/gamepanel?game=thestampgarden) **The Stamp Garden** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/The%20Stamp%20Garden/games/*/*/*/*/*/*/*/*/18/bymagic)
- [`trickstergods`](https://en.boardgamearena.com/gamepanel?game=trickstergods) **Trickster Gods** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Trickster%20Gods/games/*/*/*/*/*/*/*/*/18/bymagic)
- [`zoolorettodice`](https://en.boardgamearena.com/gamepanel?game=zoolorettodice) **Zooloretto: The Dice Game** — aucune correspondance exacte · [Recherche MyLudo](https://www.myludo.fr/#!/search/Zooloretto%3A%20The%20Dice%20Game/games/*/*/*/*/*/*/*/*/18/bymagic)

### Source URLs
- [Beta games](https://fr.boardgamearena.com/gamelist?isBetaStatus=) - Games currently in beta testing
- [Released games](https://fr.boardgamearena.com/gamelist?allGames=) - Games officially released

---
*This is an automated pull request generated by the daily update workflow.*
