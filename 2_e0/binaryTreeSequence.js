"use strict";
import {testExpand} from "../utils.js";

// ---- Explorer ----

export function isSucc(ord) {
    return ord.length > 0
    && ord.at(-1) === ord.at(-2);
}

// ---- Expansion ----

function fill(num, func) {
    const arr = [];
    for (let i = 0; i < num; i++)
        arr.push(...func(i));

    return arr;
}

export function getLimit(num) {
    return [
        ...fill(num, (i) => [i]),
        ...fill(num, (i) => [num - i - 1])
    ];
}

function ascend(ord) {
    for (let i = 0; i < ord.length; i++) ord[i]++;
    return ord;
}

function getHead(ord) {
    let root = ord.length;
    do root--; while (ord[root - 1] > ord[root]);
    return root - 1;
}

function search(ord, head, root) {
    while (ord[root] > head) root--;
    return root;
}

export function expand(ord, num) {
    const pos = getHead(ord);
    ord.splice(pos, 2);

    if (pos < ord.length) {
        const root = search(ord, ord[pos], pos - 1);
        const part = ord.slice(root, pos + 1);

        ord.splice(pos + 1, 0,
            ...fill(num, () => ascend(part)));
    }
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,1,2,2,3,3,1,0]]);
