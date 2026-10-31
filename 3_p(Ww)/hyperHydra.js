"use strict";
import {testExpand} from "../utils.js";

// ---- Parser ----

export function unparse(ord) {
    return `:${ord.map((i) =>
        [")", "}", "0"][i]
    ).join("")}`;
}

// ---- Explorer ----

export function isSucc(ord) {
    return getParent(ord.slice(0, -1)) < 0;
}

// ---- Expansion ----

function fill(ord, num, ...apps) {
    for (let i = 0; i < num; i++)
        ord.push(...apps);

    return ord;
}

export function getLimit(num) {
    return fill([], num, 2);
}

function trim(ord, func) {
    while (func(ord.at(-1))) ord.pop();
    return ord;
}

function getParent(ord, root = ord.length) {
    let count = 1;
    do {
        root--;
        if (ord[root] === 0) count++;
        else if (ord[root] === 2) count--;
    }
    while (root >= 0 && count > 0);
    return root;
}

function search(ord) {
    let root = ord.length;
    let count = 1;
    do {
        root--;
        if (ord[root] === 1) count++;
        else if (ord[root] === 2) count--;

        if (ord[root] === 0)
            root = getParent(ord, root);
    }
    while (root >= 0 && count > 0);
    return root;
}

export function expand(ord, num) {
    ord.pop();
    const parent = getParent(ord);

    if (parent >= 0) {
        const root = search(ord);

        if (root >= 0)
            fill(ord, num, 1, ...ord.slice(root));

        else {
            trim(ord, (i) => i === 1);
            fill(ord, num, 0, ...ord.slice(parent));
        }
    }

    return trim(ord, (i) => i !== 2);
}

// ---- Tests ----

// testExpand(expand, 3, [[2,2,1,1,2,0,2]]);
