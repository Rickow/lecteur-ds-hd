*(Version française — [English version](README.md))*

# Lecteur DS HD

Émulateur **Nintendo DS** dans une page web autonome, pensé pour l'iPhone.
Un seul fichier HTML : moteur, core et interface sont embarqués. Rien n'est envoyé nulle part.

**Particularité** : rendu **haute résolution** (jusqu'à ×3), impossible avec la plupart des
émulateurs DS web, grâce au core DeSmuME et à son upscaling interne.

---

## Fonctionnalités

**Émulation**
- Core **DeSmuME** (libretro), mono-thread — fonctionne sans en-têtes COOP/COEP
- **Résolution interne** : natif · ×2 (512×384) · ×3 (768×576)
- **Textures** : natif · ×2 · ×4 (filtre xBRZ)
- **Rendu** : OpenGL (WebGL2) ou logiciel
- **Effets 3D** : complets ou allégés (anticrénelage, contours, déposterisation)
- **Timing** : précis ou rapide (temporisation bus-level)
- **Frameskip** : 0 à 3
- Langue de la console : **français**
- BIOS **optionnels** (HLE par défaut, import d'un `.zip` possible)

**Affichage**
- Bascule automatique selon l'orientation : côte à côte en paysage, empilé en portrait
- Boutons **1 / 2** : activer ou désactiver chaque écran, écran unique centré
- **Stylet** : le toucher de l'écran du bas est transmis au core

**Contrôles**
- Manette virtuelle : croix avec **diagonales**, boutons, L/R, ligne Select · 1 · 2 · Start
- **Manette physique** (Gamepad API) : détectée automatiquement, masque les contrôles tactiles
- **Avance rapide** ×2 / ×4
- **Zone invisible** au centre : masque toute l'interface, un toucher la rappelle

**Sauvegardes**
- **Save states** nommés d'après le jeu (IndexedDB), export / import
- **Import multiple** d'états avec tri automatique (les états d'autres cores sont ignorés)
- **Sauvegarde automatique** toutes les 30 s et au passage en arrière-plan
- Bouton **Reprendre** sur l'historique
- **Sauvegarde cartouche (.sav/.dsv)** : persistée dans IndexedDB, restaurée au lancement
- Import de `.sav` avec **conversion automatique** (formats DeSmuME `.dsv`, no$gba, tailles non standard)

**Confort**
- Historique des ROMs (12 entrées)
- **Wake Lock** : l'écran ne s'éteint plus en jeu
- Pause automatique en arrière-plan
- Pause / Redémarrer / Capture d'écran
- Jauge de stockage
- Hors ligne via service worker, installable en PWA

---

## Utilisation

1. Déployer les fichiers sur un hébergeur statique (Cloudflare Pages/Workers, Netlify…)
2. Ouvrir la page, **charger une ROM `.nds`**
3. Taper **Play** (iOS exige un geste utilisateur pour démarrer l'audio)

> Le lecteur fonctionne aussi en ouvrant simplement le fichier HTML en local ;
> le mode hors ligne et l'installation PWA nécessitent un hébergement.

### Réglages conseillés

| Objectif | Réglages |
|---|---|
| Fluidité maximale | HD natif · Textures natif · Effets allégés · Timing rapide |
| Meilleur rendu | HD ×2 · Textures ×2 · OpenGL · Effets complets |
| Compromis | HD ×2 · Effets allégés · Frameskip 1 |

**Attention** : le mode ×2 quadruple le nombre de pixels 3D calculés et fait chauffer
l'appareil. C'est inhérent à l'upscaling, aucun réglage ne l'évite complètement.

---

## Fichiers

| Fichier | Rôle |
|---|---|
| `lecteur-ds-hd.html` | l'application complète (moteur + core + interface) |
| `index.html` | copie du précédent, pour servir à la racine |
| `sw.js` | service worker (cache hors ligne) |
| `manifest.json` | métadonnées PWA |
| `apple-touch-icon.png` | icône iOS (**fichier obligatoire** : iOS ignore les data-URI) |
| `icon-512.png` | icône PWA haute résolution |

---

## Licence & crédits

**GPL-3.0** (voir [`LICENSE`](LICENSE)). Liste des composants, liens GitHub et licences
dans [**CREDITS.md**](CREDITS.md). Le projet embarque EmulatorJS (GPL-3.0) et le core
DeSmuME (GPL-2.0). Aucune ROM ni BIOS n'est distribué.
