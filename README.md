# About

![Status](https://img.shields.io/badge/Status-Active-informational)
![Research](https://img.shields.io/badge/Type-Ordinals-informational)
![Language](https://img.shields.io/badge/Language-JavaScript-purple)
[![Discord](https://img.shields.io/badge/Discord-Join-5865F2)](https://discord.gg/H3FnyZwA6P)

An open-source collection of scripts that expands ordinal notations written in JavaScript.

## What are ordinals?

Ordinal numbers describe **order** (position in a list), not **size** (how many).

For example, in the list *first, second, third, …*, the words **first**, **second**, **third**, etc. tell you *which position* an element is in. That is different from cardinal numbers (like 1, 2, 3), which usually mean *how many* elements you have.

Ordinals can also talk about positions that go on forever. After “1st, 2nd, 3rd, …” there is an infinite position often written as ω. Two important kinds are:

- **Successor ordinals**: the *next* ordinal after something (e.g. 0, 1, 2, …).
- **Limit ordinals**: ordinals reached *after infinitely many steps*, with no single immediately previous ordinal.

This repository works with **ordinal notations** (compact ways to encode large transfinite ordinals) and provides scripts to **expand** them using **fundamental sequences**.

## Documentation

- [Getting started](./Docs/getting-started.md)
- [Notation module API](./Docs/notation-module-api.md)
- [Terminology & internal representation](./Docs/internal-representation.md)
- [AZOCF status](./Docs/azocf.md)
- [Terminology](./Docs/terminology.md)
- [Notation stats](./Docs/notation-stats.md)

## Project rules

### Structure

- Notation internal structure must be an array containing only natural numbers — no negative numbers, nested arrays, strings or undefined holes
- Do **not** use iterative object methods (e.g. `Array.map`, `Array.find`, ...) inside explorer and expansion sections — but they are allowed in the parsing functions
- `expand(ord, num)` function must mutate `ord`
- Time complexity must be optimal — avoid `O(n^2)` if possible
- Unparsed notations should not contain spaces, newlines and other invisible characters
- Special case for `zero` is ignored (`isZero(ord)` is used to ignore `zero` expansion)
- Do **not** use recursion

### Formatting

Optional but heavily recommended to avoid bugs:

- Avoid lines with over 64 characters (this is not a hard cap but long lines make the code harder to read)
- Arrow functions must be used only for function arguments
- Avoid writing multiple `while` and `for` loops in a single function
- Merge functions that do the same thing if it shortens the script
- Write shorthands for frequently used variables (like `const part = ord.slice(root)`)
- Each instruction should end with a semicolon
- Nested if else statements should use braces
- Use `const` for constants

### Accepted notations

- Must not be unecessesary overcomplicated — avoid stuff like Bird's Array or Hyper-E
- Should append and pop at the right (except if both sides are affected)
- Ignore notations with similar and trivial expansion
- Avoid weak and trivial extentions

### Creating notations

Tips to create/discover relevant notations:

- Extend the limit of a notation (e.g. `sequence => hyperSequence`)
- Compress a notation length (e.g. `sequence => shortSequence`)
- Map down notation (e.g. `sequence => binaryShiftedSequence`)
- Simplify notation expansion (e.g. `sequence => pointerSequence`)
