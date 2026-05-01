"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", [0]],
    ["1", [1]],
    ["ω", limit],
]);

// Unparse

export function unparse(ord) {
    return ord[0].toString();
};

// Explorer

export function isZero(ord) {
    return ord[0] === 0;
}

export function isSucc(ord) {
    return ord[0] > 0;
}

export function rank(a, b) {
    return a[0] > b[0];
}

// Expansion

export function getLimit(num) {
    return [num];
}

export function expand(ord, num) {
    ord[0]--;
    return ord;
}

// Test

log(unparse(expand([3], 3)));