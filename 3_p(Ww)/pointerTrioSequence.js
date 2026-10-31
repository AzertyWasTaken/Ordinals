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
    return ord.at(-3) >= ord.length / 3 - 1;
}

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++)
        if (a[i] !== b[i]) return a[i] < b[i];

    return a.length > b.length;
}

// ---- Expansion ----

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func());

    return ord;
}

export function getLimit(num) {
    return fill([], num, () => [0, 0, 0]);
}

function getAscendMap(ord) {
    const map = [];

    for (let i = 0; i < ord.length; i++)
        map.push(ord[i] >= Math.floor(i / 3)
            ? ord.length / 3 : 0);

    return map;
}

function ascend(ord, ascendMap) {
    for (let i = 0; i < ord.length; i++)
        ord[i] += ascendMap[i];

    return ord;
}

export function expand(ord, num) {
    const [head, type, sub] = ord.splice(-3);
    const parent = ord.length - head * 3 - 3;

    if (parent >= 0) {
        const rootType = ord.length - type * 3 - 3;
        const subType = ord.length - sub * 3 - 3;

        const part = ord.slice(subType >= 0 ? subType :
            rootType >= 0 ? rootType : parent);

        const ascendMap = getAscendMap(part);

        if (rootType >= 0) {
            part[0] = head;
            ascendMap[0] = 0;

            if (subType >= 0) {
                part[1] = type;
                ascendMap[1] = 0;
            }
        }

        fill(ord, num, () => ascend(part, ascendMap));
    }
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,0,0,0,0,0,0,2,2,2,2,2]]);
