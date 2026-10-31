"use strict";
import {testExpand} from "../utils.js";

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
    do root--; while (ord[root] === 1);
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
        const top = ord.splice(getParent(ord));
        const part = ord.slice(search(ord, top.length - 1));

        fill(ord, num, () => part);
    }
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,0,1,0,1,1,0,1,1,1,0,1,1]]);
