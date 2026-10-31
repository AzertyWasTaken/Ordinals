"use strict";
import {testExpand} from "../utils.js";

// ---- Parser ----

export function unparse(ord) {
    return ord[0].toString();
};

// ---- Explorer ----

export function isZero(ord) {
    return ord[0] === 0;
}

export function isSucc(ord) {
    return ord[0] > 0;
}

export function rank(a, b) {
    return a[0] > b[0];
}

// ---- Expansion ----

export function getLimit(num) {
    return [num];
}

export function expand(ord, num) {
    ord[0]--;
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[3]]);
