"use strict";
import {log} from "../log.js";
import {rank} from "./rank.js";
import {parse} from "./parser.js";

export function isZero(ord) {
    if (ord.length === 0) return true;

    const addend = ord[0];
    return addend.t === "n"
    ? addend.v === 0 : addend.c === 0;
}

export function isOne(ord) {
    if (ord.length !== 1) return false;

    const addend = ord[0];
    return addend.t === "n" && addend.v === 1;
}

export function isFinite(ord) {
    if (ord.length === 0) return true;
    if (ord.length > 1) return false;

    const addend = ord[0];
    return addend.t === "n" || addend.t === "w" && isZero(addend.e);
}

export function isFixedPoint(ord, sub) {
    if (ord.length !== 1) return false;

    const addend = ord[0];
    if (addend.t === "n" || addend.c !== 1) return false;

    if (addend.t === "w") {
        return isFixedPoint(addend.e, sub);
    }

    else if (addend.t === "e") {
        return rank(parse("1"), sub) || isFixedPoint(addend.s, sub);
    }
    else if (addend.t === "z") {
        return rank(parse("2"), sub) || isFixedPoint(addend.s, sub);
    }
    else if (addend.t === "f") {
        return rank(addend.s, sub) || isFixedPoint(addend.f, sub);
    }
    else {
        return true;
    }
}

export function isSucc(ord) {
    const addend = ord.at(-1);

    if (addend.t === "n") {
        return addend.v > 0;
    }
    else if (addend.t === "w") {
        return addend.c > 0 && isZero(addend.e);
    }
    else {
        return false;
    }
}
