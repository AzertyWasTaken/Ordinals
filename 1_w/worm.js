"use strict";
import {testExpand, fillValue} from "../utils.js";

// ---- Expansion ----

export function getLimit(num) {
    return [num];
}

export function expand(ord, num) {
    const head = ord.pop();
    if (head > 0) fillValue(ord, num, head - 1);
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[2,2]]);
