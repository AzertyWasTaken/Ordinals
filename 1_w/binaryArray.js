"use strict";
import {testExpand, isArrayEqual} from "../utils.js";

// ---- Parser ----

export function unparse(ord) {
    return `:${ord.join("")}`;
}

// ---- Explorer ----

function maxSepPos(ord) {
    for (let i = ord.length - 1; i >= 0; i--)
        if (ord[i] === 1) return i;

    return ord.length - 1;
}

export function rank(a, b) {
    while (true) {
        if (a.length === 0) return false;
        if (b.length === 0) return true;

        const [pa, pb] = [maxSepPos(a), maxSepPos(b)];
        if (a[pa] !== b[pb]) return a[pa] === 1;

        const [la, lb] = [a.slice(0, pa), b.slice(0, pb)];
        [a, b] = isArrayEqual(la, lb)
        ? [a.slice(pa + 1), b.slice(pb + 1)]
        : [la, lb];
    }
}

// ---- Expansion ----

function fill(num, val) {
    const arr = [];
    for (let i = 0; i < num; i++) arr.push(val);
    return arr;
}

export function getLimit(num) {
    return fill(num, 1);
}

function search(ord) {
    let root = ord.length;
    do root--; while (ord[root] === 1);
    return root;
}

export function expand(ord, num) {
    const root = search(ord);
    ord.splice(root, 1);

    if (root < ord.length)
        ord.splice(root + 1, 0, ...fill(num, 0));

    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,1,0,1,1]]);
