"use strict";
export const CONTENT = {
    "1_w": {
        "number": "Decrease the sole entry by one.",
        "unaryWorm": "Remove the final symbol. The unary worm loses one symbol, so the remaining notation is one step shorter.",
        "pairNumber": "Read the notation as [left, right]. If right is positive, lower it by one; otherwise, decrease left by one and replace right with n.",
        "worm": "Remove the last term. If that term was positive, append n copies of the term with one subtracted from it.",
        "array": "Find the last nonzero term. If a term follows it, reset that following term to n + 1. Decrease the nonzero term by one. If the first term becomes zero, remove it.",
        "indexArray": "Remove the final pair [level, count]. If count is greater than one, append [level, count - 1]. If level is positive, also append [level - 1, n + 1].",
        "binaryArray": "Scan from the right for the first entry that is not 1. Remove that entry. If any entries remain to its right, insert n zeros immediately after its old position.",
        "doubleSidedWorm": "Drop a trailing 0. Otherwise, locate the active term; remove that term (or the 0 just before it when that preceding entry is 0); then insert n copies of one less than the active term, but not below 0, in its place.",
    },

    "2_e0": {
        "sequence": "Remove the final term a. If a is positive, find the nearest earlier position with a smaller value, take the suffix beginning there, and append n copies of that suffix.",
        "shortSequence": "Remove the final term a. If a is positive, find the nearest earlier smaller value, copy that suffix, lower its first value to a - 1, and repeat the modified suffix n times.",
        "pointerSequence": "Remove the final value p, which points back p + 1 positions from the end. Copy the segment starting there and append n copies, increasing the first value of that segment by p + 1 on each copy.",
        "addressSequence": "Remove the final value a, used as a 1-based address. Take the suffix starting at position a - 1 and append n copies of it, with every entry after the first increased by the length of that suffix.",
        "hydra": "Drop the last head. Find the matching parent segment. If one exists, append n copies of 0 followed by that segment. Then remove any trailing zeros.",
        "binaryShiftedSequence": "Remove the final head. If it is positive, put it back, cut the suffix from its parent boundary, locate the matching segment, and append n copies of that segment.",
        "binaryTreeSequence": "Remove the final head pair. If a parent remains, locate the matching segment and append n copies, with all values increased by 1 on each successive copy.",
        "wormSequence": "Remove the final term a. If a is positive, find the nearest earlier smaller root. If the gap a - root - 1 is positive, append n single terms increasing by that gap each copy; otherwise append n copies of the suffix from the root.",
        "wormHydra": "Remove the last head. If it is above 1, append n copies of one less. Otherwise, regrow the parent segment like a hydra: if a matching parent exists, append n copies of 0 followed by that segment. Finally trim trailing zeros.",
        "extendedSequence": "Remove the final term a. If a is positive, find the nearest earlier smaller root, take the suffix, and append n copies of it with every value increased by a - root - 1.",
        "pointerExtendedSequence": "Remove the final pair [p, label]. The first component p points back p pairs. Copy that segment and append n copies: if label is 0, increase the first value by p + 1 on each copy; otherwise reset the first pair to [p, label - 1] on each copy.",
        "treeSequence": "Remove the final head. If a parent remains, find the matching segment, insert n copies of it with every value raised by 1 at the correct position, then trim redundant markers.",
        "shiftedSequence": "Remove the final value a. If a is positive, split off the parent suffix, locate the matching segment, prepend the split-off suffix to it, and append n copies of the combined segment.",
        "shortShiftedSequence": "Remove the final value a. If a is positive, split off its parent head. If the gap between a and that head is at least 2, lower the head's first value to a - 1 and repeat it n times; otherwise locate the matching suffix and repeat the head followed by that suffix (with its first value lowered when the gap exceeds 1) n times.",
    },

    "3_p(Ww)": {
        "hyperSequence": "Remove the final value a. If a is positive, find its parent (nearest earlier smaller value) and the type a - parent. If the type exceeds 1, climb further parents until the difference drops below the type. Take the suffix from the chosen root and append n copies with every value increased by a - root - 1.",
        "pointerPairSequence": "Remove the final pair [p, q], whose components are backward pointers to parent and root segments. Copy the segment from the root (or the parent if the root pointer is invalid), compute an ascent map over it, and if the root pointer is valid reset the first value to p. Append n copies with values raised according to that map.",
        "addressPairSequence": "Remove the final pair [a, b], whose components are 1-based addresses. Take the segment from address b (or from address a if b is invalid), reset its first value to a when b is valid, and append n copies, raising positions according to the sequence length and the second component when it exceeds the first pair's second value.",
        "pairSequence": "Remove the final pair [h, t]. If h is positive, use t to climb parent pairs until the second component is below t (or, if t is 0, just the nearest pair with first component below h). Take the suffix from the chosen root and append n copies, with first components increased by h - root's first component when t is positive, else unchanged.",
        "sequenceHydra": "Remove the last head. Find its parent segment. If the head exceeds 1, climb to the matching ancestor; if it is 1, use the parent and prepend 0. Append n copies of that segment, then trim trailing zeros.",
        "hyperHydra": "Remove the last head. Find the parent segment. Try to find a deeper root: if found, append n copies of 1 followed by that segment; otherwise trim 1 markers and append n copies of 0 followed by the parent segment. Finally trim markers that are not 2.",
        "extendedShiftedSequence": "Remove the final value a. If a is positive, split off the parent suffix and locate the shifted parent. If the entry before that parent is less than a - 1, regrow an ascended suffix (climb to the type-matching root and raise values by a - root - 1); otherwise repeat the combined head-and-parent segment. Append n copies.",
        "shiftedSequenceHydra": "Remove the last head. If it is above 1, split off its shifted parent suffix, locate the matching segment, prepend that suffix, and append n copies. If it is 1, prepend 0 to the parent segment and append n copies. Trim trailing zeros.",
        "extendedSequenceHydra": "Remove the last head. If it is 1, prepend 0 to its parent segment and append n copies. Otherwise find the matching ancestor, take the suffix, compute an ascent map, and append n copies with values raised according to that map. Trim trailing zeros.",
        "trioSequence": "Remove the final triple [h, t, s]. If h is positive, climb parents according to s and t to select a segment, take its suffix, and append n copies with the head and type components raised by the corresponding offsets when t or s is positive, via an ascent map. If h is 0, just remove the triple.",
        "pointerTrioSequence": "Remove the final triple of backward pointers [p, q, r]. Use r, then q, then p to choose the parent segment. Compute an ascent map. If q is valid, reset the first value to p; if r is valid, reset the second value to q. Append n copies with values raised per the ascent map.",
        "addressTrioSequence": "Remove the final triple of addresses [a, b, c]. Take the segment from address c (or b, or a). Append n copies, raising each later triple's first component by the row count, and its second and third components when they exceed the first pair's components; on the first copy reset the first or second components to a or b when b or c are valid.",
        "hyperSequenceHydra": "Remove the last head. If it is 1, prepend 0 to the parent segment and append n copies. Otherwise find the sub-parent and type; if the type exceeds 1, climb further before taking the suffix. Compute an ascent map and append n copies with values raised according to it. Trim trailing zeros.",
        "hyper^2Hydra": "Remove the last head (level 3). Find the parent. If a type-level root exists, try to find a subtype-level segment: if found, append n copies of 2 followed by it; otherwise trim 2 markers and append n copies of 1 followed by the type segment. If no type root exists, trim 1 markers and append n copies of 0 followed by the parent. Trim markers that are not 3.",
    },

    "4_p(Bw)": {
        "matrixSequence": "Remove the final column (head). If it has more than one entry, find its parent column, take the suffix from there, compute an offset from the head and parent, build an ascent map over that suffix, and append n copies of the suffix with each column ascended by that map.",
        "pointerMatrixSequence": "Remove the final column (head), whose penultimate entry is a pointer top. If head has more than one entry, use that pointer to select a root column, take the suffix from there, build an ascent map, adjust the first column's values and ascents using the head, and append n copies with all columns ascended by that map.",
        "addressMatrixSequence": "Remove the final column (head), whose penultimate entry top is a 1-based column address. If head has more than one entry, take the suffix from the column at that address and append n copies, raising entries in later columns by the number of columns and resetting the head column's first entries to the head's values on the first copy.",
    }
};