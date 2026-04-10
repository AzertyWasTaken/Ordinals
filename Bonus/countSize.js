"use strict";
import {log} from "../log.js";
import {fileURLToPath} from "url";
import fs from "fs";
import path from "path";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function sliceCode(code) {
    const explorerPos = code.indexOf("// Expansion");
    const testPos = code.indexOf("// Test", explorerPos);
    return code.slice(explorerPos, testPos);
}

function countLines(filePath) {
    const part = sliceCode(fs.readFileSync(filePath, "utf8"));

    const noComm = part.replace(new RegExp([
        "\\/\\/.*",
        "\\/\\*[\\s\\S]*?\\*\\/",
        '"(?:\\\\.|[^"\\\\])*"',
        "'(?:\\\\.|[^'\\\\])*'",
        "`(?:\\\\.|[^`\\\\])*`"
    ].join("|"), "g"), "");

    const tokens = noComm.match(new RegExp([
        "[A-Za-z_]\\w*",
        "[0-9]+",
        "&&", "\\|\\|", "\\?\\?",
        "===", "!==",
        "=>", "\\.\\.\\.",
        "<=", ">=", "<", ">",
        "--", "\\+\\+", "\\*\\*",
        "[(){}\\[\\];,+\\-*/%!?:=.]"
    ].join("|"), "g") || []);

    return tokens.length;
}

function iterateFolder(folder) {
    const folderPath = path.resolve(__dirname, folder);
    log(folderPath);

    for (const file of fs.readdirSync(folderPath)) {
        if (!file.endsWith(".js")) {continue;}

        const filePath = path.join(folderPath, file);
        const count = countLines(filePath);

        if (count !== null) {log(`| ${file} | ${count}`);}
    }
}

iterateFolder("../_w");
iterateFolder("../_e0");
iterateFolder("../_p(Ww)");