"use strict";
import {testExpand} from "../utils.js";

// ---- Expansion ----

export function getLimit(num) {
    return [0, num + 1];
}

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func(i));

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
        const offset = head - ord[root] - 1;

        if (offset > 0)
            fill(ord, num, (i) =>
                [ord[root] + offset * (i + 1)]);

        else fill(ord, num, () => ord.slice(root));
    }
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,3,6,6]]);
