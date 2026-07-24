"use strict";
import {log} from "../log.js";
import {
    isZero,
    isOne,
    isFinite,
    hasExpBrackets,
    hasSubBrackets,
    hasPhiBrackets
} from "./properties.js";

function operand(ord) {
    const unparsed = unparse(ord);
    return isFinite(ord) ? unparsed : `(${unparsed})`;
}

function brackets(ord, callback) {
    const unparsed = unparse(ord);
    return callback(ord) ? `(${unparsed})` : unparsed;
}

function strAddend(ord) {
    const type = ord.t;

    if (type === "n") {
        return String(ord.v);
    } else {
        if (ord.c === 0) return "0";

        let str;

        if (type === "w") {
            str = isOne(ord.e) ? "ω"
            : `ω^${brackets(ord.e, hasExpBrackets)}`;
        }
        else if (type === "e") {
            str = `ε_${brackets(ord.s, hasSubBrackets)}`;
        }
        else if (type === "z") {
            str = `ζ_${brackets(ord.s, hasSubBrackets)}`;
        }
        else if (type === "f") {
            str = `φ_${brackets(ord.s, hasPhiBrackets)}(${unparse(ord.f)})`;
        }

        if (ord.c !== 1) str += `*${ord.c}`;
        return str;
    }
}

export function unparse(ord) {
    if (isZero(ord)) return "0";

    return ord.map(strAddend).join("+");
}
