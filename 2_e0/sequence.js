"use strict";
import {testExpand, fillFunction, fillValue} from "../utils.js";

// ---- Expansion ----

export function getLimit(num) {
    return fillFunction([], num, (i) => i);
}

function search(ord, head) {
    let root = ord.length;
    do root--; while (ord[root] >= head);
    return root;
}

export function expand(ord, num) {
    const head = ord.pop();
    if (head > 0) {
        const part = ord.slice(search(ord, head));
        fillValue(ord, num, part);
    }
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,1,2,3,2]]);
