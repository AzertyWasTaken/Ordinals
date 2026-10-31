"use strict";
export const CONTENT = {
    "1_w": {
        "number": "Decrease the right-hand value by one; if it is already zero, decrease the left-hand value and reset the right-hand value to n.",
        "unaryWorm": "Drop the final symbol. The unary worm loses one symbol, so the remaining notation is one step shorter.",
        "pairNumber": "Read the notation as [left, right]. If right is positive, lower it by one; otherwise, decrease left by one and replace right with n.",
        "worm": "Remove the last term. If that term was positive, append n copies of the term with one subtracted from it.",
        "array": "Decrease the last nonzero term by one. If a later term exists, reset that following term to n + 1.",
        "indexArray": "Treat the final pair as [level, count]. If count is greater than one, decrease it; if level is positive, also append [level - 1, n + 1].",
        "binaryArray": "If the array ends in 0, remove that final zero. Otherwise, delete the active 1 and insert n zeros immediately after its old position.",
        "doubleSidedWorm": "Drop a trailing 0. Otherwise, remove the active term and replace it with n copies of the next smaller term.",
    },

    "2_e0": {
        "sequence": "Remove the final term a. If a is positive, find the nearest earlier position with a smaller value and append n copies of the suffix beginning there.",
        "shortSequence": "Like sequence, but before repeating the copied suffix, lower its first value by a - 1 and then repeat it n times.",
        "pointerSequence": "The final value points back to an earlier parent; repeat that parent segment n times, increasing its first value by the pointer distance plus one each pass.",
        "addressSequence": "Use the final value as an address into the earlier sequence, locate that segment, ascend it, and append n copies.",
        "hydra": "Drop the last head and regrow the segment rooted at the matching parent n times, using zero markers and then trimming trailing zero markers.",
        "binaryShiftedSequence": "Move the last head to its parent boundary in this binary-coded sequence, then repeat the matching suffix n times.",
        "binaryTreeSequence": "Remove the final head pair. If a parent remains, locate the matching segment and append n copies obtained by ascending it at each step.",
        "wormSequence": "Drop the final term and identify its earlier matching root. Repeat that suffix n times, raising the root by the required amount on each copy.",
        "wormHydra": "Remove the last head. If the head is above 1, append n copies of one less; otherwise, regrow the parent segment like a hydra and trim trailing zeros.",
        "extendedSequence": "Remove the final term, locate its root, and append n copies of that suffix, with each copy ascended by the offset from the root.",
        "pointerExtendedSequence": "The final pair stores a backward pointer and a label; use them to choose a segment and append n copies while updating the pointer or label as needed.",
        "treeSequence": "Remove the final head, locate its parent segment, and append n copies with that segment ascended each time before trimming unused markers.",
        "shiftedSequence": "Use the final value to find a parent and its shifted suffix, then repeat the combined segment n times.",
        "shortShiftedSequence": "A compressed shifted sequence: the final value selects a parent. Depending on the gap, repeat either a shortened head block or the located suffix.",
    },

    "3_p(Ww)": {
        "hyperSequence": "The final value together with its parent determines which earlier suffix is expanded. Append n copies, each copy with that suffix ascended by the computed offset.",
        "pointerPairSequence": "Each control item is a pair of backward pointers. Use that pair to choose the parent segment, then append n copies after ascending the selected values.",
        "addressPairSequence": "Each control item is a pair of addresses into the sequence. Use them to select the parent segment and append n copies with that segment ascended.",
        "pairSequence": "The final pair stores a head and a type. Those values determine the segment to expand and the ascent amount used in each of n copies.",
        "sequenceHydra": "A hydra-style pair sequence: remove the last head, regrow the selected parent segment n times, and strip trailing zero markers.",
        "hyperHydra": "Remove the last head, find its parent and matching root, and then regrow the chosen segment n times while trimming unused markers.",
        "extendedShiftedSequence": "A shifted sequence with an extended ascent rule. The final value picks a parent; depending on the type, repeat either an ascended suffix or a combined head-and-parent segment.",
        "shiftedSequenceHydra": "A hydra-style shifted sequence: remove the last head, regrow the appropriate shifted parent segment n times, and drop trailing zero markers.",
        "extendedSequenceHydra": "A hydra-style extended sequence. A head of 1 regrows its parent segment; larger heads regrow an ascended suffix, and trailing zero markers are removed.",
        "trioSequence": "The final triple stores a head, a type, and a subtype. Those values determine the segment and the ascent rule used in each of n copies.",
        "pointerTrioSequence": "Each control item is a trio of backward pointers. Use them to select the parent segment and append n copies with the referenced values ascended.",
        "addressTrioSequence": "Each control item is a trio of addresses. Use them to locate the parent segment and append n copies, ascending each copy according to the address values.",
        "hyperSequenceHydra": "A hydra-style hyper sequence: the final head and its hierarchical parent select the segment to regrow, repeated n times with the chosen values ascended and trailing zeros trimmed.",
        "hyper^2Hydra": "Follow the last head through its parent and type levels to choose a segment, then regrow that segment n times and trim unused markers.",
    },

    "4_p(Bw)": {
        "matrixSequence": "The Bashicu Matrix System stores the sequence in columns. The final column selects a root segment, which is ascended and repeated n times.",
        "pointerMatrixSequence": "A matrix sequence whose column pointers select the parent and root columns. Use them to ascend the chosen segment and append n copies.",
        "addressMatrixSequence": "A matrix sequence whose column addresses select the parent and root columns. Ascend the selected segment according to the final column and append n copies.",
    }
};
