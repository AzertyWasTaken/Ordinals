"use strict";
import {testExpand, lexicographicOrder} from "../utils.js";

// ---- Expansion ----

export function getLimit(num) {
    return [0, 0, num + 1];
}

function fill(ord, num, ...apps) {
    for (let i = 0; i < num; i++)
        ord.push(...apps);

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
    return [mark, root];
}

export function expand(ord, num) {
    const top = ord.pop();
    if (top > 0) {
        const head = ord.splice(getParent(ord, top));

        if (top - head[0] >= 2) {
            ord.push(...head);
            head[0] = top - 1;

            fill(ord, num, ...head);
        }
        else {
            const [mark, root] = search(ord, head, top);

            const part = top - ord[mark] > 1
            ? ord.slice(mark).toSpliced(0, 1, top - 1)
            : ord.slice(root);

            fill(ord, num, ...head, ...part);
        }
    }
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,0,3,3,2,3,3]]);
