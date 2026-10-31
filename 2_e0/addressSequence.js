"use strict";
import {testExpand} from "../utils.js";

// ---- Expansion ----

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func(i));

    return ord;
}

export function getLimit(num) {
    return fill([], num, (i) => [i]);
}

function ascend(ord) {
    for (let i = 1; i < ord.length; i++)
        ord[i] += ord.length;

    return ord;
}

export function expand(ord, num) {
    const head = ord.pop();

    if (head > 0) {
        const part = ord.slice(head - 1);

        fill(ord, num, () => ascend(part));
    }
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,1,2,3,2]]);
