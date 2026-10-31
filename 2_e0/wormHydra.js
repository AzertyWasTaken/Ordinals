"use strict";
import {testExpand} from "../utils.js";

// ---- Parser ----

export function unparse(ord) {
    let offset = 0;

    const hydra = ord.map((i) => {
        offset += i === 0 ? -1 : 1;
        return i === 0 ? ")" : `(${i - 1}`;
    })

    return `:${hydra.join("")}`
    + ")".repeat(offset);
}

// ---- Explorer ----

export function isSucc(ord) {
    return ord.at(-1) === 1
    && search(ord.slice(0, -1)) < 0;
}

// ---- Expansion ----

export function getLimit(num) {
    return [num + 1];
}

function fill(ord, num, ...apps) {
    for (let i = 0; i < num; i++)
        ord.push(...apps);

    return ord;
}

function search(ord) {
    let root = ord.length;
    let count = 1;
    do {
        root--;
        count += ord[root] === 0 ? 1 : -1;
    }
    while (root >= 0 && count > 0);
    return root;
}

export function expand(ord, num) {
    const head = ord.pop();

    if (head > 1) fill(ord, num, head - 1);
    else {
        const root = search(ord);
        if (root >= 0)
            fill(ord, num, 0, ...ord.slice(root));
    }

    while (ord.at(-1) === 0) ord.pop();
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[3,2,0,2]]);
