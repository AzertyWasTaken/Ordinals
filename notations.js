"use strict";
export const DEFAULT_CATEGORY = "1_w";
export const DEFAULT_NOTATION = "number";

export const NOTATIONS = {
    "1_w": {
        "number": {name: "Number"},
        "unaryWorm": {name: "Unary Worm"},

        "pairNumber": {name: "Pair Number"},

        "worm": {name: "Worm", fullName: "Ackermann Worm"},
        "array": {name: "Array"},
        "indexArray": {name: "Index Array"},
        "binaryArray": {name: "Binary Array"},

        "doubleSidedWorm": {name: "Double Sided Worm"},
    },

    "2_e0": {
        "sequence": {name: "Sequence", fullName: "Primitive Sequence System / PrSS"},
        "shortSequence": {name: "Short Sequence"},
        "pointerSequence": {name: "Pointer Sequence"},
        "addressSequence": {name: "Address Sequence"},
        "hydra": {name: "Hydra"},
        "binaryShiftedSequence": {name: "Binary Shifted Sequence"},
        "binaryTreeSequence": {name: "Binary Tree Sequence"},

        "wormSequence": {name: "Worm Sequence"},
        "wormHydra": {name: "Worm Hydra"},

        "extendedSequence": {name: "Extended Sequence"},
        "pointerExtendedSequence": {name: "Pointer Extended Sequence"},
        "treeSequence": {name: "Pointer Extended Sequence"},

        "shiftedSequence": {name: "Shifted Sequence"},
        "shortShiftedSequence": {name: "Short Shifted Sequence"},
    },

    "3_p(Ww)": {
        "hyperSequence": {name: "Hyper Sequence"},
        "pointerPairSequence": {name: "Pointer Pair Sequence"},
        "addressPairSequence": {name: "Address Pair Sequence"},
        "pairSequence": {name: "Pair Sequence", fullName: "PSS"},
        "sequenceHydra": {name: "Sequence Hydra", fullName: "PSS Hydra"},
        "hyperHydra": {name: "Hyper Hydra"},

        "extendedShiftedSequence": {name: "Extended Shifted Sequence"},

        "shiftedSequenceHydra": {name: "Shifted Sequence Hydra"},

        "extendedSequenceHydra": {name: "Extended Sequence Hydra"},

        "trioSequence": {name: "Trio Sequence", fullName: "TSS"},
        "pointerTrioSequence": {name: "Pointer Trio Sequence"},
        "addressTrioSequence": {name: "Address Trio Sequence"},
        "hyperSequenceHydra": {name: "Hyper Sequence Hydra"},
        "hyper^2Hydra": {name: "Hyper^2 Hydra", experimental: true},

        "matrixSequence": {name: "Matrix Sequence", fullName: "Bashicu Matrix System / BMS", experimental: true},
        "pointerMatrixSequence": {name: "Pointer Matrix Sequence", fullName: "PMS", experimental: true},
    }
};
