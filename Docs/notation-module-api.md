# Notation module API

This document specifies the minimal interface a notation module must provide so the explorer can analyze, unparse, and expand ordinals.

The explorer wraps modules using `Ordinals/ordModule.js`, which normalizes some semantics around the module’s `limit` sentinel.

## Core exports

A notation module is expected to provide these exports:

- **`milestones`**: A map/object used for analysis/labeling.
- **`unparse(ord)`**: Stringify an ordinal notation.
- **`isZero(ord)`**: true iff the notation represents zero.
- **`isSucc(ord)`**: true iff the notation is a successor.
- **`rank(a, b)`**: Compare/order test used by the UI.
- **`getLimit(num)`**: Compute the `num`-th fundamental sequence term for limits.
- **`expand(ord, num)`**: Compute the `num`-th fundamental sequence term for an ordinal.

Also note:

- Notation modules import helper functions from `utils.js`.
- There is a test log in notation modules.

## Function semantics (important)

### `milestones`

`milestones` is used by the wrapper to map an ordinal representation to an analysis label.

### `unparse(ord)`

Returns a readable string for the notation.

The wrapper in `ordModule.js` also applies a special-case:

- If `ord` is the wrapper’s `limit` sentinel, the wrapper returns the string **`"Limit"`** rather than delegating to the module.

### `isZero(ord)` and `isSucc(ord)`

The wrapper also special-cases `limit`:

- If `ord` is the `limit` sentinel, both return `false`.

### `rank(a, b)`

The wrapper special-cases inputs:

- If `a` is `limit` or `b` is `undefined`, it returns `true`.
- Otherwise it delegates to `mod.rank(a, b)`.

### `getLimit(num)`

Used when the ordinal is the `limit` sentinel.

The wrapper calls this when `expand` is invoked on a `limit`.

### `expand(ord, num)`

The wrapper guarantees the `limit` case is handled by calling `getLimit(num)`.

For non-limit ordinals, the wrapper does:

- It clones the provided `ord` using `clone(ord)` and passes the clone to `mod.expand(clone(ord), num)`.

So, **your module’s** `expand` must:

- mutate the `ord` argument in place (the repo rule)
- not rely on returning a value
- not use recursion

## Practical checklist

- Module works on the repo’s internal representation (array of natural numbers)
- `expand(ord, num)` mutates `ord` in place
- No recursion in expansion logic
- Milestones/analysis map is consistent with `unparse` and expansion behavior
