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
    ["ε0", [1,2]],
    ["ε1", [1,2,0,2]],
    ["εω", [1,2,1]],
    ["ζ0", [1,2,2]],
    ["φ(ω,0)", [1,2,2,1]],
    ["Γ0", [1,2,2,2]],
    ["ψ(ε{Ω+1})", [1,2,3]],
    ["ψ(Ωω)", limit],
]);

// Parse

export function parse(ord) {
    let offset = 0;
    return `:${ord.map((i) => {
        offset += i === 0 ? -1 : 1;
        return i === 0 ? ")" : i - 1;
    }).join("")}` +
    ")".repeat(offset);
}

// Explorer

export function isZero(ord) {return ord.length === 0;}

export function isSucc(ord) {
    return ord.at(-1) === 1 &&
    search(ord.slice(0, -1), 0) < 0;
}

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++) {
        if (a[i] !== b[i]) {return a[i] > b[i];}
    }
    return a.length > b.length;
}

// Expansion

function fill(ord, num, func) {
    for (let i = 0; i < num; i++) {
        ord.push(...func(i));
    }
    return ord;
}

export function getLimit(num) {
    return fill([], num, (i) => [i + 1]);
}

function search(ord, head) {
    let root = ord.length - 1;
    let count = 0;

    while (
        root >= 0 &&
        (ord[root] === 0 || count > 0 ||
            (head > 1 && ord[root] >= head))
    ) {
        count += ord[root] === 0 ? 1 : -1;
        if (count < 0) {count = 0;}
        root--;
    }
    return root;
}

export function expand(ord, num) {
    const head = ord.pop();
    const root = search(ord, head);

    if (root >= 0) {
        const part = ord.slice(root);
        if (head === 1) {part.unshift(0);}
        fill(ord, num, () => part);
    }

    while (ord.at(-1) === 0) {ord.pop();}
    return ord;
}

// Test

log(parse(expand([1,2,3,0,2,2], 3)));