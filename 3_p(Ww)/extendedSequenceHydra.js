"use strict";
import {testExpand} from "../utils.js";

// ---- Parser ----

export function unparse(ord) {
    let offset = 0;

    const hydra = ord.map((i) => {
        offset += i === 0 ? -1 : 1;
        return i === 0 ? ")" : `(${i - 1}`;
    })

    return `:${hydra.join("")}`
    + ")".repeat(offset);
}

// ---- Explorer ----

export function isSucc(ord) {
    return getParent(ord.slice(0, -1)) < 0;
}

// ---- Expansion ----

export function getLimit(num) {
    return [1, num + 2];
}

function fill(ord, num, func) {
    for (let i = 0; i < num; i++)
        ord.push(...func(i));

    return ord;
}

function ascend(ord, map) {
    for (let i = 0; i < ord.length; i++)
        ord[i] += map[i];

    return ord;
}

function getMap(ord, offset) {
    const map = [offset];
    let count = 0;

    for (let i = 1; i < ord.length; i++) {
        if (count > 0) count += ord[i] === 0 ? -1 : 1;
        if (ord[i] > 0 && ord[i] <= ord[0]) count = 1;

        map.push(
            count === 0 && ord[i] !== 0
            ? offset : 0
        );
    }
    return map;
}

function getParent(ord, root = ord.length) {
    let count = 1;
    do {
        root--;
        count += ord[root] === 0 ? 1 : -1;
    }
    while (root >= 0 && count > 0);
    return root;
}

function search(ord, head, root) {
    while (ord[root] >= head)
        root = getParent(ord, root);

    return root;
}

export function expand(ord, num) {
    const head = ord.pop();
    const parent = getParent(ord);

    if (parent >= 0)
        if (head === 1) {
            const part = ord.slice(parent);
            part.unshift(0);

            fill(ord, num, () => part);
        }
        else {
            const root = search(ord, head, parent);
            const part = ord.slice(root);

            const offset = head - ord[root] - 1;
            const map = getMap(part, offset);

            fill(ord, num, () => ascend(part, map));
        }

    while (ord.at(-1) === 0) ord.pop();
    return ord;
}

// ---- Tests ----

// testExpand(expand, 3, [[1,3,3,0,0,2,4,2,3,0,0,4,0,4]]);
