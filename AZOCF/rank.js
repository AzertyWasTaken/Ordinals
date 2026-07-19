"use strict";
import {log} from "../log.js";
import {isZero} from "./properties.js";
import {parse} from "./parser.js";

function compare(a, b) {
    if (typeof a !== "object" || a === null)
        return a === b;

    const key_a = Object.keys(a);
    const key_b = Object.keys(b);
    if (key_a.length !== key_b.length) return false;
    
    for (const k of key_a) {
        if (!compare(a[k], b[k])) return false;
    }
    return true;
}

function canonicalizeAddend(ord) {
    if (ord.t === "n")
        return {t: "f", s: [], f: [], c: ord.v};

    if (ord.t === "w")
        return {t: "f", s: canonicalize(parse("0")), f: canonicalize(ord.e), c: ord.c}

    if (ord.t === "e")
        return {t: "f", s: canonicalize(parse("1")), f: canonicalize(ord.s), c: ord.c}

    if (ord.t === "z")
        return {t: "f", s: canonicalize(parse("2")), f: canonicalize(ord.s), c: ord.c}

    if (ord.t === "f")
        return {t: "f", s: canonicalize(ord.s), f: canonicalize(ord.f), c: ord.c}
}

function canonicalize(ord) {
    if (isZero(ord)) return [];

    return ord.map(canonicalizeAddend);
}

function getLargestSub(stack) {
    let record = 0;

    for (let index = 1; index < stack.length; index++) {
        if (rankOrd(stack[index].at(-1).s, stack[record].at(-1).s)) {
            record = index;
        }
    }

    return record;
}

function getStack(ord) {
    if (isZero(ord)) return [];

    const stack = getStack(ord[0].f);
    stack.unshift(ord);
    return stack;
}

function rankStack(sa, sb) {
    if (sa.length === 0) return false;
    if (sb.length === 0) return true;

    const la = getLargestSub(sa);
    const lb = getLargestSub(sb);
    if (!compare(sa[la], sb[lb])) return rankOrd(sa[la], sb[lb]);

    return rankStack(sa.slice(0, la), sb.slice(0, lb));
}

function rankAddend(a, b) {
    if (isZero([a])) return false;
    if (isZero([b])) return true;

    if (!compare(a.s, b.s))
        return rankStack(getStack([a]), getStack([b]));

    if (!compare(a.f, b.f)) return rankOrd(a.f, b.f);

    return a.c > b.c;
}

function rankOrd(a, b) {
    const minLen = Math.min(a.length, b.length);
    for (let i = 0; i < minLen; i++) {
        if (!compare(a[i], b[i]))
            return rankAddend(a[i], b[i]);
    }

    return a.length > b.length;
}

// Check if `a`is strictly greater than `b`
export function rank(a, b) {
    return rankOrd(canonicalize(a), canonicalize(b));
}
