"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0]],
    ["ω", [0,0,1]],
    ["ω^ω", [0,0,1,0,2]],
    ["ε0", [0,0,0,1]],
    ["φ(ω,0)", [0,0,0,1,0,1,2,0,3]],
    ["ψ(Ω2)", [0,0,0,1,0,0,2]],
    ["ψ(Ωω)", [0,0,0,0,1]],
    ["ψ(B(ω))", limit],
]);

// Stringify

export function unparse(ord) {
    let str = ":";
    let pos = 0;
    let column = 0;

    for (let i = 0; i < ord.length; i++)
        if (ord[i] === column) {
            str += `(${ord.slice(pos, i).join(",")})`;
            pos = i + 1;
            column++;
        }

    return str;
}

// Explorer

export function isZero(ord) {
    return ord.length === 0;
}

export function isSucc(ord) {
    return ord.length - getColumnPos(ord).at(-1) <= 1;
}

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++)
        if (a[i] !== b[i]) return a[i] < b[i];

    return a.length > b.length;
}

// Expansion

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func());

    return ord;
}

export function getLimit(num) {
    return [...fill([], num + 2, () => [0]), 1];
}

function getColumnPos(ord) {
    const result = [0];
    let column = 0;

    for (let i = 0; i < ord.length - 1; i++)
        if (ord[i] === column) {
            result.push(i + 1);
            column++;
        }

    return result;
}

function getAscendMap(part, ordLen, partLen) {
    const map = [];
    let column = 0;

    for (let i = 0; i < part.length; i++) {
        map.push(part[i] >= column ? partLen : 0);

        if (part[i] === column + (ordLen - partLen)) column++;
    }
    return map;
}

function ascend(ord, ascendMap) {
    for (let i = 0; i < ord.length; i++)
        ord[i] += ascendMap[i];

    return ord;
}

function setFirstColumn(part, ascendMap, head, rootColumn) {
    for (let i = 0; i < head.length - 2; i++) {
        if (part[i] === rootColumn) {
            part.splice(i, 0, head[i]);
            ascendMap.splice(i, 0, 0);
        } else {
            part[i] = head[i];
            ascendMap[i] = 0;
        }
    }
}

export function expand(ord, num) {
    const columnPos = getColumnPos(ord);
    const head = ord.splice(columnPos.pop());
    const top = head.at(-2);

    if (head.length > 1) {
        const root = columnPos.at(-top - 1);
        const part = ord.slice(root);

        const ascendMap = getAscendMap(part, columnPos.length, top + 1);
        const rootColumn = columnPos.length - top - 1;

        setFirstColumn(part, ascendMap, head, rootColumn);

        fill(ord, num, () => ascend(part, ascendMap));
    }

    return ord;
}

log(unparse(expand([0,0,0,0,1,0,1,1,2,0,3,3,3,3,4], 3)));
