"use strict";
import {LIMIT, isArrayEqual, lexicographicOrder, parseSequence} from "../utils.js";

function keyByValue(map, searchValue) {
    for (const [key, value] of map.entries()) {
        if (value === LIMIT || searchValue === LIMIT) {
            if (value === searchValue) return key;
            continue;
        }

        if (isArrayEqual(value, searchValue)) return key;
    }
    return undefined;
}

function parseRepresentation(text) {
    const value = text.trim();
    if (value === "LIMIT") return LIMIT;
    return JSON.parse(value);
}

function parseAnalysis(text) {
    const maps = new Map();
    let currentName = null;
    let currentMap = null;

    for (const rawLine of String(text).split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line) {
            if (currentName !== null) {
                maps.set(currentName, currentMap);
                currentName = null;
                currentMap = null;
            }
            continue;
        }

        if (line.startsWith("@")) {
            if (currentName !== null) maps.set(currentName, currentMap);
            currentName = line.slice(1).trim();
            currentMap = new Map();
            continue;
        }

        if (currentName === null || !line.includes("=")) continue;

        const separatorIndex = line.indexOf("=");
        const representationText = line.slice(0, separatorIndex).trim();
        const label = line.slice(separatorIndex + 1).trim();
        currentMap.set(label, parseRepresentation(representationText));
    }

    if (currentName !== null) maps.set(currentName, currentMap);
    return maps;
}

let analysisText = "";
if (typeof process !== "undefined" && process.versions && process.versions.node) {
    const fsModule = await import("node:fs");
    const pathModule = await import("node:path");
    const urlModule = await import("node:url");
    const dir = pathModule.dirname(urlModule.fileURLToPath(import.meta.url));
    const filePath = pathModule.resolve(dir, "../Metadata/analysis.txt");
    analysisText = fsModule.readFileSync(filePath, "utf8");
} else {
    try {
        const url = new URL("../Metadata/analysis.txt", import.meta.url).href;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send(null);
        if (xhr.status === 0 || xhr.status === 200) {
            analysisText = xhr.responseText || "";
        }
    } catch (error) {
        analysisText = "";
    }
}

const analysisMaps = parseAnalysis(analysisText);

export function fixModule(mod, name = null) {
    const milestones = (name && analysisMaps.has(name))
        ? analysisMaps.get(name)
        : new Map();

    return {
        analyze(ord) {
            return keyByValue(milestones, ord);
        },

        unparse(ord) {
            return ord === LIMIT
            ? "Limit" : mod.unparse
            ? mod.unparse(ord) : parseSequence(ord);
        },

        isZero(ord) {
            return ord === LIMIT
            ? false : mod.isZero
            ? mod.isZero(ord) : ord.length === 0;
        },

        isSucc(ord) {
            return ord === LIMIT
            ? false : mod.isSucc
            ? mod.isSucc(ord) : ord.at(-1) === 0;
        },

        rank(a, b) {
            return (a === LIMIT || b === undefined)
            ? true : mod.rank
            ? mod.rank(a, b) : lexicographicOrder(a, b);
        },

        expand(ord, num) {
            return ord === LIMIT
            ? mod.getLimit(num) : mod.expand([...ord], num);
        },
    }
};
