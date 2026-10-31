"use strict";
import {testExpand} from "../utils.js";

// ---- Expansion ----

export function getLimit(num) {
    return [0, num + 1];
}

function ascend(ord, offset) {
    for (let i = 0; i < ord.length; i++)
        ord[i] += offset;

    return ord;   
}

function search(ord, head) {
    let root = ord.length;
    do root--; while (ord[root] >= head);
    return root;
}

export function expand(ord, num) {
    const head = ord.pop();

    if (head > 0) {
        const root = search(ord, head);
        const part = ord.slice(root);
        const offset = head - ord[root] - 1;

        for (let i = 0; i < num; i++)
            ord.push(...ascend(part, offset));
    }
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,2,4,4]]);
