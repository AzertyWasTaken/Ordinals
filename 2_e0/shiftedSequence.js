"use strict";
import {testExpand, lexicographicOrder} from "../utils.js";

// ---- Expansion ----

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func(i));

    return ord;
}

export function getLimit(num) {
    return fill([0], num, (i) => [i, i + 1]);
}

function getParent(ord, head, root = ord.length) {
    do root--; while (ord[root] >= head);
    return root;
}

function search(ord, head, top, root) {
    let mark = ord.length;
    do {
        root = mark;
        mark = getParent(ord, top, mark);
    }
    while (lexicographicOrder(ord.slice(mark, root), head));
    return root;
}

export function expand(ord, num) {
    const top = ord.pop();

    if (top > 0) {
        const head = ord.splice(getParent(ord, top));
        const part = ord.slice(search(ord, head, top));
        part.unshift(...head);

        fill(ord, num, () => part);
    }
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,0,1,1,2,2,3,1,2,2]]);
