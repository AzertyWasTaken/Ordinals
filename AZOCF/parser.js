"use strict";
import {log} from "../log.js";

function tokenize(ord) {
    const regex = /[0-9]+|[ωεζφ+*^_()]/g;
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
        const type = addend[0];

        if (type === "φ") {
            res.push({t: "f", s: addend[2], f: addend[3], c: addend[5] ?? 1});
        }
        else if (type === "ζ") {
            res.push({t: "z", s: addend[2], c: addend[4] ?? 1});
        }
        else if (type === "ε") {
            res.push({t: "e", s: addend[2], c: addend[4] ?? 1});
        }
        else if (type === "ω") {
            res.push(
                addend[1] === "^"
                ? {t: "w", e: addend[2], c: addend[4] ?? 1}
                : {t: "w", e: [{t: "n", v: 1}], c: addend[2] ?? 1}
            );
        }
        else {
            res.push({t: "n", v: addend[0]});
        }
    }
    return res;
}

export function parse(ord) {
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
