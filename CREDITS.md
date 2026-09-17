# Credits & licences

This project **only assembles** remarkable open-source building blocks. All emulation
credit belongs to their authors. Thank you.

## Engine & core

| Component | Role | License |
|---|---|---|
| **[EmulatorJS](https://github.com/EmulatorJS/EmulatorJS)** | in-browser emulation frontend (loader, input, UI, WASM glue) | GPL-3.0 |
| **[DeSmuME](https://github.com/libretro/desmume)** (libretro) | Nintendo DS core, with internal HD upscaling — upstream: [TASEmulators/desmume](https://github.com/TASEmulators/desmume) | GPL-2.0 |
| **[Emscripten](https://emscripten.org/)** | C/C++ → WebAssembly toolchain (used to build the core) | MIT / NCSA |

## Licence of this repository

**GPL-3.0** (see [`LICENSE`](LICENSE)). The bundle combines EmulatorJS (GPL-3.0) and the
DeSmuME core (GPL-2.0); the combined work is distributed under GPL-3.0. The original
application code we wrote (`lecteur-ds-hd.html` UI, `sw.js`) is **also offered by its author
under the MIT License** (see [`LICENSE.MIT`](LICENSE.MIT)) — see the section below.

## ⚠️ What is NOT provided (and never will be)

- **No ROMs / game images** — use backups of **your own** games only.
- **No BIOS** — the player runs in **HLE** by default; a real DS BIOS/firmware can be
  imported (`.zip`) but **nothing copyrighted is distributed here**.

"Nintendo DS" is a trademark of Nintendo. This project is neither affiliated with nor
endorsed by Nintendo.

## Our original code — also under MIT

The repository as a whole is distributed under **GPL-3.0**, because it bundles the emulator
components listed above (GPL, and — where noted — non-commercial cores). Separately, the
**original code we wrote for this project** (the page interface, service worker, build
scripts and docs) is **also offered by its author under the MIT License** — see
[`LICENSE.MIT`](LICENSE.MIT). You may take those original files and do whatever you want with
them under MIT. This does not relicense the third-party emulator components, nor any
single-file build in which they are embedded; those keep their own licenses and the combined
distribution stays GPL-3.0.
