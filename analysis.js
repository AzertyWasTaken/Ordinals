"use strict";
import {log} from "./log.js";
import {limit} from "./utils.js";

export const sequence = [
    ["0", []],
    ["1", [0]],
    ["ω", [0,1]],
    ["ω*2", [0,1,0,1]],
    ["ω^2", [0,1,1]],
    ["ω^3", [0,1,1,1]],
    ["ω^ω", [0,1,2]],
    ["ω^(ω+1)", [0,1,2,1]],
    ["ω^(ω*2)", [0,1,2,1,2]],
    ["ω^ω^2", [0,1,2,2]],
    ["ω^ω^ω", [0,1,2,3]],
    ["ω^ω^ω^ω", [0,1,2,3,4]],
]

export const pairSequence = [
    ...pair(sequence),
    ["ε0", [0,0,1,1]],
    ["ε0*ω", [0,0,1,1,1,0]],
    ["ε0^2", [0,0,1,1,1,0,2,1]],
    ["ε1", [0,0,1,1,1,1]],
    ["εω", [0,0,1,1,2,0]],
    ["εε0", [0,0,1,1,2,0,3,1]],
    ["ζ0", [0,0,1,1,2,1]],
    ["η0", [0,0,1,1,2,1,2,1]],
    ["φ(ω,0)", [0,0,1,1,2,1,3,0]],
    ["φ(ε0,0)", [0,0,1,1,2,1,3,0,4,1]],
    ["φ(ζ0,0)", [0,0,1,1,2,1,3,0,4,1,5,1]],
    ["Γ0", [0,0,1,1,2,1,3,1]],
    ["φ(ω,0,0)", [0,0,1,1,2,1,3,1,3,0]],
    ["φ(1,0,0,0)", [0,0,1,1,2,1,3,1,3,1]],
    ["ψ(Ω^Ω^ω)", [0,0,1,1,2,1,3,1,4,0]],
    ["ψ(Ω^Ω^Ω)", [0,0,1,1,2,1,3,1,4,1]],
    ["ψ(Ω2)", [0,0,1,1,2,2]],
    ["ψ(Ω3)", [0,0,1,1,2,2,3,3]],
]

export const trioSequence = [
    ...trio(pairSequence),
    ["ψ(Ωω)", [0,0,0,1,1,1]],
    ["ψ(Λ)", [0,0,0,1,1,1,2,1,1,3,1,0,2,0,0]],
    ["ψ(Iω)", [0,0,0,1,1,1,2,1,1,3,1,1]],
    ["ψ(I(ω,0))", [0,0,0,1,1,1,2,1,1,3,1,1,3,0,0]],
    ["ψ(Mω)", [0,0,0,1,1,1,2,1,1,3,1,1,3,1,1]],
    ["ψ(M(ω;0))", [0,0,0,1,1,1,2,1,1,3,1,1,4,0,0]],
    ["ψ(T2)", [0,0,0,1,1,1,2,2,0]],
    ["ψ(Tω)", [0,0,0,1,1,1,2,2,1]],
    ["ψ(T[ω])", [0,0,0,1,1,1,2,2,1,3,0,0]],
    ["ψ(T[1:;0]ω)", [0,0,0,1,1,1,2,2,1,3,2,1]],
    ["ψ(T[1:{ω}0]ω)", [0,0,0,1,1,1,2,2,2]],
    ["ψ(T[1[ω[[1]]0]0])", [0,0,0,1,1,1,2,2,2,3,3,3]],
]

export const matrixSequence = [
    ...matrix(trioSequence),
    ["ψ(T[1[0]<ω>0])", [0,1,1,1,1,0]],
    ["ψ(p(ω~0))", [0,1,1,1,1,1,0]],
]

// Convert

export function map(analysis, callback) {
    return analysis.map((ord) => [ord[0], callback(ord[1])]);
}

export function pair(analysis) {
    return map(analysis, (ord) => {
        const newOrd = [];
        for (let i = 0; i < ord.length; i++) {
            newOrd.push(ord[i], 0);
        }
        return newOrd;
    });
}

export function trio(analysis) {
    return map(analysis, (ord) => {
        const newOrd = [];
        for (let i = 0; i < ord.length; i += 2) {
            newOrd.push(ord[i], ord[i + 1], 0);
        }
        return newOrd;
    });
}

export function matrix(analysis) {
    return map(analysis, (ord) => {
        const newOrd = [];
        for (let i = 0; i < ord.length; i += 3) {
            for (let c = i; c < i + 3; c++) {
                if (ord[c] === 0) break;
                newOrd.push(ord[c]);
            }
            newOrd.push(0);
        }
        return newOrd;
    });
}

export function address(analysis) {
    return map(analysis, (ord) => {
        const stack = [];
        const newOrd = [];

        for (let i = 0; i < ord.length; i++) {
            const item = ord[i];
            newOrd.push(stack[item - 1] ?? 0);
            stack[item] = i + 1;
        }
        return newOrd;
    });
}

export function pointer(analysis) {
    return map(analysis, (ord) => {
        const stack = [];
        const newOrd = [];

        for (let i = 0; i < ord.length; i++) {
            const item = ord[i];
            newOrd.push(i - (stack[item - 1] ?? 0));
            stack[item] = i + 1;
        }
        return newOrd;
    });
}
