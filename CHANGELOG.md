# Journal des versions

## 1.0
Première version publiable.

**Émulation**
- Core DeSmuME mono-thread, WebGL2 forcé
- Résolution interne ×1 / ×2 / ×3, textures ×1 / ×2 / ×4
- Rendu OpenGL ou logiciel, effets 3D allégeables, timing rapide, frameskip
- Langue française, BIOS optionnels (HLE par défaut, import `.zip`)

**Sauvegardes**
- Save states par jeu, export / import, import multiple avec tri par taille
- Sauvegarde automatique (30 s + arrière-plan) et bouton Reprendre
- Persistance de la cartouche en IndexedDB, restauration avant le boot
- Import `.sav` avec conversion automatique (`.dsv`, no$gba, tailles non standard)

**Interface**
- Disposition des écrans selon l'orientation, boutons 1 / 2, centrage vertical
- Stylet, diagonales, ligne Select · 1 · 2 · Start
- Manette physique détectée, masquage automatique des contrôles tactiles
- Avance rapide ×2 / ×4, zone de masquage de l'interface
- Wake Lock, pause en arrière-plan, capture d'écran, jauge de stockage
- PWA (manifest + icône), hors ligne, tampon de build

**Correctifs notables**
- Plantage audio iOS (`Module.AL.currentCtx` non vérifié dans EmulatorJS)
- ROM non reconnue par DeSmuME (nom sans extension avec les URL blob)
- Sauvegardes jamais conservées (IDBFS non monté, format `.dsv` ignoré)
- Stylet décalé (transformation CSS invisible pour SDL)
- Service worker rejeté par Safari (réponse redirigée)
