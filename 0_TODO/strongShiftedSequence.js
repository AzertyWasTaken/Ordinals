"use strict";
import {LIMIT} from "../utils.js";
import {log, testExpand} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0]],
    ["ω", [0,0,1]],
    ["ω^2", [0,0,1,0,1]],
    ["ω^ω", [0,0,1,0,1,1]],
    ["ω^ω^ω", [0,0,1,0,1,1,0,1,1,1]],
    ["ε0", LIMIT],
]);

// ---- Parser ----

export function unparse(ord) {
    return `:${ord.join("")}`;
}

// ---- Expansion ----

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func(i));

    return ord;
}

export function getLimit(num) {
    return fill([], num, (i) =>
        fill([0], i, () => [1]));
}

function getParent(ord, root = ord.length) {
    do root--; while (ord[root] > 0);
    return root;
}

function search(ord, head, root) {
    let mark = ord.length;
    do {
        root = mark;
        mark = getParent(ord, mark);
    }
    while (root - mark - 1 >= head);
    return mark;
}

export function expand(ord, num) {
    const head = ord.pop();

    if (head > 0) {
        ord.push(head);

        if (ord.at(-5) === 0 && ord.at(-4) === 1 && ord.at(-3) === 0 && ord.at(-2) === 1 && ord.at(-1) === 2) {
            ord.splice(-5);
            return fill(ord, num, (i) => fill([0], i + 1, () => [1]));
        }

        const top = ord.splice(getParent(ord));
        const part = ord.slice(search(ord, top.length - 1));

        fill(ord, num, () => part);
    }
    return ord;
}

// ---- Tests ----

testExpand(expand, [
    [0,0,1,0,1,1,0,1,1,1,0,1,1],
    [0,0,1,0,1,2,0,1,0,1,2], // e0^e0
], 3);
