"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";

export const milestones = new Map([
    ["0", []],
    ["1", [0,0,0]],
    // ["ω", [0,0,0,1,0,0]],
    // ["ω^2", [0,0,0,1,0,0,1,0,0]],
    // ["ω^ω", [0,0,0,1,0,0,2,0,0]],
    // ["ω^ω^ω", [0,0,0,1,0,0,2,0,0,3,0,0]],
    // ["ε0", [0,0,0,1,1,0]],
    // ["ε1", [0,0,0,1,1,0,1,1,0]],
    // ["εω", [0,0,0,1,1,0,2,0,0]],
    // ["ζ0", [0,0,0,1,1,0,2,1,0]],
    // ["φ(ω,0)", [0,0,0,1,1,0,2,1,0,3,0,0]],
    // ["Γ0", [0,0,0,1,1,0,2,1,0,3,1,0]],
    // ["ψ(ε{Ω+1})", [0,0,0,1,1,0,2,2,0]],
    // ["ψ(Ωω)", [0,0,0,1,1,1]],
    // ["ψ(Λ)", [0,0,0,1,1,1,2,1,1,3,1,0,2,0,0]],
    // ["ψ(Iω)", [0,0,0,1,1,1,2,1,1,3,1,1]],
    // ["ψ(I(ω,0))", [0,0,0,1,1,1,2,1,1,3,1,1,3,0,0]],
    // ["ψ(ε{M+1})", [0,0,0,1,1,1,2,1,1,3,1,1,3,1,0,4,2,0]],
    // ["ψ(Mω)", [0,0,0,1,1,1,2,1,1,3,1,1,3,1,1]],
    // ["ψ(M(ω;0))", [0,0,0,1,1,1,2,1,1,3,1,1,4,0,0]],
    // ["ψ(Kω)", [0,0,0,1,1,1,2,1,1,3,1,1,4,1,1]],
    // ["ψ(ε{T+1})", [0,0,0,1,1,1,2,2,0]],
    // ["ψ(Tω)", [0,0,0,1,1,1,2,2,1]],
    // ["ψ(T[ω])", [0,0,0,1,1,1,2,2,1,3,0,0]],
    // ["ψ(T[1:;0]ω)", [0,0,0,1,1,1,2,2,1,3,2,1]],
    // ["ψ(T[1:;;0]ω)", [0,0,0,1,1,1,2,2,1,3,3,1]],
    // ["ψ(T[1:{ω}0]ω)", [0,0,0,1,1,1,2,2,2]],
    // ["ψ(T[1{1{*ω}0}0])", [0,0,0,1,1,1,2,2,2,3,2,2]],
    // ["ψ(T[1[ω[[1]]0]0])", [0,0,0,1,1,1,2,2,2,3,3,3]],
    ["ψ(T[1[0]<ω>0])", limit],
]);

// Stringify

export function unparse(ord) {
    let str = ":";
    for (let i = 0; i < ord.length; i += 3)
        str += `[${ord[i]},${ord[i + 1]},${ord[i + 2]}]`;

    return str;
}

// Explorer

export function isZero(ord) {
    return ord.length === 0;
}

export function isSucc(ord) {
    return ord.at(-3) >= ord.length / 3 - 1;
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
    return fill([], num, () => [0, 0, 0]);
}

function getAscendMap(ord) {
    const map = [];

    for (let i = 0; i < ord.length; i++)
        map.push(ord[i] >= Math.floor(i / 3)
            ? ord.length / 3 : 0);

    return map;
}

function ascend(ord, ascendMap) {
    for (let i = 0; i < ord.length; i++)
        ord[i] += ascendMap[i];

    return ord;
}

export function expand(ord, num) {
    const [head, type, sub] = ord.splice(-3);
    const parent = ord.length - head * 3 - 3;

    if (parent >= 0) {
        const rootType = ord.length - type * 3 - 3;
        const subType = ord.length - sub * 3 - 3;

        const part = ord.slice(subType >= 0 ? subType :
            rootType >= 0 ? rootType : parent);

        const ascendMap = getAscendMap(part);

        if (rootType >= 0) {
            part[0] = head;
            ascendMap[0] = 0;

            if (subType >= 0) {
                part[1] = type;
                ascendMap[1] = 0;
            }
        }

        fill(ord, num, () => ascend(part, ascendMap));
    }
    return ord;
}

log(unparse(expand([0,0,0,0,0,0,0,2,2,2,2,2], 3)));