"use strict";
import {testExpand, isArrayEqual} from "../utils.js";

// ---- Explorer ----

function maxSepPos(ord) {
    let rec = ord.length - 1;

    for (let i = ord.length - 2; i >= 0; i--)
        if (ord[i] > ord[rec]) rec = i;

    return rec;
}

export function rank(a, b) {
    while (true) {
        if (a.length === 0) return false;
        if (b.length === 0) return true;

        const [pa, pb] = [maxSepPos(a), maxSepPos(b)];
        if (a[pa] !== b[pb]) return a[pa] > b[pb];

        const [la, lb] = [a.slice(0, pa), b.slice(0, pb)];
        [a, b] = isArrayEqual(la, lb)
        ? [a.slice(pa + 1), b.slice(pb + 1)]
        : [la, lb];
    }
}

// ---- Expansion ----

export function getLimit(num) {
    return [num];
}

function fill(num, val) {
    const arr = [];
    for (let i = 0; i < num; i++) arr.push(val);
    return arr;
}

function search(ord) {
    let root = ord.length;
    do root--; while (
        ord[root - 1] > 0
        && ord[root - 1] <= ord[root]
    )
    return root;
}

export function expand(ord, num) {
    if (ord.at(-1) === 0) {
        ord.pop();
    } else {
        const root = search(ord);
        const number = ord[root];

        ord.splice(ord[root - 1] === 0 ? root - 1 : root, 1);
        ord.splice(root, 0, ...fill(num, Math.max(number - 1, 0)));
    }
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,0,2,3,3]]);
