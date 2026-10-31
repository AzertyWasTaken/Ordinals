"use strict";
import {testExpand} from "../utils.js";

// ---- Parser ----

export function unparse(ord) {
    let str = ":";
    for (let i = 0; i < ord.length; i += 2)
        str += `[${ord[i]},${ord[i + 1]}]`;

    return str;
}

// ---- Explorer ----

export function isSucc(ord) {
    return ord.at(-2) === 0;
}

// ---- Expansion ----

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

// testExpand(expand, 3, [[0,0,1,1,2,2,3,1,2,2]]);
