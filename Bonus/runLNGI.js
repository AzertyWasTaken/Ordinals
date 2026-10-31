"use strict";
import {LIMIT} from "../utils.js";
import {createLngi} from "./autoLNGI.js";

// ---- Config ----

// const [CATEGORY, NOTATION] = ["0_TODO", "treeSequence"];
const [CATEGORY, NOTATION] = ["3_p(Ww)", "matrixSequence"];
const ORD_MODULE = await import(`../${CATEGORY}/${NOTATION}.js`);

const LENGTH = 10;

const OUTPUT_STR = true;
const OUTPUT_JSON = false;

const LOG_ERROR_STR = true;
const LOG_ERROR_JSON = true;

const START = undefined; // undefined
const END = LIMIT; // limit

const offset = (i) => i - 0.75; // 0 0.25 0.5 0.75 1

// ---- Results ----

function logError(res) {
    if (LOG_ERROR_STR) {
        console.log(res.str(res.next));
        console.log(res.str(res.curr));
        console.log(res.str(res.prev));
    }

    if (LOG_ERROR_JSON) {
        console.log(res.next);
        console.log(res.curr);
        console.log(res.prev);
    }
}

// ---- LNGI ----

let count = 0;

for (const res of createLngi(ORD_MODULE, LENGTH, START, END, offset)) {
    if (res.type === "error") {
        console.log("Error:");
        logError(res);
    }
    else if (res.type === "entry") {
        if (OUTPUT_STR) log(res.str(res.ord));
        if (OUTPUT_JSON) log(res.ord);
        count++;
    }
}

console.log("Length:", count);
