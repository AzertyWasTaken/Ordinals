"use strict";
import {testExpand} from "../utils.js";

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

// ---- Tests ----

// testExpand(expand, 3, [[0,1,3,6,5,7]]);
