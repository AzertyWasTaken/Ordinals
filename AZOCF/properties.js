"use strict";
import {log} from "../log.js";

export function isZero(ord) {
    if (ord.length === 0) return true;

    const addend = ord.at(-1);
    return addend.t === "n"
    ? addend.v === 0 : addend.c === 0;
}

export function isOne(ord) {
    if (ord.length === 0) return false;

    const addend = ord.at(-1);
    return addend.t === "n" && addend.v === 1;
}

export function isFixedPoint(ord, sub) {
    if (ord.length !== 1) return false;

    const addend = ord.at(-1);
    if (addend.t === "n" || addend.c !== 1) return false;

    if (addend.t === "w") return isPhiFp(addend.e, sub);
    else if (addend.t === "e") return sub < 1 || isPhiFp(addend.s, sub);
    else if (addend.t === "z") return sub < 2 || isPhiFp(addend.s, sub);
    else if (addend.t === "f") return sub < addend.s || isPhiFp(addend.f, sub);
    else return true;
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
