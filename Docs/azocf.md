# AZOCF status

AZOCF, also known as Azerty's Ordinal Collapsing Function, is an ordinal collapsing function.

## Current status

- Not really an ordinal collapsing function, for now.
- Currently ill-defined in set theory.
- The implementation is best viewed as an evolving construction rather than a final, formally established object.

## What the code tries to do

From the repo’s AZOCF work and `Ordinals/AZOCF/properties.js`, AZOCF aims to:

- Collapse uncountable ordinals (for large ordinals).
- Avoid hidden upgrading.
- Prefer/seek simple expansions.
- Allow use of multiple notations in the same ordinal representation.
- Avoid unnecessary performance optimizations that could obscure correctness.
- Canonicalize if it can shorten the ordinal representation.
- Every ordinal must have finitely many equivalent expressions.

## Contribution notes (AZOCF-specific)

When changing AZOCF-related logic, contributions should:

- Preserve the repo rule that `expand(ord, num)` mutates the provided ordinal representation.
- Keep milestone/analysis consistent with `unparse` and expansion behavior.
- Prefer changes that make behavior more predictable and easier to verify from the logs.

## Current limit ordinals

| Name | Limit | Ordinal |
| - | - | - |
| Cantor Normal Form | **ω^ω^ω^...** | **ε0** |
| Epsilon Form | **ε_ε_ε_...** | **ζ0** |
| Zeta Form | **ζ_ζ_ζ_...** | **φ_3(0)** |
| Binary Phi | **φ_(φ_(φ_...(0))(0))(0)** | **Γ0** |
