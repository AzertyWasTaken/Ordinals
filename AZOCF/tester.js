"use strict";
import {log} from "../log.js";
import {parse} from "./parser.js";
import {unparse} from "./unparser.js";
import {expand} from "./expand.js";

function test(array) {
    for (const ord of array) {
        log(parse(ord));
        log(unparse(parse(ord)));
        log(unparse(expand(parse(ord), 3)));
    }
}

test([
    "0",
    "ω+3",
    "ω^(2)+ω*3",
    "ω^(3)",
    "ω^(ω)*2",
    "ω^(ω^(2)*2)",
    "ε_(0)*3",
    "ω^(ω^(ε_(0)+1))",
    "ω^(ω^(ε_(0)+2)*2)",
    "ε_(ω+2)",
    "ε_(ω^(2))",
    "ε_(ζ_(0)+1)",
    "ε_(ζ_(0)*2)",
    "ζ_(2)",
    "ζ_(ε_(ω*2))",
    "φ_3(0)*2",
    "ζ_(φ_3(0)+1)",
    "φ_4(ω)",
    "φ_4(φ_5(0)+1)",
]);
