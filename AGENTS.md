# AGENTS.md

Guidance for AI agents and automated tools working on this repository.

Project rules live in `README.md` (coding/formatting rules), `CONTRIBUTING.md` (workflow), and `Docs/` (API and representation details) — this file does not repeat them.

## What this project is

A static, dependency-free JavaScript codebase: ordinal notation modules plus a browser-based explorer that expands ordinals via fundamental sequences. There is no package.json, bundler, or test framework — plain ES modules are used directly.

## Repository layout

- `index.html`, `style.css`, `log.js`, `notations.js` — static site entry points; `notations.js` registers the available notation modules
- `utils.js` — shared helpers, including the `limit` sentinel
- `analysis.js` — shared `milestones` maps used by notation modules
- `Explorer/` — UI logic (`explorer.js` is the entry point). Modules are normalized through `Explorer/notationWrapper.js` (`fixModule`)
- `1_w/`, `2_e0/`, `3_p(Ww)/` — notation modules grouped by strength.
- `Bonus/` — standalone utilities, most notably `selfTest.js`
- `Docs/` — user/developer documentation
- `0_TODO/` — scratch/working notes

## How to run things

- Explorer: open `index.html` in a browser (ES module imports work from `file://` in most browsers; use a static server if they don't)
- Self-test (Node.js, run from `Bonus/`): `node selfTest.js`
  - It runs each module's expansion over a fixed ordinal range, reporting errors and modules whose export count differs from 7
  - `START` / `END` / `offset` at the top of the file control the tested range; `START = undefined` tests from zero
- `Bonus/runLNGI.js` and `autoLNGI.js` generate large expansion logs (LNGI = "limit n-growth inspection") for a single chosen module

## When touching a notation module

- Every module follows the same internal section order, marked by comments: `milestones` → Unparse → Explorer (`isZero`, `isSucc`, `rank`) → Expansion → Log. Keep new code in the matching section
- `expand(ord, num)` must mutate `ord` in place; the wrapper copies with `[...ord]` before calling, so modules never need to copy defensively
- The `limit` sentinel from `utils.js` is handled entirely by the wrapper — modules only use it as the top `milestones` entry and never test for it in `isZero`/`isSucc`/`rank`/`expand`
- Expansion code should end by replacing the notation with its expanded form and logging via `log.js` so the module's test log stays current
- After changing a module, run `node selfTest.js` from `Bonus/` and check the in-file test log covers the new behavior

## Gotchas

- `3_p(Ww)` contains a caret in a filename (`hyper^2Hydra.js`) — quote paths in shells and be careful with URL encoding
- Notation modules import from `analysis.js` and `log.js` at the repo root, so moving files requires updating those relative imports
- `analysis.js` maps milestone labels to ordinal representations; the wrapper looks values up with `keyByValue`, so milestone entries must be exact representations, not strings
- The explorer parses/unparses strings — unparsed forms must stay free of whitespace and invisible characters, or parsing will break
