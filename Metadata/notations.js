"use strict";
export const DEFAULT_CATEGORY = "1_w";
export const DEFAULT_NOTATION = "number";

export const NOTATIONS = {
    // {name, fullName, experimental}
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
        "addressSequence": {name: "Address Sequence"},
        "pointerSequence": {name: "Pointer Sequence"},
        "binaryShiftedSequence": {name: "Binary Shifted Sequence"},
        "hydra": {name: "Hydra"},
        "binaryTreeSequence": {name: "Binary Tree Sequence"},

        "wormSequence": {name: "Worm Sequence"},
        "wormHydra": {name: "Worm Hydra"},

        "extendedSequence": {name: "Extended Sequence"},
        "pointerExtendedSequence": {name: "Pointer Extended Sequence"},
        "treeSequence": {name: "Tree Sequence"},

        "shiftedSequence": {name: "Shifted Sequence"},
        "shortShiftedSequence": {name: "Short Shifted Sequence"},
    },

    "3_p(Ww)": {
        "pairSequence": {name: "Pair Sequence", fullName: "PSS"},
        "addressPairSequence": {name: "Address Pair Sequence"},
        "pointerPairSequence": {name: "Pointer Pair Sequence"},
        "hyperSequence": {name: "Hyper Sequence"},
        "sequenceHydra": {name: "Sequence Hydra", fullName: "PSS Hydra"},
        "hyperHydra": {name: "Hyper Hydra"},

        "extendedShiftedSequence": {name: "Extended Shifted Sequence"},

        "shiftedSequenceHydra": {name: "Shifted Sequence Hydra"},

        "extendedSequenceHydra": {name: "Extended Sequence Hydra"},

        "trioSequence": {name: "Trio Sequence", fullName: "TSS"},
        "addressTrioSequence": {name: "Address Trio Sequence"},
        "pointerTrioSequence": {name: "Pointer Trio Sequence"},
        "hyperSequenceHydra": {name: "Hyper Sequence Hydra"},
        "hyper^2Hydra": {name: "Hyper^2 Hydra"},
    },

    "4_p(Bw)": {
        "matrixSequence": {name: "Matrix Sequence", fullName: "Bashicu Matrix System / BMS"},
        "addressMatrixSequence": {name: "Address Matrix Sequence"},
        "pointerMatrixSequence": {name: "Pointer Matrix Sequence", fullName: "PMS"},
    }
};
