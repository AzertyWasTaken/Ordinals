"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";
import {trioSequence} from "../analysis.js";

export const milestones = new Map([
    ...trioSequence,
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

function getAscendMap(ord, headOffset, typeOffset) {
    const map = [headOffset, typeOffset, 0];
    let count = 0;

    for (let i = 3; i < ord.length; i += 3) {
        if (ord[i] < count) count = 0;
        if (ord[i + 1] <= ord[1]) count = ord[i];

        map.push(headOffset, count === 0 ? typeOffset : 0, 0);
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

        const headOffset = type > 0
        ? head - ord[root] : 0;

        const typeOffset = sub > 0
        ? type - ord[root] : 0;

        const ascendMap = getAscendMap(part, headOffset, typeOffset);
        fill(ord, num, () => ascend(part, ascendMap));
    }
    else ord.splice(-3);
    return ord;
}

log(unparse(expand([0,0,0,1,1,1,2,0,0,3,1,0,1,1,1], 3)));