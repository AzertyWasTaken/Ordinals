"use strict";
import {testExpand} from "../utils.js";

// ---- Explorer ----

export function isSucc(ord) {
    return ord.at(-1) === ord.length - 1;
}

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++)
        if (a[i] !== b[i]) return a[i] < b[i];

    return a.length > b.length;
}

// ---- Expansion ----

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func(i));

    return ord;
}

export function getLimit(num) {
    return fill([], num, () => [0]);
}

export function expand(ord, num) {
    const head = ord.pop();
    const root = ord.length - head - 1;

    if (root >= 0) {
        const part = ord.slice(root);

        fill(ord, num, () => {
            part[0] += head + 1;
            return part;
        });
    }
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,0,0,1,2]]);
