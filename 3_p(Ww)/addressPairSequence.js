"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0,0]],
    ["ω", [0,0,1,0]],
    ["ω^2", [0,0,1,0,1,0]],
    ["ω^ω", [0,0,1,0,2,0]],
    ["ω^ω^ω", [0,0,1,0,2,0,3,0]],
    ["ε0", [0,0,1,1]],
    ["ε1", [0,0,1,1,1,1]],
    ["εω", [0,0,1,1,2,0]],
    ["ζ0", [0,0,1,1,2,1]],
    ["φ(ω,0)", [0,0,1,1,2,1,3,0]],
    ["Γ0", [0,0,1,1,2,1,3,1]],
    ["ψ(ε{Ω+1})", [0,0,1,1,2,2]],
    ["ψ(Ωω)", limit],
]);

// Stringify

export function unparse(ord) {
    let str = ":";
    for (let i = 0; i < ord.length; i += 2)
        str += `[${ord[i]},${ord[i + 1]}]`;

    return str;
}

// Explorer

export function isZero(ord) {
    return ord.length === 0;
}

export function isSucc(ord) {
    return ord.at(-2) === 0;
}

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++)
        if (a[i] !== b[i]) return a[i] > b[i];

    return a.length > b.length;
}

// Expansion

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func(i));

    return ord;
}

export function getLimit(num) {
    return fill([], num, (i) => [i, i]);
}

function ascend(ord, root, i) {
    if (root >= 0 && i > 0) ord[0] += ord.length / 2;

    for (let i = 2; i < ord.length; i += 2) {
        ord[i] += ord.length / 2;
        if (ord[i + 1] > ord[1]) ord[i + 1] += ord.length / 2;
    }
    return ord;
}

export function expand(ord, num) {
    const [head, type] = ord.splice(-2);
    const parent = (head - 1) * 2;

    if (parent >= 0) {
        const root = (type - 1) * 2;
        const part = ord.slice(root >= 0 ? root : parent);

        if (root >= 0) part[0] = head;

        fill(ord, num, (i) => ascend(part, root, i));
    }
    return ord;
}

log(unparse(expand([0,0,1,1,2,2,3,1,2,2], 3)));