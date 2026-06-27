"use strict";
import {log} from "../log.js";

// Parser
// ================================================================

function tokenize(ord) {
    const regex = /[0-9]+|[ωε+*^_()]/g;
    return ord.match(regex).map((v) => isNaN(v) ? v : parseInt(v));
}

function splitArray(ord, del) {
    const result = [];
    let curr = [];

    for (const item of ord) {
        if (item === del) {
            result.push(curr);
            curr = [];
        } else {
            curr.push(item);
        }
    }

    result.push(curr);
    return result;
}

function toObject(ord) {
    const sum = splitArray(ord, "+");
    const res = [];

    for (const addend of sum) {
        if (addend.length === 5) {
            res.push([addend[0], addend[2], addend[4]]);
        } else {
            res.push(addend);
        }
    }
    return res;
}

function parse(ord) {
    if (ord === "0") return [];

    let i = 0;

    function scan(block) {
        const result = [];

        while (i < block.length) {
            if (block[i] === "(") {
                i++;
                result.push(toObject(scan(block)));
            }
            else if (block[i] === ")") {
                return result;
            }
            else {
                result.push(block[i]);
            }

            i++;
        }

        return result;
    }

    return toObject(scan(tokenize(ord)));
}

// Unparser
// ================================================================

function isZero(ord) {
    return ord.length === 0
    || ord.at(-1).length === 0;
}

function strAddend(ord) {
    if (ord[0] === "ε") {
        return `ε_${ord[1]}*${ord[2]}`;
    }
    else if (ord[0] === "ω") {
        return `ω^(${unparse(ord[1])})*${ord[2]}`;
    }
    else {
        return String(ord[0]);
    }
}

function unparse(ord) {
    if (isZero(ord)) return "0";

    return ord.map(strAddend).join("+");
}

// Expander
// ================================================================

function omegaTree(num, exp) {
    let ord = exp;
    for (let i = 0; i < num; i++) ord = [["ω", ord, 1]];
    return ord;
}

function isSucc(ord) {
    if (ord.at(-1).length === 1) {
        return true;
    } else {
        return isZero(ord.at(-1)[1]);
    }
}

function expand(ord, num) {
    if (isZero(ord)) return ord;

    const addend = ord.pop();

    if (addend.length === 1) {
        const [value] = addend;
        if (value > 1) ord.push([value - 1]);
    } else {
        const [type, exp, coeff] = addend;
        if (coeff > 1) ord.push([type, exp, coeff - 1]);

        if (type === "ε") {
            const topOrd = exp > 0 ?
            [[type, exp - 1, 2]] : [];

            ord.push(...omegaTree(num, topOrd));
        }
        else if (!isZero(exp)) {
            const newCoeff = isSucc(exp) ? num : 1
            ord.push(["ω", expand([...exp], num), newCoeff]);
        }
    }

    return ord;
}

// Tester
// ================================================================

function test(array) {
    for (const ord of array) {
        log(parse(ord));
        log(unparse(parse(ord)));
        log(unparse(expand(parse(ord), 3)));
    }
}

test([
    "0",
    "ω^(1)*1+3",
    "ω^(2)*1+ω^(1)*3",
    "ω^(3)*1",
    "ω^(ω^(1)*1)*2",
    "ω^(ω^(2)*2)*1",
    "ε_0*3",
    "ω^(ω^(ε_0*1+2)*2)*1",
    "ε_2*1",
]);
