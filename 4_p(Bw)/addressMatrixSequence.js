"use strict";
import {testExpand} from "../utils.js";

// ---- Parser ----

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

// ---- Explorer ----

export function isSucc(ord) {
    return ord.at(-1) === 0
    && (!ord.at(-2) || ord.at(-2) === 0);
}

// ---- Expansion ----

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func(i));

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

function getColumnPos(ord) {
    const result = [0];

    for (let i = 0; i < ord.length - 1; i++)
        if (ord[i] === 0)
            result.push(i + 1);

    return result;
}

function search(ord, head) {
    let root = 0;
    for (let i = 0; i < head - 1; i++) {
        root = getColumn(ord, root, 1);
    }
    return [root, ord.slice(root, getColumn(ord, root, 1))];
}

function ascend(ord, index, head, rows) {
    let startIndex = 0;
    while (ord[startIndex] > 0) startIndex++;

    let row = 0;
    for (let i = startIndex + 1; i < ord.length; i++) {
        if (ord[i] > ord[row]) ord[i] += rows;

        row++;
        while (ord[i] === 0) {
            row = 0;
            i++;
        }
    }

    for (let i = 0; i < head.length - 2; i++) {
        if (ord[i] === 0) ord.splice(i, 0, 0);

        if (index > 0) ord[i] += rows;
        else ord[i] = head[i];
    }
    return ord;
}

export function expand(ord, num) {
    const columnPos = getColumnPos(ord);
    const head = ord.splice(columnPos.pop());
    const top = head.at(-2);

    if (head.length > 1) {
        const root = columnPos[top - 1];
        const part = ord.slice(root);

        fill(ord, num, (i) => ascend(part, i, head, columnPos.length - top + 1));
    }
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[0,1,1,1,0,2,2,1,0]]);
