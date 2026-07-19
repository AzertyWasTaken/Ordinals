# Getting started (Notation Explorer)

This repository contains an in-browser explorer that lets you pick an ordinal notation module and expand ordinals using that module’s fundamental sequences.

## 1. Open the explorer

The explorer is a static web page.

- Open `Ordinals/index.html` in a browser.
- If you host the repo locally (recommended), use any simple static server so module imports work.

> Example local workflow: open `index.html` directly in your browser, or serve the `Ordinals/` folder with a static server.

## 2. Select a notation

1. Use the **Category** buttons (≥ ω, ≥ ε0, ≥ ψ(Ωω)).
2. Use the filters/search UI to pick a notation.
3. When a notation is selected, the UI loads its module and displays a notation name.

## 3. Expand an ordinal

1. Click a blue ordinal button to select a starting notation.
2. Click a dark expansion button to expand the notation.
3. The UI may show an **analysis** next to the expansion button.

### What "Limit" means in the UI

Some modules use a special `limit` sentinel to represent the limit case.

- In the UI, "Limit" is displayed for expressions that the wrapper considers a limit.
- Expanding a limit uses the module’s `getLimit(num)` / fundamental sequence term.
