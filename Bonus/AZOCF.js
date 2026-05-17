"use strict";
import {log} from "../log.js";

// Parse

function tokenize(ord) {
    const regex = /[0-9]+|[ω+*^()]/g;
    return ord.match(regex);
}

function completeBrackets(ord) {
    const result = [];
    let counter = 0;
    let i = 0;

    while (i < ord.length) {
        result.push(ord[i]);
        const next = ord[i + 1];

        if (ord[i] === "^") {
            if (next !== "(") {
                result.push("(");
                counter++;
            }
        }
        else if (next === undefined || next === "+" || next === "*") {
            for (let i = 0; i < counter; i++)
                result.push(")");
            counter = 0;
        }

        i++;
    }

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

function structuredTree(ord) {
    let i = 0;

    function scan(arr) {
        const result = [];

        while (i < arr.length) {
            if (arr[i] === "(") {
                i++;
                result.push(scan(arr));
            }
            else if (arr[i] === ")") {
                return result;
            }
            else result.push(arr[i]);

            i++;
        }

        return result;
    }

    return scan(ord);
}

function toObject(ord) {
    const sum = splitArray(ord, "+");
    const result = {type: "sum", sum: []};

    for (const addend of sum) {
        if (addend[0] === "ω") {
            const [preCoeff, coeff] = splitArray(addend, "*");
            const [, exp] = splitArray(preCoeff, "^");

            result.sum.push({type: "omega", exp: toObject((exp ?? [[1]])[0]), coeff: parseInt(coeff ?? 1)});
        }
        else {
            result.sum.push({type: "number", value: parseInt(addend)});
        }
    }

    return result;
}

function parse(ord) {
    return toObject(structuredTree(completeBrackets(tokenize(ord))));
}

// Unparse

function hasBrackets(ord) {
    return ord.sum.length > 1
    || ord.sum[0].type === "omega" && ord.sum[0].coeff > 1;
}

export function unparse(ord) {
    if (ord.type === "sum") {
        if (ord.sum.length === 0) return "0";

        return ord.sum.map(unparse).join("+");
    }
    else if (ord.type === "omega") {
        let str = "ω";

        if (ord.exp.sum[0].type !== "number" || ord.exp.sum[0].value !== 1) {
            let expStr = unparse(ord.exp);
            if (hasBrackets(ord.exp)) expStr = `(${expStr})`;
            str += `^${expStr}`;
        }

        if (ord.coeff > 1) str += `*${ord.coeff}`;
        return str;
    }
    else {
        return ord.value.toString();
    }
}

// Expansion

export function getLimit(num) {
    if (num === 0) return {type: "sum", sum: [], coeff: 1};

    let ord = {type: "sum", sum: [{type: "number", value: 1}], coeff: 1};

    for (let i = 0; i < num - 1; i++) {
        ord = {type: "sum", sum: [{type: "omega", exp: ord, coeff: 1}]};
    }
    return ord;
}

function clearZeros(ord) {
    for (let i = ord.sum.length - 1; i >= 0; i--) {
        const item = ord.sum[i];
        if (
            item.type === "omega"
            ? item.coeff === 0
            : item.value === 0
        )
        ord.sum.splice(i, 1);
    }
    return ord;
}

function omegaToNumber(ord) {
    for (let i = ord.sum.length - 1; i >= 0; i--) {
        const item = ord.sum[i];
        if (item.type === "omega" && item.exp.sum.length === 0)
            ord.sum[i] = {type: "number", value: parseInt(item.coeff)};
    }
    return ord;
}

function isSuccessor(ord) {
    return ord.sum.at(-1).type === "number";
}

export function expand(ord, num) {
    const head = ord.sum.at(-1);

    if (head.type === "omega") {
        if (isSuccessor(head.exp)) {
            ord.sum.push({type: "omega", exp: expand({type: "sum", sum: structuredClone(head.exp.sum)}, num), coeff: num});
        }
        else {
            ord.sum.push({type: "omega", exp: expand({type: "sum", sum: structuredClone(head.exp.sum)}, num), coeff: 1});
        }
        head.coeff--;
    }
    else {
        head.value--;
    }

    return omegaToNumber(clearZeros(ord));
}

function test(ord, num = 3) {
    log(parse(ord));
    log(expand(parse(ord), num));
    log(unparse(parse(ord), num));
    log(unparse(expand(parse(ord), num)));
}

log(getLimit(3));
log(unparse(getLimit(3)));

test("1");
test("ω+3");
test("ω^2+ω");
test("ω^3+ω^2*2");
test("ω^(ω*2)*2");
test("ω^ω^3");
