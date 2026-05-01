"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0,0,0]],
    ["ω", [0,0,0,1,0,0]],
    ["ω^2", [0,0,0,1,0,0,1,0,0]],
    ["ω^ω", [0,0,0,1,0,0,2,0,0]],
    ["ω^ω^ω", [0,0,0,1,0,0,2,0,0,3,0,0]],
    ["ε0", [0,0,0,1,1,0]],
    ["ε1", [0,0,0,1,1,0,1,1,0]],
    ["εω", [0,0,0,1,1,0,2,0,0]],
    ["ζ0", [0,0,0,1,1,0,2,1,0]],
    ["φ(ω,0)", [0,0,0,1,1,0,2,1,0,3,0,0]],
    ["Γ0", [0,0,0,1,1,0,2,1,0,3,1,0]],
    ["ψ(ε{Ω+1})", [0,0,0,1,1,0,2,2,0]],
    ["ψ(Ωω)", [0,0,0,1,1,1]],
    ["ψ(Λ)", [0,0,0,1,1,1,2,1,1,3,1,0,2,0,0]],
    ["ψ(Iω)", [0,0,0,1,1,1,2,1,1,3,1,1]],
    ["ψ(I(ω,0))", [0,0,0,1,1,1,2,1,1,3,1,1,3,0,0]],
    ["ψ(ε{M+1})", [0,0,0,1,1,1,2,1,1,3,1,1,3,1,0,4,2,0]],
    ["ψ(Mω)", [0,0,0,1,1,1,2,1,1,3,1,1,3,1,1]],
    ["ψ(M(ω;0))", [0,0,0,1,1,1,2,1,1,3,1,1,4,0,0]],
    ["ψ(Kω)", [0,0,0,1,1,1,2,1,1,3,1,1,4,1,1]],
    ["ψ(ε{T+1})", [0,0,0,1,1,1,2,2,0]],
    ["ψ(Tω)", [0,0,0,1,1,1,2,2,1]],
    ["ψ(T[ω])", [0,0,0,1,1,1,2,2,1,3,0,0]],
    ["ψ(T[1:;0]ω)", [0,0,0,1,1,1,2,2,1,3,2,1]],
    ["ψ(T[1:;;0]ω)", [0,0,0,1,1,1,2,2,1,3,3,1]],
    ["ψ(T[1:{ω}0]ω)", [0,0,0,1,1,1,2,2,2]],
    ["ψ(T[1{1{*ω}0}0])", [0,0,0,1,1,1,2,2,2,3,2,2]],
    ["ψ(T[1[ω[[1]]0]0])", [0,0,0,1,1,1,2,2,2,3,3,3]],
    ["ψ(T[1[0]<ω>0])", limit],
]);

// Stringify

export function unparse(ord) {
    let str = ":";
    for (let i = 0; i < ord.length; i += 3)
        str += `[${ord[i]},${ord[i + 1]},${ord[i + 2]}]`;

    return str;
}

// Explorer

export function isZero(ord) {
    return ord.length === 0;
}

export function isSucc(ord) {
    return ord.at(-3) === 0;
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
    return fill([], num, (i) => [i, i, i]);
}

function ascend(ord, ascendMap) {
    for (let i = 0; i < ord.length; i++)
        ord[i] += ascendMap[i];

    return ord;
}

function getAscendMap(ord, offset, offset2) {
    const map = [offset, offset2, 0];
    let count = 0;

    for (let i = 3; i < ord.length; i += 3) {
        if (ord[i] < count) count = 0;
        if (ord[i + 1] <= ord[1]) count = ord[i];

        map.push(offset, count === 0 ? offset2 : 0, 0);
    }

    return map;
}

function getParent(ord, head, root = ord.length) {
    do root -= 3; while (ord[root] >= head);
    return root;
}

function getSubParent(ord, type, root = ord.length) {
    do root = getParent(ord, ord[root], root);
    while (ord[root + 1] >= type);
    return root;
}

function search(ord, sub) {
    let root = ord.length;
    do root = getSubParent(ord, ord[root + 1], root);
    while (ord[root + 2] >= sub);
    return root;
}

export function expand(ord, num) {
    const [head, type, sub] = ord.slice(-3);
    if (head > 0) {
        const root = sub > 0
        ? search(ord, sub)
        : type > 0
        ? getSubParent(ord, type)
        : getParent(ord, head);

        ord.splice(-3);
        const part = ord.slice(root);

        const offset = type > 0
        ? head - ord[root] : 0;

        const offset2 = sub > 0
        ? type - ord[root] : 0;

        const ascendMap = getAscendMap(part, offset, offset2);
        fill(ord, num, () => ascend(part, ascendMap));
    }
    else ord.splice(-3);
    return ord;
}

log(unparse(expand([0,0,0,1,1,1,2,0,0,3,1,0,1,1,1], 3)));