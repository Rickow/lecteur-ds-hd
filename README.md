*(English version — [Version française](README.fr.md))*

# Lecteur DS HD

A **Nintendo DS** emulator in a self-contained web page, built for the iPhone.
A single HTML file: engine, core and interface are all embedded. Nothing is uploaded anywhere.

**Highlight**: **high-resolution** rendering (up to ×3), out of reach for most web-based DS
emulators, thanks to the DeSmuME core and its internal upscaling.

---

## Features

**Emulation**
- **DeSmuME** core (libretro), single-threaded — works without COOP/COEP headers
- **Internal resolution**: native · ×2 (512×384) · ×3 (768×576)
- **Textures**: native · ×2 · ×4 (xBRZ filter)
- **Rendering**: OpenGL (WebGL2) or software
- **3D effects**: full or lightweight (anti-aliasing, edge marking, deposterization)
- **Timing**: accurate or fast (bus-level timing)
- **Frameskip**: 0 to 3
- Console language: **French**
- **Optional** BIOS (HLE by default, `.zip` import possible)

**Display**
- Auto layout by orientation: side-by-side in landscape, stacked in portrait
- **1 / 2** buttons: enable or disable each screen, single screen centered
- **Stylus**: touching the bottom screen is passed through to the core

**Controls**
- Virtual gamepad: D-pad with **diagonals**, buttons, L/R, Select · 1 · 2 · Start row
- **Physical controller** (Gamepad API): auto-detected, hides the touch controls
- **Fast-forward** ×2 / ×4
- **Invisible zone** in the center: hides the whole UI, a tap brings it back

**Saves**
- **Save states** named after the game (IndexedDB), export / import
- **Batch import** of states with automatic sorting (states from other cores are ignored)
- **Auto-save** every 30 s and when the app goes to the background
- **Resume** button in the history
- **Cartridge save (.sav/.dsv)**: persisted in IndexedDB, restored on launch
- `.sav` import with **automatic conversion** (DeSmuME `.dsv`, no$gba, non-standard sizes)

**Comfort**
- ROM history (12 entries)
- **Wake Lock**: the screen no longer turns off while playing
- Automatic pause in the background
- Pause / Restart / Screenshot
- Storage gauge
- Offline via service worker, installable as a PWA

---

## Usage

1. Deploy the files on a static host (Cloudflare Pages/Workers, Netlify…)
2. Open the page, **load a `.nds` ROM**
3. Tap **Play** (iOS requires a user gesture to start audio)

> The player also works by simply opening the HTML file locally;
> offline mode and PWA installation require hosting.

### Recommended settings

| Goal | Settings |
|---|---|
| Maximum smoothness | HD native · Textures native · Lightweight effects · Fast timing |
| Best rendering | HD ×2 · Textures ×2 · OpenGL · Full effects |
| Balanced | HD ×2 · Lightweight effects · Frameskip 1 |

**Warning**: ×2 mode quadruples the number of 3D pixels computed and makes the device heat up.
This is inherent to upscaling; no setting avoids it entirely.

---

## Files

| File | Role |
|---|---|
| `lecteur-ds-hd.html` | the full application (engine + core + interface) |
| `index.html` | copy of the above, to serve at the root |
| `sw.js` | service worker (offline cache) |
| `manifest.json` | PWA metadata |
| `apple-touch-icon.png` | iOS icon (**mandatory file**: iOS ignores data-URIs) |
| `icon-512.png` | high-resolution PWA icon |

---

## License

GPL-3.0 — see `LICENSE`. The project embeds EmulatorJS and the DeSmuME core, under GPL.
No ROM or BIOS is distributed.
