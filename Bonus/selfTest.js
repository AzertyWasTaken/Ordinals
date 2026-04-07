"use strict";
import {log} from "../log.js";
import {createLngi} from "./autoLNGI.js";
import {limit} from "../utils.js";
import {fileURLToPath, pathToFileURL} from "url";
import {dirname} from "path";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LENGTH = 8;

const START = undefined; // undefined
const END = limit; // limit

const offset = (i) => i - 0.75; // 0 0.25 0.5 0.75 1

async function test(filePath) {
    const ordModule = await import(pathToFileURL(filePath));
    const code = fs.readFileSync(filePath, "utf8");
    const exportCount = code.split("export").length - 1;

    if (exportCount !== 7) {
        log("Export:", exportCount, filePath);
    }

    for (const res of createLngi(ordModule, LENGTH, START, END, offset)) {
        if (res.type === "error") {
            log("Error:", filePath);

            log(res.str(res.next));
            log(res.str(res.curr));
            log(res.str(res.prev));

            log(res.next);
            log(res.curr);
            log(res.prev);
        }
    }
}

async function iterateFolder(folder) {
    const folderPath = path.resolve(__dirname, folder);
    log(folderPath);

    for (const file of fs.readdirSync(folderPath)) {
        if (!file.endsWith(".js")) {continue;}

        const filePath = path.join(folderPath, file);
        await test(filePath);
    }
}

await iterateFolder("../_w");
await iterateFolder("../_e0");