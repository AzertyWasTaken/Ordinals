# About

A collection of ordinal notations expansion scripts.  
Each notation script contains these functions:

| Name | Description
| - | -
| milestones | A map containing milestones analysis
| unparse(ord) | Unparse *ord* into a string and possibly add syntaxic sugar
| isSucc(ord) | Return if *ord* is a successor
| rank(a, b) | Return if *a* is strictly above *b*
| getLimit(num) | Get the *num*-th term of the fundamental sequence of the notation limit
| expand(ord, num) | Get the *num*-th term of the fundamental sequence of *ord*

Each script also imports functions from `utils.js` and has a test log.  
The lenght of a script is the number of nonempty lines in the explorer and expansion sections.

## Rules

### Coding

- Internal structure must be an array containing **only** natural numbers
- Do **not** use iterative object methods inside explorer and expansion sections
- Expansion function must mutate *ord*
- Time complexity must be optimal
- Unparsed notations must **not** contain spaces
- Ignore zero expansion
- Do **not** use recursion
- Split long functions

### Formatting

- Each line must have **at most** 64 characters
- Functions and statements followed by braces must **not** break line
- Arrow functions must be function arguments
- Each function must **not** nest while and for loops
- Merge similar functions
- Write shorthands for frequently used variables
- Avoid more than 64 characters per line
- Each instruction must end with a semicolon

### Accepted notations

- Must **not** be overcomplicated
- Must append and pop at the right
- Skip notations with similar expansion
- Avoid weak and trivial extentions

### Creating notations

- Extend notation limit
- Compress notation length
- Map down notation
- Simplify notation expansion

## Dictionary

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

## Notations complexity

### General

The complexity is the tokens count in the expansion section.

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
| ψ(Ωω) | addressPairSequence | 260
| ψ(Ωω) | pointerPairSequence | 280
| ψ(Ωω) | hyperSequence | 300
| ψ(Ωω) | pairSequence | 320
| ψ(Ωω) | hyperHydra | 370
| ψ(Λ) | extendedShiftedSequence | 490
| ψ(Mω) | shiftedSequenceHydra | 455
| ψ(T[ω]) | extendedSequenceHydra | 445
| ψ(T[1[0]<ω>0]) | trioSequence | 535
| ψ(T[1[0]<ω>0]) | hyperSequenceHydra | 550
| ψ(B(ω)) | matrixSequence | 820

### Milestones

| Milestone | Notation | Complexity
| - | - | -
| ω | number | 30
| ω^ω | worm | 65
| ε0 | pointerSequence | 125
| φ(ω,0) | pointerExtendedSequence | 145
| ψ(Ωω) | sequenceHydra | 260
| ψ(T[ω]) | extendedSequenceHydra | 445
| ψ(T[1[0]<ω>0]) | hyperSequenceHydra | 535
| ψ(B(ω)) | matrixSequence | 820
