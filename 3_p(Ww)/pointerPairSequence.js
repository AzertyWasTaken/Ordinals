"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0,0]],
    ["ω", [0,0,0,1]],
    ["ω^2", [0,0,0,1,1,2]],
    ["ω^ω", [0,0,0,1,0,2]],
    ["ω^ω^ω", [0,0,0,1,0,2,0,3]],
    ["ε0", [0,0,0,0]],
    ["ε1", [0,0,0,0,1,1]],
    ["εω", [0,0,0,0,0,2]],
    ["ζ0", [0,0,0,0,0,1]],
    ["φ(ω,0)", [0,0,0,0,0,1,0,3]],
    ["Γ0", [0,0,0,0,0,1,0,2]],
    ["ψ(ε{Ω+1})", [0,0,0,0,0,0]],
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
    return ord.at(-2) >= ord.length / 2 - 1;
}

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++)
        if (a[i] !== b[i]) return a[i] < b[i];

    return a.length > b.length;
}

// Expansion

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func());

    return ord;
}

export function getLimit(num) {
    return fill([], num, () => [0, 0]);
}

function getAscendMap(ord) {
    const map = [];

    for (let i = 0; i < ord.length; i++)
        map.push(ord[i] >= (i - 1) / 2
            ? ord.length / 2 : 0);

    return map;
}

function ascend(ord, ascendMap) {
    for (let i = 0; i < ord.length; i++)
        ord[i] += ascendMap[i];

    return ord;
}

export function expand(ord, num) {
    const [head, type] = ord.splice(-2);
    const parent = ord.length - head * 2 - 2;

    if (parent >= 0) {
        const root = ord.length - type * 2 - 2;
        const part = ord.slice(root >= 0 ? root : parent);

        const ascendMap = getAscendMap(part);
    
        if (root >= 0) {
            part[0] = head;
            ascendMap[0] = 0;
        }

        fill(ord, num, () => ascend(part, ascendMap));
    }
    return ord;
}

log(unparse(expand([0,0,0,0,0,2,2,2], 3)));