"use strict";
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

export function convert(analysis, callback) {
    return analysis.map((ord) => {
        const newOrd = [];
        for (const item of ord[1]) {
            callback(newOrd, item);
        }
        return [ord[0], newOrd];
    });
}
