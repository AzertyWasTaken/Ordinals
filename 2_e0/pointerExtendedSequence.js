"use strict";
import {testExpand} from "../utils.js";

// ---- Parser ----

export function unparse(ord) {
    let str = ":";
    for (let i = 0; i < ord.length; i += 2)
        str += `[${ord[i]},${ord[i + 1]}]`;

    return str;
}

// ---- Explorer ----

export function isSucc(ord) {
    return ord.at(-2) === ord.length / 2 - 1;
}

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i += 2) {
        if (a[i] !== b[i]) return a[i] < b[i];
        if (a[i + 1] !== b[i + 1]) return a[i + 1] > b[i + 1];
    }
    return a.length > b.length;
}

// ---- Expansion ----

export function getLimit(num) {
    return [0, 0, 0, num];
}

export function expand(ord, num) {
    const [head, label] = ord.splice(-2);
    const root = ord.length - head * 2 - 2;

    if (root >= 0) {
        const part = ord.slice(root);

        const ascend = label === 0
        ? () => part[0] += head + 1
        : () => part.splice(0, 2, head, label - 1);

        for (let i = 0; i < num; i++) {
            ascend();
            ord.push(...part);
        }
    }
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,0,0,1,0,1]]);
