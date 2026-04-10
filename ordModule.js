"use strict";
import {clone, keyByValue, limit} from "./utils.js";

export function fixModule(mod) {
    return {
        analyze(ord) {
            return keyByValue(mod.milestones, ord);
        },

        parse(ord) {
            return ord === limit ?
            "Limit" : mod.parse(ord);
        },

        isZero(ord) {
            return ord === limit ?
            false : mod.isZero(ord);
        },

        isSucc(ord) {
            return ord === limit ?
            false : mod.isSucc(ord);
        },

        rank(a, b) {
            return (a === limit || b === undefined) ?
            true : mod.rank(a, b);
        },

        expand(ord, num) {
            return ord === limit ?
            mod.getLimit(num) : mod.expand(clone(ord), num);
        },
    }
};