"use strict";
import {log} from "../log.js";
import {isZero, isOne} from "./properties.js";

function strAddend(ord) {
    const type = ord.t;

    if (type === "n") {
        return String(ord.v);
    } else {
        if (ord.c === 0) return "0";

        let str;

        if (type === "w") {
            str = isOne(ord.e) ? "ω"
            : `ω^(${unparse(ord.e)})`;
        }
        else if (type === "e") {
            str = `ε_(${unparse(ord.s)})`;
        }
        else if (type === "z") {
            str = `ζ_(${unparse(ord.s)})`;
        }
        else if (type === "f") {
            str = `φ_(${ord.s})(${unparse(ord.f)})`;
        }

        if (ord.c !== 1) str += `*${ord.c}`;
        return str;
    }
}

export function unparse(ord) {
    if (isZero(ord)) return "0";

    return ord.map(strAddend).join("+");
}
