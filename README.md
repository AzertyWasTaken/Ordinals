# About

A collection of ordinal notations expansion scripts.  
Each notation script contains these functions:

| Name | Description
| - | -
| milestones | A map containing milestones analysis
| parse(ord) | Parse *ord* into a string and possibly add syntaxic sugar
| isSucc(ord) | Return if *ord* is a successor
| rank(a, b) | Return if *a* is strictly above *b*
| getLimit(num) | Get the *num*-th term of the fundamental sequence of the notation limit
| expand(ord, num) | Get the *num*-th term of the fundamental sequence of *ord*

Each script also imports functions from `utils.js` and has a test log.  
The lenght of a script is the number of nonempty lines in the explorer and expansion sections.

# Rules

## Modules

### Coding

- Internal structure must be an array containing **only** natural numbers
- **No** iterative object methods inside explorer and expansion sections
- Expansion function must mutate *ord*
- Time complexity must be optimal
- Parsed notations must **not** contain spaces
- Ignore zero expansion

### Formatting

- Each line must have **at most** 64 characters
- Functions and statements followed by braces must **not** break line
- Arrow functions must be function arguments
- Each function must **not** nest while and for loops
- Merge similar functions
- Write shorthands for frequently used variables

## Accepted notations

- **Not** overcomplicated
- Must append and pop at the right
- Skip notations with similar expansion
- Avoid weak trivial extentions

## Creating notations

- Extend limit
- Compress length
- Map down
- Simplify expansion

# Dictionary

## Notations

| Name | Definition |
| - | - |
| array | Sequence with fixed length
| binary | Uses only two symbols
| index | Uses pair arrays to represent index
| nested | Sequence that can contain sequences
| number | Unbounded symbols count
| pair | Array with 2 entries
| unary | Uses only a single symbol
| worm | Sequence with variable length

## Variables

| Name | Definition
| - | -
| a, b | Used in binary operations
| head | Last item of a sequence
| num | Integer
| ord | Ordinal
| pos | Position of an item
| pow, tet | Power of an ordinal
| sep | Array separator
| root | Parent of the sequence *head*
| part | Slice from the root to the end of a sequence
| offset | Value difference between two sequence items

## Functions

| Name | Definition
| - | -
| `fill(ord, num, val)` | Push *val* to *ord* *num* times
| `search(ord)` | Search the position of an item of an array
| `grow(num, tet)` | Create a degenerate tree

# Notations complexity

## General

The complexity is the tokens count in the expansion and limit sections.

| Ordinal | Notation | Complexity
| - | - | -
| ω | number | 30
| ω | unaryWorm | 55
| ω^2 | pairNumber | 60
| ω^ω | worm | 65
| ω^ω | indexArray | 100
| ω^ω | array | 120
| ω^ω | binaryArray | 155
| ω^ω^ω | doubleSidedWorm | 195
| ε0 | pointerSequence | 135
| ε0 | shortSequence | 145
| ε0 | sequence | 155
| ε0 | addressSequence | 160
| ε0 | hydra | 190
| εω | wormSequence | 195
| εω | wormHydra | 210
| φ(ω,0) | extendedSequence | 205
| ψ(Ωω) | sequenceHydra | 245

## Milestones

| Milestone | Notation | Complexity
| - | - | -
| ω | number | 30
| ω^ω | worm | 65
| ε0 | pointerSequence | 135
| φ(ω,0) | extendedSequence | 205
| ψ(Ωω) | sequenceHydra | 245