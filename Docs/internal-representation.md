# Terminology & internal representation

In this repo, an ordinal notation is represented internally as an **array of natural numbers**.

Notation scripts are responsible for:

- Producing this array representation
- Mutating it during `expand`
- Converting it to a string via `unparse`

## Array representation

- The representation is a plain JS array.
- Elements are natural numbers (non-negative integers).
- No negative numbers, strings, undefined holes, or nested arrays in the representation.

## Milestones and the analysis map

The UI may display an **analysis** next to an ordinal expansion.

- Modules export a `milestones` map/object.
- The wrapper uses `keyByValue(mod.milestones, ord)` to locate an analysis label for a particular internal representation.

So the milestones map keys/values (and any normalization) must align with:

- Your internal array representation
- What `unparse(ord)` prints
