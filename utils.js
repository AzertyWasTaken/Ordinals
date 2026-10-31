"use strict";
export function validateArray(...args) {
    for (const value of args) {
        if (!Array.isArray(value))
            throw new Error(`${value} is not an array`);
    }
}

export function lexicographicOrder(a, b) {
    validateArray(a, b);
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++)
        if (a[i] !== b[i]) return a[i] > b[i];

    return a.length > b.length;
}

export function isArrayEqual(a, b) {
    validateArray(a, b);
    if (a.length !== b.length) return false;
    
    for (let i = 0; i < a.length; i++)
        if (a[i] !== b[i]) return false;

    return true;
}

export function testExpand(expand, num, ords) {
    for (const ord of ords) {
        const expansion = expand(ord, num);
        console.log(`[${expansion.join(",")}]`);
    }
}

export function fillValue(ord, num, val) {
    if (!Array.isArray(val)) val = [val];
    for (let i = 0; i < num; i++) ord.push(...val);
    return ord;
}

export function fillFunction(ord, num, fun) {
    for (let i = 0; i < num; i++) {
        const val = fun(i);
        if (!Array.isArray(val)) val = [val];
        ord.push(...val);
    }
    return ord;
}

export const LIMIT = "limit";

export function parseSequence(ord) {
    return `(${ord.join(",")})`;
}
