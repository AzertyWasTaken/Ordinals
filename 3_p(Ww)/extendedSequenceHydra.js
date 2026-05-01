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
    ["ψ(Ωω)", [1,3]],
    ["ψ(Λ)", [1,3,3,2,0,0,1]],
    ["ψ(Iω)", [1,3,3,3]],
    ["ψ(I(ω,0))", [1,3,3,3,0,1]],
    ["ψ(ε{M+1})", [1,3,3,3,0,2,3]],
    ["ψ(Mω)", [1,3,3,3,0,3]],
    ["ψ(M(ω;0))", [1,3,3,3,1]],
    ["ψ(Kω)", [1,3,3,3,3]],
    ["ψ(ε{T+1})", [1,3,4]],
    ["ψ(Tω)", [1,4]],
    ["ψ(T[ω])", limit],
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

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++)
        if (a[i] !== b[i]) return a[i] > b[i];

    return a.length > b.length;
}

// Expansion

export function getLimit(num) {
    return [1, num + 2];
}

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func(i));

    return ord;
}

function ascend(ord, map) {
    for (let i = 0; i < ord.length; i++)
        ord[i] += map[i];

    return ord;
}

function getMap(ord, offset) {
    const map = [offset];
    let count = 0;

    for (let i = 1; i < ord.length; i++) {
        if (count > 0) count += ord[i] === 0 ? -1 : 1;
        if (ord[i] > 0 && ord[i] <= ord[0]) count = 1;

        map.push(
            count === 0 && ord[i] !== 0
            ? offset : 0
        );
    }
    return map;
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

function search(ord, head, root) {
    while (ord[root] >= head)
        root = getParent(ord, root);

    return root;
}

export function expand(ord, num) {
    const head = ord.pop();
    const parent = getParent(ord);

    if (parent >= 0)
        if (head === 1) {
            const part = ord.slice(parent);
            part.unshift(0);

            fill(ord, num, () => part);
        }
        else {
            const root = search(ord, head, parent);
            const part = ord.slice(root);

            const offset = head - ord[root] - 1;
            const map = getMap(part, offset);

            fill(ord, num, () => ascend(part, map));
        }

    while (ord.at(-1) === 0) ord.pop();
    return ord;
}

// Test

log(unparse(expand([1,3,3,0,0,2,4,2,3,0,0,4,0,4], 3)));