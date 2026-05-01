"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [1]],
    ["ω", [1,1]],
    ["ω^2", [1,1,0,1]],
    ["ω^ω", [1,1,1]],
    ["ω^ω^ω", [1,1,1,1]],
    ["ε0", [1,1,2]],
    ["ε1", [1,1,2,0,0,1,2]],
    ["εω", [1,1,2,0,1]],
    ["ζ0", [1,1,2,0,1,2]],
    ["φ(ω,0)", [1,1,2,0,1,2,0,1]],
    ["Γ0", [1,1,2,0,1,2,0,1,2]],
    ["ψ(ε{Ω+1})", [1,1,2,0,2]],
    ["ψ(Ωω)", [1,1,2,1]],
    ["ψ(Λ)", [1,1,2,2]],
    ["ψ(Iω)", [1,1,2,2,0,1]],
    ["ψ(I(ω,0))", [1,1,2,2,1]],
    ["ψ(ε{M+1})", [1,1,2,2,3]],
    ["ψ(Mω)", limit],
]);

// Unparse

export function unparse(ord) {
    let offset = 0;

    const hydra = ord.map((i) => {
        offset += i === 0 ? -1 : 1;
        return i === 0 ? ")" : `(${i - 1}`;
    })

    return `:${hydra.join("")}`
    + ")".repeat(offset);
}


// Explorer

export function isZero(ord) {
    return ord.length === 0;
}

export function isSucc(ord) {
    return getParent(ord.slice(0, -1)) < 0;
}

// Expansion

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++)
        if (a[i] !== b[i]) return a[i] > b[i];

    return a.length > b.length;
}

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func(i));

    return ord;
}

export function getLimit(num) {
    return fill([1], num, (i) => [i + 1, i + 2]);
}

function getParent(ord, root = ord.length) {
    let count = 1;
    do {
        root--;
        count += ord[root] === 0 ? 1 : -1;
    }
    while (root >= 0 && count > 0);
    return root;
}

function getSubParent(ord, head, root = ord.length) {
    do root = getParent(ord, root);
    while (ord[root] >= head);
    return root;
}

function search(ord, head, top, root) {
    let mark = ord.length;
    do {
        if (ord[mark - 1] === 0) mark--;
        root = mark;
        mark = getSubParent(ord, top, mark);
    }
    while (rank(ord.slice(mark, root), head));
    return root;
}

export function expand(ord, num) {
    const top = ord.pop();
    const parent = getParent(ord);

    if (parent >= 0) {
        if (top > 1) {
            const head = ord.splice(getSubParent(ord, top));
            const part = ord.slice(search(ord, head, top));
            part.unshift(...head);
            fill(ord, num, () => part);
        }
        else {
            const part = ord.slice(parent);
            part.unshift(0);
            fill(ord, num, () => part);
        }
    }

    while (ord.at(-1) === 0) ord.pop();
    return ord;
}

// Test

log(unparse(expand([1,1,2,1,0,0,0,1,2,0,2], 3)));