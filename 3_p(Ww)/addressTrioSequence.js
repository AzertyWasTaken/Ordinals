"use strict";
import {testExpand} from "../utils.js";

// ---- Parser ----

export function unparse(ord) {
    let str = ":";
    for (let i = 0; i < ord.length; i += 3)
        str += `[${ord[i]},${ord[i + 1]},${ord[i + 2]}]`;

    return str;
}

// ---- Explorer ----

export function isSucc(ord) {
    return ord.at(-3) === 0;
}

// ---- Expansion ----

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func(i));

    return ord;
}

export function getLimit(num) {
    return fill([], num, (i) => [i, i, i]);
}

function ascend(ord, index, head, type, sub) {
    const rows = ord.length / 3

    for (let i = 3; i < ord.length; i += 3) {
        ord[i] += rows;
        if (ord[i + 1] > ord[1]) ord[i + 1] += rows;
        if (ord[i + 2] > ord[2]) ord[i + 2] += rows;
    }

    if (type > 0) {
        if (index > 0) ord[0] += rows;
        else ord[0] = head;
    }

    if (sub > 0) {
        if (index > 0) ord[1] += rows;
        else ord[1] = type;
    }
    return ord;
}

export function expand(ord, num) {
    const [head, type, sub] = ord.splice(-3);
    const parent = (head - 1) * 3;

    if (parent >= 0) {
        const rootType = (type - 1) * 3;
        const subType = (sub - 1) * 3;

        const part = ord.slice(subType >= 0 ? subType :
            rootType >= 0 ? rootType : parent);

        fill(ord, num, (i) =>
            ascend(part, i, head, type, sub));
    }
    return ord;
}

// testExpand(expand, 3, [[0,0,0,1,1,1,2,0,0,3,3,0,1,1,1]]);
