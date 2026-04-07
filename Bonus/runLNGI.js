"use strict";
import {limit} from "../utils.js";
import {log} from "../log.js";
import {createLngi} from "./autoLNGI.js";

// Config

// "../Azerty/aznto";
// "../Log/aznto_w";
// "../Other/worm";

const NOTATION = "../Azerty/aznto";
const ORD_MODULE = await import(`${NOTATION}.js`);

const LENGTH = 8;

const OUTPUT_STR = true;
const OUTPUT_JSON = false;

const LOG_ERROR_STR = true;
const LOG_ERROR_JSON = true;

const START = undefined; // undefined
const END = limit; // limit

const offset = (i) => i - 0.75; // 0 0.25 0.5 0.75 1

// Log results

function logError(res) {
    if (LOG_ERROR_STR) {
        log(res.str(res.next));
        log(res.str(res.curr));
        log(res.str(res.prev));
    }

    if (LOG_ERROR_JSON) {
        log(JSON.parse(res.next));
        log(JSON.parse(res.curr));
        log(JSON.parse(res.prev));
    }
}

// Generate

let totalLength = 0;

for (const res of createLngi(ORD_MODULE, LENGTH, START, END, offset)) {

    if (res.type === "error") {
        log("Error:");
        logError(res);

    } else if (res.type === "entry") {
        if (OUTPUT_STR) {log(res.str(res.ord));}
        if (OUTPUT_JSON) {log(JSON.parse(res.ord));}

        totalLength++;
    }
}

log("Length:", totalLength);