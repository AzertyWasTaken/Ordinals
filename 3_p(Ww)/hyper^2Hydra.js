"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [3]],
    ["ω", [3,1,3]],
    ["ω^2", [3,1,3,0,3]],
    ["ω^ω", [3,1,3,1,3]],
    ["ω^ω^ω", [3,1,3,1,3,1,3]],
    ["ε0", [3,2,3]],
    ["ε1", [3,2,3,0,3]],
    ["εω", [3,2,3,1,1,3]],
    ["ζ0", [3,2,3,1,3]],
    ["φ(ω,0)", [3,2,3,1,3,1,1,3]],
    ["Γ0", [3,2,3,1,3,1,3]],
    ["ψ(Ω2)", [3,2,3,2,3]],
    ["ψ(Ωω)", [3,3]],
    ["ψ(Iω)", [3,3,1,3,1,3]],
    ["ψ(Tω)", [3,3,2,3]],
    ["ψ(T[1:{ω}0]ω)", [3,3,3]],
    ["ψ(T[1[0]<ω>0])", limit],
]);

// Unparse

export function unparse(ord) {
    return `:${ord.map((i) =>
        [")", "}", "]", "0"][i]
    ).join("")}`;
}

// Explorer

export function isZero(ord) {
    return ord.length === 0;
}

export function isSucc(ord) {
    return getParent(ord.slice(0, -1)) < 0;
}

export function rank(a, b) {
    for (let i = 0; i < Math.min(a.length, b.length); i++)
        if (a[i] !== b[i]) return a[i] === 1;

    return a.length > b.length;
}

// Expansion

function fill(ord, num, ...apps) {
    for (let i = 0; i < num; i++)
        ord.push(...apps);

    return ord;
}

export function getLimit(num) {
    return fill([], num, 2);
}

function trim(ord, func) {
    while (func(ord.at(-1))) ord.pop();
    return ord;
}

function getParent(ord, root = ord.length) {
    let count = 1;
    do {
        root--;
        if (ord[root] === 0) count++;
        else if (ord[root] === 3) count--;
    }
    while (root >= 0 && count > 0);
    return root;
}

function getType(ord, root = ord.length) {
    let count = 1;
    do {
        root--;
        if (ord[root] === 1) count++;
        else if (ord[root] === 3) count--;

        if (ord[root] === 0)
            root = getParent(ord, root);
    }
    while (root >= 0 && count > 0);
    return root;
}

function search(ord) {
    let root = ord.length;
    let count = 1;
    do {
        root--;
        if (ord[root] === 2) count++;
        else if (ord[root] === 3) count--;

        if (ord[root] === 0)
            root = getParent(ord, root);

        else if (ord[root] === 1)
            root = getType(ord, root);
    }
    while (root >= 0 && count > 0);
    return root;
}

export function expand(ord, num) {
    ord.pop();
    const parent = getParent(ord);

    if (parent >= 0) {
        const root = getType(ord);

        if (root >= 0) {
            const sub = search(ord);

            if (sub >= 0)
                fill(ord, num, 2, ...ord.slice(sub));

            else {
                trim(ord, (i) => i === 2);
                fill(ord, num, 1, ...ord.slice(root));
            }
        }
        else {
            trim(ord, (i) => i === 1);
            fill(ord, num, 0, ...ord.slice(parent));
        }
    }

    return trim(ord, (i) => i !== 3);
}

log(unparse(expand([3,3,1,2,3], 3)));
