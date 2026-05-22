"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";
import {matrixSequence} from "../analysis.js";

export const milestones = new Map([
    ...matrixSequence,
    ["ψ(B(ω))", limit],
]);

// Stringify

export function unparse(ord) {
    let str = ":";
    let pos = 0;

    for (let i = 0; i < ord.length; i++)
        if (ord[i] === 0) {
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
    return ord.at(-1) === 0
    && (!ord.at(-2) || ord.at(-2) === 0);
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
    return [...fill([0], num + 1, () => [1]) ,0];
}

function item(col, index) {
    return col[index] ?? 0;
}

function getColumn(ord, root, step) {
    do root += step; while (item(ord, root - 1) > 0);
    return root;
}

function ascendColumn(ord, root, ascendMap) {
    for (let i = 0; item(ascendMap, i) > 0; i++) {
        if (item(ord, root + i) === 0 && ascendMap[i] > 0)
            ord.splice(root + i, 0, 0);

        ord[root + i] += ascendMap[i];
    }
}

function ascend(ord, ascendMap) {
    let root = 0;
    let ascRoot = 0;
    do {
        ascendColumn(ord, root, ascendMap.slice(ascRoot))
        root = getColumn(ord, root, 1);
        ascRoot = getColumn(ascendMap, ascRoot, 1);
    }
    while (root < ord.length);
    return ord;
}

function updHead(head, column) {
    for (let i = 0; i < head.length - 1; i++) {
        if (head[i] <= item(column, i)) return true;
        head[i] = item(column, i);
    }

    return false;
}

function search(ord, head) {
    let root = ord.length;
    let column;
    do {
        const mark = getColumn(ord, root, -1);
        column = ord.slice(mark, root);
        root = mark;
    }
    while (updHead(head, column));
    return [root, column];
}

function getOffsetArray(head, root) {
    const offset = [];
    for (let i = 0; i < head.length - 2; i++)
        offset.push(head[i] - item(root, i));

    offset.push(0);
    return offset;
}

function addMapColumn(map, count, offset, column, rootColumn) {
    for (let i = 0; i < offset.length - 1; i++) {
        if (item(column, i - 1) < count[i])
            count[i] = 0;

        if (item(column, i) <= item(rootColumn, i))
            count[i] = item(column, i - 1);

        if (count[i] > 0) break;
        map.push(offset[i]);
    }
    map.push(0);
}

function getAscendMap(ord, rootColumn, offset) {
    let count = fill([], offset.length, () => [0]);
    let root = rootColumn.length;
    const map = [...offset];

    while (root < ord.length) {
        const mark = getColumn(ord, root, 1);
        const column = ord.slice(root, mark);
        root = mark;

        addMapColumn(map, count, offset, column, rootColumn);
    }

    return map;
}

export function expand(ord, num) {
    const head = ord.splice(getColumn(ord, ord.length, -1));

    if (head.length > 1) {
        const [root, column] = search(ord, [...head]);
        const part = ord.slice(root);

        const offset = getOffsetArray(head, column);
        const ascendMap = getAscendMap(part, column, offset);

        fill(ord, num, () => ascend(part, ascendMap));
    }

    return ord;
}

log(unparse(expand([0,1,1,1,0,2,0,3,1,0,1,1,1,0], 3)));
