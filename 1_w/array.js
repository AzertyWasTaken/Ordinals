"use strict";
import {testExpand} from "../utils.js";

// ---- Parser ----

export function unparse(ord) {
    return `[${ord.join(",")}]`;
}

// ---- Explorer ----

export function isSucc(ord) {
    return ord.at(-1) > 0;
}

export function rank(a, b) {
    if (a.length !== b.length)
        return a.length > b.length;

    for (let i = 0; i < a.length; i++)
        if (a[i] !== b[i]) return a[i] > b[i];

    return false;
}

// ---- Expansion ----

export function getLimit(num) {
    const ord = [1];
    for (let i = 0; i < num; i++) ord.push(0);
    return ord;
}

export function expand(ord, num) {
    let pos = ord.length - 1;
    while (ord[pos] === 0) pos--;

    if (pos + 1 < ord.length)
        ord[pos + 1] = num + 1;

    ord[pos]--;
    if (ord[0] === 0) ord.shift();
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[1,0,0,0]]);
