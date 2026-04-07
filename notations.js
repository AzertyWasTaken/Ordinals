"use strict";
export const DEFAULT_CATEGORY = "_w";
export const DEFAULT_NOTATION = "number";

export const NOTATIONS = {
    "_w": {
        "number": {name: "Number"},
        "unaryWorm": {name: "Unary Worm"},

        "pairNumber": {name: "Pair Number"},

        "worm": {name: "Worm"},
        "indexArray": {name: "Index Array"},
        "array": {name: "Array"},
        "binaryArray": {name: "Binary Array"},

        "doubleSidedWorm": {name: "Double Sided Worm"},
    },

    "_e0": {
        "pointerSequence": {name: "Pointer Sequence"},
        "shortSequence": {name: "Short Sequence"},
        "sequence": {name: "Sequence"},
        "addressSequence": {name: "Address Sequence"},
        "hydra": {name: "Hydra"},

        "wormSequence": {name: "Worm Sequence"},
        "wormHydra": {name: "Worm Hydra"},

        "extendedSequence": {name: "Extended Sequence"},
    },

    "_p(Ww)": {
        "sequenceHydra": {name: "Sequence Hydra"},
    }
};