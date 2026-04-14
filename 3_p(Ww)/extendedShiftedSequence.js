"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0]],
    ["ω", [0,0,1]],
    ["ω^2", [0,0,1,0,1]],
    ["ω^ω", [0,0,1,0,1,1]],
    ["ω^ω^ω", [0,0,1,0,1,1,0,1,1,1]],
    ["ε0", [0,0,1,1,2]],
    ["ε1", [0,0,1,1,2,0,1,1,2]],
    ["εω", [0,0,1,1,2,1]],
    ["ζ0", [0,0,1,1,2,1,2]],
    ["φ(ω,0)", [0,0,1,1,2,2]],
    ["Γ0", [0,0,1,2]],
    ["ψ(ε{Ω+1})", [0,0,1,2,0,1,1,2]],
    ["ψ(Ωω)", [0,0,1,2,2,3]],
    ["ψ(Λ)", limit],
]);

// Parse

export function parse(ord) {return `(${ord.join(",")})`;}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {return ord.at(-1) === 0;}

// Expansion

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++) {
        if (a[i] !== b[i]) {return a[i] > b[i];}
    }
    return a.length > b.length;
}

function fill(ord, num, func) {
    for (let i = 0; i < num; i++) {
        ord.push(...func(i));
    }
    return ord;
}

export function getLimit(num) {
    return fill([0], num + 1, (i) => [i]);
}

function ascend(ord, offset) {
    for (let i = 0; i < ord.length; i++) {
        ord[i] += offset;
    }
    return ord;   
}

function getParent(ord, head, root = ord.length) {
    do {root--;} while (ord[root] >= head);
    return root;
}

function search(ord, head, top, root) {
    let mark = ord.length;
    do {
        root = mark;
        mark = getParent(ord, top, mark);
    }
    while (!rank(head, ord.slice(mark, root)));
    return root;
}

function searchType(ord, top) {
    let root = getParent(ord, top, ord.length);
    while (
        ord[root - 1] !== ord[root] ||
        ord[root] >= top
    ) {
        root = getParent(ord, ord[root] + 1, root);
    }
    return root;
}

export function expand(ord, num) {
    const top = ord.pop();

    if (top > 0) {
        ord.push(top);

        const head = ord.splice(getParent(ord, top));
        const parent = search(ord, head, top);
        head.pop();

        if (ord[parent - 1] < top - 1) {
            ord.push(...head);

            const root = searchType(ord, top);
            const part = ord.slice(root);
            const offset = top - ord[root] - 1;

            fill(ord, num, () => ascend(part, offset));

        } else {
            const part = ord.slice(parent);
            part.unshift(...head)

            fill(ord, num, () => part);
        }
    }
    return ord;
}

// Test

log(parse(expand([0,0,1,2,3,3,2,3,3], 3)));