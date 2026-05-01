"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0,1]],
    ["ω", [0,1,0]],
    ["ω^2", [0,1,2,0]],
    ["ω^ω", [0,1,2,1,0]],
    ["ω^ω^ω", [0,1,2,3,2,1,0]],
    ["ε0", [0,1,0,0]],
    ["ε1", [0,1,2,0,0]],
    ["εω", [0,1,2,1,0,0]],
    ["ζ0", [0,1,0,0,0]],
    ["φ(ω,0)", limit],
]);

// Unparse

export function unparse(ord) {
    return `(${ord.join(",")})`;
}

// Explorer

export function isZero(ord) {
    return ord.length === 0;
}

export function isSucc(ord) {
    return ord.length > 1
    && ord.at(-2) < ord.at(-1);
}

function findValues(ord, level) {
    const res = [];
    for (let i = 0; i < ord.length; i++)
        if (ord[i] === level) res.push(i);

    res.push(ord.length);
    return res
}

function compare(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++)
        if (a[i] !== b[i]) return false;

    return true;
}

export function rank(a, b) {
    const stack = [[a, b, 0]];
    
    while (true) {
        const [ca, cb, level] = stack.pop();

        const va = findValues(ca, level);
        const vb = findValues(cb, level);

        if (va.length !== vb.length)
            return va.length > vb.length;

        for (let i = va.length - 2; i >= 0; i--) {
            const aa = ca.slice(va[i] + 1, va[i + 1]);
            const ab = cb.slice(vb[i] + 1, vb[i + 1]);

            if (!compare(aa, ab)) {
                stack.push([aa, ab, level + 1]);
                break;
            }

            if (i === 0 && compare(aa, ab))
                return false;
        }
    }
}

// Expansion

function fill(num, offset, func) {
    const arr = [];
    for (let [i, p] = [0, 0]; i < num; i++) {
        const app = func(i);
        arr.splice(p, 0, ...app);
        p += app.length - offset;
    }
    return arr;
}

export function getLimit(num) {
    return [0, 1, ...fill(num, 0, () => [0])];
}

function ascend(ord) {
    for (let i = 0; i < ord.length; i++) ord[i]++;
    return ord;
}

function getHead(ord) {
    let root = ord.length - 2;
    while (ord[root] >= ord[root + 1]) root--;
    return root + 1;
}

function search(ord, head, root) {
    while (ord[root] > head) root--;
    return root;
}

function getEnd(ord, head, root) {
    while (ord[root] === head) root++;
    return root; 
}

function trim(ord) {
    for (let i = 0; i < ord.length;)
        if (
            (ord[i - 1] ?? -1) < ord[i]
            && ord[i] === (ord[i + 1] ?? ord[i])
        )
        ord.splice(i, 1);
        else i++;
}

export function expand(ord, num) {
    const pos = getHead(ord);
    ord.splice(pos, 1);

    if (pos < ord.length) {
        const root = search(ord, ord[pos], pos - 1);
        const rootEnd = getEnd(ord, ord[pos], pos);

        const part = ord.slice(root, rootEnd);
        const offset = rootEnd - pos - 1;

        ord.splice(pos + 1, 0,
            ...fill(num, offset, () => ascend(part)));
    }

    trim(ord);
    return ord;
}

// Test

log(unparse(expand([0,1,2,3,4,2,1,0,0], 3)));