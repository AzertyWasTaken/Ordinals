"use strict";
import {testExpand} from "../utils.js";

// ---- Parser ----

export function unparse(ord) {
    let str = "";
    for (let i = 0; i < ord.length; i += 2)
        str += `[${ord[i]},${ord[i + 1]}]`;

    return str;
}

// ---- Explorer ----

export function isSucc(ord) {
    return ord.at(-2) === 0;
}

// ---- Expansion ----

export function getLimit(num) {
    return [num, 1];
}

export function expand(ord, num) {
    const [pow, mul] = ord.splice(-2);

    if (mul > 1) ord.push(pow, mul - 1);
    if (pow > 0) ord.push(pow - 1, num + 1);
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[4,1,3,3]]);
