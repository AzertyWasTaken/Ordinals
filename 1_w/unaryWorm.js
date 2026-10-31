"use strict";
import {testExpand, fillValue} from "../utils.js";

// ---- Parser ----

export function unparse(ord) {
    return `:${"0".repeat(ord.length)}`;
}

// ---- Expansion ----

export function getLimit(num) {
    return fillValue([], num, 0);
}

export function expand(ord, num) {
    ord.pop();
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,0,0]]);
