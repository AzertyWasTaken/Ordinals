"use strict";
import {log} from "../log.js";

function tokenize(ord) {
    const regex = /[0-9]+|[ωεζφ+*^_()]/g;

    const matchList = ord.match(regex);
    if (matchList === null)
        throw new Error("Must have one or more valid token");

    return matchList.map((v) => isNaN(v) ? v : parseInt(v));
}

function addBrackets(ord) {
    const result = [];
    const stack = [];

    for (let i = 0; i < ord.length; i++) {
        const char = ord[i];
        const nextChar = ord[i + 1];

        result.push(char);

        if (char === "^" && nextChar !== "(") {
            stack.push({t: "^", v: 0});
            result.push("(");
        }
        else if (char === "_" && nextChar !== "(") {
            stack.push({t: "_", v: 0});
            result.push("(");
        }
        else if (stack.length > 0) {
            if (char === "(") {
                stack.at(-1).v++;
            }
            else if (char === ")") {
                if (stack.at(-1).v === 0) {
                    throw new Error("Some brackets are not matching");
                } else {
                    stack.at(-1).v--;
                }
            }
            else if (
                stack.at(-1).v === 0
                && (
                    nextChar === ")"
                    || nextChar === "(" && char !== "*" && char !== "^" && char !== "_"
                    || nextChar === "+"
                    || nextChar === "*"
                    || nextChar === "^" && stack.at(-1).t === "_"
                )
            ) {
                stack.pop();
                result.push(")");
            }
        }
    }

    for (let i = 0; i < stack.length; i++)
        result.push(")");

    return result;
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

function toNumber(ord) {
    return isNaN(ord) ? ord : [{t: "n", v: ord}];
}

function toObject(ord) {
    const sum = splitArray(ord, "+");
    const res = [];

    for (const addend of sum) {
        const type = addend[0];

        if (type === "φ") {
            res.push({t: "f", s: toNumber(addend[2]), f: addend[3], c: addend[5] ?? 1});
        }
        else if (type === "ζ") {
            res.push({t: "z", s: toNumber(addend[2]), c: addend[4] ?? 1});
        }
        else if (type === "ε") {
            res.push({t: "e", s: toNumber(addend[2]), c: addend[4] ?? 1});
        }
        else if (type === "ω") {
            res.push(
                addend[1] === "^"
                ? {t: "w", e: toNumber(addend[2]), c: addend[4] ?? 1}
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

    const block = addBrackets(tokenize(ord));
    return toObject(scan(block));
}
