"use strict";
import {testExpand, lexicographicOrder} from "../utils.js";

// ---- Expansion ----

function fill(ord, num, func) {
    for (let i = 0; i < num; i++) {
        ord.push(...func(i));
    }
    return ord;
}

export function getLimit(num) {
    return fill([0], num + 1, (i) => [i]);
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

function search(ord, head, top, root) {
    let mark = ord.length;
    do {
        root = mark;
        mark = getParent(ord, top, mark);
    }
    while (lexicographicOrder(ord.slice(mark, root), head));
    return root;
}

function searchType(ord, top) {
    let root = ord.length - 1;

    do root = getParent(ord, ord[root] + 1, root);
    while (
        ord[root - 1] !== ord[root]
        || ord[root] >= top
    );
    return root;
}

export function expand(ord, num) {
    const top = ord.pop();

    if (top > 0) {
        const headPos = getParent(ord, top);
        const head = ord.splice(headPos);
        const parent = search(ord, head, top);

        if (ord[parent - 1] < top - 1) {
            ord.push(...head);

            const root = searchType(ord, top);
            const part = ord.slice(root);
            const offset = top - ord[root] - 1;

            fill(ord, num, () => ascend(part, offset));
        }
        else {
            const part = ord.slice(parent);
            part.unshift(...head)

            fill(ord, num, () => part);
        }
    }
    return ord;
}

// ---- Test ----

// testExpand(expand, 3, [
//     [0,0,1,2],
//     [0,0,1,2,0,1,0,1,2],
//     [0,0,1,2,3,3,2,3,3]
// ]);
