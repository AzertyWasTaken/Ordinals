"use strict";
import {testExpand} from "../utils.js";

// ---- Expansion ----

export function getLimit(num) {
    return [0, num];
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
        part[0] = head - 1;

        for (let i = 0; i < num; i++)
            ord.push(...part);
    }
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,3,3,3]]);
