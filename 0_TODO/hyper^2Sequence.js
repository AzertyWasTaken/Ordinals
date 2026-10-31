"use strict";
import {LIMIT} from "../utils.js";
import {sequence, testExpand} from "../Metadata/analysis.js";

export const milestones = new Map([
    ...sequence,
    ["ε0", [0,1,3]],
    ["ε1", [0,1,3,3]],
    ["εω", [0,1,3,4]],
    ["ζ0", [0,1,3,5]],
    ["φ(ω,0)", [0,1,3,5,6]],
    ["Γ0", [0,1,3,5,7]],
    ["ψ(Ω2)", [0,1,3,6]],
    ["ψ(Ω3)", [0,1,3,6,10]],
    ["ψ(Ωω)", LIMIT],
]);

// ---- Expansion ----

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func(i));

    return ord;
}

export function getLimit(num) {
    return fill([], num, (i) => [i * (i + 1) / 2]);
}

function ascend(ord, offset) {
    for (let i = 0; i < ord.length; i++)
        ord[i] += offset;

    return ord;   
}

function getParent(ord, head, root = ord.length) {
    do root--; while (ord[root] >= head);
    return root;
}

function search(ord, offset, root) {
    let mark = root;
    do {
        root = mark;
        mark = getParent(ord, ord[root], root);
    }
    while (ord[root] - ord[mark] >= offset);
    return root;
}

export function expand(ord, num) {
    const head = ord.pop();
    const headRoot = getParent(ord, head, ord.length);
    const headGap = head - ord[headRoot];

    if (headGap >= 3) {
        const parent = getParent(ord, ord[headRoot], headRoot);
        const maxGap = (headGap - 1) * 2;
        const gapOffset = headGap - 3;
        const rootSlice = ord.slice(headRoot + 1, head);

        if (ord[parent] === head - maxGap) {
            for (let i = 0; i < num; i++) {
                ord.push(
                    (i + gapOffset + 2) * (i + gapOffset + 3) / 2
                    - (gapOffset + 2) * (gapOffset + 3) / 2
                    + head - 1
                );
                ascend(rootSlice, headGap + i);
                ord.push(...rootSlice);
            }
            return ord;
        }
    }

    if (head > 0) {
        const parent = getParent(ord, head);
        const type = head - ord[parent];

        const root = type > 1
        ? search(ord, type, parent)
        : parent;

        const part = ord.slice(root);
        const offset = head - ord[root] - 1;

        fill(ord, num, () => ascend(part, offset));
    }

    return ord;
}

// ---- Test ----

testExpand(expand, [
    [0,1,4], // p(Ww)
    [0,1,4,2,5], // p(Ww+p(Ww))
    [0,1,4,3,7], // p(Ww+p1(Ww))
    [0,1,4,4], // p(Ww*2)
    [0,1,4,6,3,7,9,7], // p(Ww*(W+1))
    [0,1,4,6,4], // p(Ww^2) // TODO add upgrading
], 3);
