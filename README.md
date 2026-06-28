# About

![Status](https://img.shields.io/badge/Status-Active-informational)
![Research](https://img.shields.io/badge/Type-Ordinals-informational)
![Language](https://img.shields.io/badge/Language-JavaScript-purple)
[![Discord](https://img.shields.io/badge/Discord-Join-5865F2)](https://discord.gg/H3FnyZwA6P)

An open-source collection of scripts that expands ordinal notations written in JavaScript.

## 🔢 What Are Ordinals

Ordinal numbers describe **order** (position in a list), not **size** (how many).

For example, in the list *first, second, third, …*, the words **first**, **second**, **third**, etc. tell you *which position* an element is in. That is different from cardinal numbers (like 1, 2, 3), which usually mean *how many* elements you have.

Ordinals can also talk about positions that go on forever. After “1st, 2nd, 3rd, …” there is an infinite position often written as ω. Two important kinds are:

- **Successor ordinals**: the *next* ordinal after something (e.g. 0, 1, 2, …).
- **Limit ordinals**: ordinals reached *after infinitely many steps*, with no single immediately previous ordinal.

This repository works with **ordinal notations** (compact ways to encode large transfinite ordinals) and provides scripts to **expand** them using **fundamental sequences**.

## 💡 How It Works

Each notation script is expected to contain these functions:

| Name | Description
| - | -
| `milestones` | A map object containing milestones/analysis
| `unparse(ord)` | Unparse `ord` into a readable string
| `isZero(ord)` | Check if `ord` equals zero
| `isSucc(ord)` | Check if `ord` is a successor
| `rank(a, b)` | Check if `a` is strictly above `b`
| `getLimit(num)` | Get the `num`-th term of the fundamental sequence of the notation limit
| `expand(ord, num)` | Get the `num`-th term of the fundamental sequence of `ord`

Also note:

- Each script imports helper functions from `utils.js`
- There is a test log for each script

## 📏 Project Rules

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

### Accepted Notations

- Must not be unecessesary overcomplicated — avoid stuff like Bird's Array or Hyper-E
- Should append and pop at the right (except if both sides are affected)
- Ignore notations with similar and trivial expansion
- Avoid weak and trivial extentions

### Creating Notations

Tips to find new relevant notations:

- Extend the limit of a notation (e.g. `sequence => hyperSequence`)
- Compress a notation length (e.g. `sequence => shortSequence`)
- Map down notation (e.g. `sequence => binaryShiftedSequence`)
- Simplify notation expansion (e.g. `sequence => pointerSequence`)

## 📖 Dictionary

Recurring variables and functions names used in notation scripts and when they are used:

### Notations

| Name | Definition
| - | -
| address | Each item encodes its parent position
| array | Array with fixed length
| binary | Use only two symbols
| double sided | Can expand in both sides
| extended | Extension of a notation
| hyper | Meta sequence property
| index | Use a pair to represent a number index
| number | Unbounded symbols count
| pair | Each item are paired — in sets of 2
| pointer | Each item encodes its distance with its parent
| sequence | Shifted worm — equivalent to nested worm or tree
| shifted | Shifted sequence
| short | Compressed to remove intermediate values
| trio | Each item are in sets of 3
| unary | Use only a single symbol
| worm | Array with variable length

### Variables

| Name | Definition
| - | -
| a, b | Used in binary operations
| func | Function
| head | Last item of a sequence
| tier | Level above type
| num | Integer
| offset | Value difference between two sequence items
| ord | Ordinal
| parent | Parent of a sequence head
| part | Slice from the root to the end of a sequence
| root | Root of a sequence
| top | Last item of a head
| type | Uncountable level

### Functions

| Name | Definition
| - | -
| `ascend` | Increase each values of a sequence
| `fill` | Fill an array with values
| `getEnd` | Get the end of a nested array
| `getParent` | Search the parent of a node
| `getSubParent` | Search the parent of a sub node
| `rank` | Rank the value of two ordinals
| `search` | Search the root of a sequence
| `trim` | Trim unused values in a sequence

## 📈 Notations Complexity

The complexity of a notation is the tokens count used in the expansion section (rounded by 5).

### General

| Ordinal | Notation | Complexity
| - | - | -
| ω | number | 30
| ω | unaryWorm | 55
| ω^2 | pairNumber | 60
| ω^ω | worm | 65
| ω^ω | indexArray | 100
| ω^ω | array | 115
| ω^ω | binaryArray | 155
| ω^ω^ω | doubleSidedWorm | 195
| ε0 | shortSequence | 125
| ε0 | pointerSequence | 140
| ε0 | sequence | 155
| ε0 | addressSequence | 160
| ε0 | hydra | 175
| ε0 | binaryShiftedSequence | 235
| ε0 | binaryTreeSequence | 280
| εω | wormSequence | 190
| εω | wormHydra | 195
| φ(ω,0) | pointerExtendedSequence | 145
| φ(ω,0) | extendedSequence | 175
| φ(ω,0) | treeSequence | 420
| Γ0 | shiftedSequence | 315
| Γ0 | shortShiftedSequence | 375
| ψ(Ωω) | sequenceHydra | 260
| ψ(Ωω) | addressPairSequence | 300
| ψ(Ωω) | hyperSequence | 300
| ψ(Ωω) | pointerPairSequence | 315
| ψ(Ωω) | pairSequence | 320
| ψ(Ωω) | hyperHydra | 370
| ψ(Λ) | extendedShiftedSequence | 490
| ψ(Mω) | shiftedSequenceHydra | 455
| ψ(T[ω]) | extendedSequenceHydra | 445
| ψ(T[1[0]<ω>0]) | pointerTrioSequence | 370
| ψ(T[1[0]<ω>0]) | addressTrioSequence | 390
| ψ(T[1[0]<ω>0]) | hyper^2Hydra | 515
| ψ(T[1[0]<ω>0]) | trioSequence | 535
| ψ(T[1[0]<ω>0]) | hyperSequenceHydra | 550
| ψ(B(ω)) | pointerMatrixSequence | 515
| ψ(B(ω)) | addressMatrixSequence | 540
| ψ(B(ω)) | matrixSequence | 825

### Milestones

Smallest notation for each milestone:

| Milestone | Notation | Complexity
| - | - | -
| ω | number | 30
| ω^ω | worm | 65
| ε0 | pointerSequence | 125
| φ(ω,0) | pointerExtendedSequence | 145
| ψ(Ωω) | sequenceHydra | 260
| ψ(T[1[0]<ω>0]) | pointerTrioSequence | 370
| ψ(B(ω)) | matrixSequence | 515

## ♾️ AZOCF

AZOCF is an ordinal collapsing function I made.  
It is currently ill-defined in set theory.

Properties:

- Collapse uncountables for large ordinals
- Avoid hidden upgrading
- Can use multiple notations at once
- Look for simple expansions
- Do not overoptimize time performances
- Any ordinal must have finitely many equivalent expressions

Current limit: `ζ0`
