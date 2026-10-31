"use strict";
import {createLngi} from "./autoLNGI.js";
import {LIMIT} from "../utils.js";
import {fileURLToPath, pathToFileURL} from "url";
import {dirname} from "path";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LENGTH = 8;

const START = undefined; // undefined
const END = LIMIT; // limit

const offset = (i) => i - 0.75; // 0 0.25 0.5 0.75 1

function logError(res) {
    console.log(res.str(res.next));
    console.log(res.str(res.curr));
    console.log(res.str(res.prev));

    console.log(res.next);
    console.log(res.curr);
    console.log(res.prev);
}

async function test(filePath) {
    const notationMod = await import(pathToFileURL(filePath));
    const code = fs.readFileSync(filePath, "utf8");
    const exportCount = code.split("export").length - 1;

    if (exportCount !== 7) {
        console.log("Export:", exportCount, filePath);
    }

    for (const res of createLngi(notationMod, LENGTH, START, END, offset)) {
        if (res.type === "error") {
            console.log("Error:", filePath);
            logError(res);
        }
    }
}

async function iterateFolder(folder) {
    const folderPath = path.resolve(__dirname, folder);
    console.log(folderPath);

    for (const file of fs.readdirSync(folderPath)) {
        if (!file.endsWith(".js")) continue;

        const filePath = path.join(folderPath, file);
        await test(filePath);
    }
}

await iterateFolder("../1_w");
await iterateFolder("../2_e0");
await iterateFolder("../3_p(Ww)");
await iterateFolder("../4_p(Bw)");
