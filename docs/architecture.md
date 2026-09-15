# Architecture & notes techniques

## Pile logicielle

| Couche | Techno | Modifiable |
|---|---|---|
| Interface | JavaScript (dans le HTML) | librement |
| Moteur | EmulatorJS 4.2.3 (sources concaténées, inlinées) | patché avant inlining |
| Runtime | RetroArch + Emscripten (dans le `.wasm`) | recompilation uniquement |
| Core | DeSmuME (libretro), C → WASM | recompilation uniquement |
| Navigateur | WebKit / Safari | infranchissable |

Tout est inliné en base64 dans le HTML : core (`.data`, archive 7z), moteur, décompresseurs.
Le core mono-thread évite `SharedArrayBuffer`, donc **aucun en-tête COOP/COEP n'est requis**.

## Pièges iOS résolus (réutilisables ailleurs)

**Nom de fichier de la ROM.** Avec une URL `blob:`, EmulatorJS nomme la ROM `game`, **sans
extension** — DeSmuME refuse alors de la reconnaître et RetroArch affiche son menu au lieu
du jeu. On force `config.gameName = 'game' + extension` : nom court (les noms longs avec
parenthèses polluent le chemin de sauvegarde) mais avec extension.

**Format de sauvegarde.** DeSmuME n'utilise pas un `.sav` brut mais **`.dsv`** : données +
pied de page de 122 octets. Et il ne lit ce fichier **qu'au démarrage du jeu**. D'où la
stratégie : reconstruire un `.dsv` valide en réutilisant le pied de page écrit par le core,
le stocker, puis le déposer **avant le lancement suivant** (fenêtre entre l'initialisation
du core et l'appui sur Play).

**Persistance.** `disableDatabases: true` (nécessaire sur iOS) empêche EmulatorJS de monter
IDBFS : `/data/saves` n'existe **qu'en RAM**. La persistance est donc gérée à la main
(copie dans IndexedDB, restauration au lancement).

**localStorage qui lève une exception.** Sur les domaines partagés (`*.pages.dev`), le
simple *accès* à `window.localStorage` peut lever une exception. Toujours tester
`config.disableLocalStorage` **avant** de toucher à l'objet. Ici, la disponibilité est
sondée au lancement (écriture/lecture d'un témoin) pour activer la persistance des cheats
et du remappage quand c'est possible.

**Audio.** iOS exige un geste utilisateur. `startOnLoad = false` : le jeu démarre au tap
sur Play. Un `NotAllowedError` résiduel est filtré (non bloquant). Bug connu d'EmulatorJS
corrigé ici : `checkStarted()` accédait à `Module.AL.currentCtx.sources` sans vérifier
`currentCtx`, qui est `null` sur iOS → plantage au démarrage.

**Toucher et transformations CSS.** Le centrage vertical de l'écran unique utilisait
`transform: translateY()` : SDL calcule la position du toucher via `offsetTop`, qui
**ignore les transformations** → stylet décalé et bas inaccessible. Remplacé par
`margin-top`, qui agit sur la mise en page.

**WebGL2.** Si le rapport JSON du core ne se charge pas, `webgl2Enabled` retombe sur
`false` (et sur le core *legacy*). Forcé à `true`.

**Service worker.** Ne jamais servir une réponse **redirigée** pour une navigation :
Safari la rejette (« Response served by service worker has redirections »). Les réponses
sont reconstruites avant mise en cache. Un tampon de build est affiché dans la page pour
repérer les versions périmées.

**Icône PWA.** iOS ignore `apple-touch-icon` en data-URI **et** en SVG : un vrai fichier
PNG servi à côté est obligatoire.

**Perte de contexte WebGL.** iOS libère le GPU en arrière-plan. `webglcontextlost` est
intercepté : sauvegarde immédiate et message à l'utilisateur.

## Limites connues

- **Chauffe en ×2** : quadrupler les pixels 3D est intrinsèquement coûteux.
- **Textures ×2 inutile en résolution native** : le détail est rééchantillonné puis perdu.
- **Save states incompatibles** avec melonDS (structures internes différentes).
  La passerelle entre émulateurs est la **sauvegarde cartouche**, pas l'état machine.
- **Résolutions entières uniquement** (×1, ×2, ×3…) : pas de ×1,5.
