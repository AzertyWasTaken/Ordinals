"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0]],
    ["ω", [0,0,1]],
    ["ω^2", [0,0,1,0,1]],
    ["ω^ω", [0,0,1,0,2]],
    ["ω^ω^ω", [0,0,1,0,2,0,3]],
    ["ε0", [0,0,1,1]],
    ["ε1", [0,0,1,1,0,1,1]],
    ["εω", [0,0,1,1,0,2]],
    ["ζ0", [0,0,1,1,0,2,1]],
    ["φ(ω,0)", [0,0,1,1,0,2,1,0,3]],
    ["Γ0", [0,0,1,1,0,2,1,0,3,1]],
    ["ψ(ε{Ω+1})", [0,0,1,1,0,2,2]],
    ["ψ(Ωω)", [0,0,1,1,1]],
    ["ψ(Λ)", [0,0,1,1,1,0,2,1,1,0,3,1,0,2]],
    ["ψ(Iω)", [0,0,1,1,1,0,2,1,1,0,3,1,1]],
    ["ψ(I(ω,0))", [0,0,1,1,1,0,2,1,1,0,3,1,1,0,3]],
    ["ψ(ε{M+1})", [0,0,1,1,1,0,2,1,1,0,3,1,1,0,3,1,0,4,2]],
    ["ψ(Mω)", [0,0,1,1,1,0,2,1,1,0,3,1,1,0,3,1,1]],
    ["ψ(M(ω;0))", [0,0,1,1,1,0,2,1,1,0,3,1,1,0,4]],
    ["ψ(Kω)", [0,0,1,1,1,0,2,1,1,0,3,1,1,0,4,1,1]],
    ["ψ(ε{T+1})", [0,0,1,1,1,0,2,2]],
    ["ψ(Tω)", [0,0,1,1,1,0,2,2,1]],
    ["ψ(T[ω])", [0,0,1,1,1,0,2,2,1,0,3]],
    ["ψ(T[1:;0]ω)", [0,0,1,1,1,0,2,2,1,0,3,2,1]],
    ["ψ(T[1:;;0]ω)", [0,0,1,1,1,0,2,2,1,0,3,3,1]],
    ["ψ(T[1:{ω}0]ω)", [0,0,1,1,1,0,2,2,2]],
    ["ψ(T[1{1{*ω}0}0])", [0,0,1,1,1,0,2,2,2,0,3,2,2]],
    ["ψ(T[1[ω[[1]]0]0])", [0,0,1,1,1,0,2,2,2,0,3,3,3]],
    ["ψ(T[1[0]<ω>0])", [0,0,1,1,1,1]],
    ["ψ(ψp(p(ω*0)))", [0,0,1,1,1,1,0,2,2,2,2]],
    ["ψ(p(ω~0))", [0,0,1,1,1,1,1]],
    ["ψ(B(ω))", limit],
]);

// Stringify

export function unparse(ord) {
    let str = ":";
    let pos = 0;

    for (let i = 1; i <= ord.length; i++)
        if (!ord[i] || ord[i] === 0) {
            str += `(${ord.slice(pos + 1, i).join(",")})`;
            pos = i;
        }

    return str;
}

// Explorer

export function isZero(ord) {
    return ord.length === 0;
}

export function isSucc(ord) {
    return ord.at(-1) === 0;
}

export function rank(a, b) {
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++)
        if (a[i] !== b[i]) return a[i] > b[i];

    return a.length > b.length;
}

// Expansion

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func());

    return ord;
}

export function getLimit(num) {
    return fill([0,0], num, () => [1]);
}

function getHead(ord, root = ord.length) {
    do root--; while (ord[root] !== 0);
    return root;
}

function getNextHead(ord, root = 0) {
    do root++; while ((ord[root] ?? 0) !== 0);
    return root;
}

function ascendColumn(ord, root, ascendMap) {
    for (let i = 1; (ascendMap[i] ?? 0) > 0; i++) {
        if ((ord[root + i] ?? 0) === 0 && ascendMap[i] > 0)
            ord.splice(root + i, 0, 0);

        ord[root + i] += ascendMap[i];
    }
}

function ascend(ord, ascendMap) {
    let root = 0;
    let ascRoot = 0;

    do {
        ascendColumn(ord, root, ascendMap.slice(ascRoot))
        root = getNextHead(ord, root);
        ascRoot = getNextHead(ascendMap, ascRoot);
    }
    while (root < ord.length);

    return ord;
}

function updHead(head, column) {
    for (let i = 1; i < head.length; i++) {
        if (head[i] <= (column[i] ?? 0)) return true;
        head[i] = (column[i] ?? 0);
    }

    return false;
}

function search(ord, head) {
    let root = ord.length;
    let column;
    do {
        const mark = getHead(ord, root);
        column = ord.slice(mark, root);
        root = mark;
    }
    while (updHead(head, column));
    return [root, column];
}

function getOffsetArray(head, root) {
    const offset = [];
    for (let i = 0; i < head.length - 1; i++)
        offset.push((head[i] ?? 0) - (root[i] ?? 0));

    return offset;
}

function addMapColumn(map, count, offset, column, rootColumn) {
    map.push(0);

    for (let i = 1; i < offset.length; i++) {
        if ((column[i - 1] ?? 0) < count[i]) count[i] = 0;
        if ((column[i] ?? 0) <= (rootColumn[i] ?? 0)) count[i] = (column[i - 1] ?? 0);

        if (count[i] > 0) break;
        map.push(offset[i]);
    }
}

function getAscendMap(ord, rootColumn, offset) {
    let count = fill([], offset.length, () => [0]);
    let root = rootColumn.length;
    const map = [...offset];

    while (root < ord.length) {
        const mark = getNextHead(ord, root);
        const column = ord.slice(root, mark);
        root = mark;

        addMapColumn(map, count, offset, column, rootColumn);
    }

    return map;
}

export function expand(ord, num) {
    const head = ord.splice(getHead(ord));

    if (head.length > 0) {
        const [root, column] = search(ord, [...head]);
        const part = ord.slice(root);

        const offset = getOffsetArray(head, column);
        const ascendMap = getAscendMap(part, column, offset);

        fill(ord, num, () => ascend(part, ascendMap));
    }

    return ord;
}

log(unparse(expand([0,0,1,1,1,0,2,0,3,1,0,1,1,1], 3)));