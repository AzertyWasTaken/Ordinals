# Terminology

Recurring variables and functions names used in notation scripts and when they are used:

## Notations

- **address**: Each item encodes its parent position
- **array**: Array with fixed length
- **binary**: Use only two symbols
- **double sided**: Can expand in both sides
- **extended**: Extension of a notation
- **hyper**: Meta sequence property
- **index**: Use a pair to represent a number index
- **number**: Unbounded symbols count
- **pair**: Each item are in sets of 2 (paired)
- **pointer**: Each item encodes its distance with its parent
- **sequence**: Shifted worm — equivalent to nested worm or tree
- **shifted**: Shifted sequence
- **short**: Compressed to remove intermediate values
- **trio**: Each item are in sets of 3
- **unary**: Use only a single symbol
- **worm**: Array with variable length

## Variables

- **a, b**: Used in binary operations
- **func**: Function
- **head**: Last item of a sequence
- **tier**: Level above type
- **num**: Natural number
- **offset**: Value difference between two sequence items
- **ord**: Ordinal
- **parent**: Parent of a sequence head
- **part**: Slice from the root to the end of a sequence
- **root**: Root index of a sequence
- **top**: Last item of a head
- **type**: Uncountable level

## Functions

- **`ascend`**: Increase each values of a sequence
- **`fill`**: Fill an array with values
- **`getEnd`**: Get the end of a nested array
- **`getParent`**: Search the parent of a node
- **`getSubParent`**: Search the parent of a sub node
- **`rank`**: Rank the value of two ordinals
- **`search`**: Search the root of a sequence
- **`trim`**: Trim unused values in a sequence
