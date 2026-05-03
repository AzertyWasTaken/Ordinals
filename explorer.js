"use strict";
import {log} from "./log.js";
import {limit} from "./utils.js";
import {fixModule} from "./ordModule.js";

const TOOLTIP_LENGTH = 5;

const pageDir = new URL(".", document.baseURI);
const {NOTATIONS, DEFAULT_CATEGORY, DEFAULT_NOTATION} =
    await import(new URL("./notations.js", pageDir));

let sCategory;
let sNotation;
let sModule;

let inline = true;

const el = {
    root: document.getElementById("root"),
    filters: document.getElementById("filters"),
    name: document.getElementById("name"),
    tooltip: document.getElementById("tooltip"),
}

// Expansion tree UI

function createDivElement() {
    const div = document.createElement("div");
    div.className = "node";
    if (inline) div.classList.add("shifted");
    return div;
}

function createOrdButton(ord) {
    const btn = document.createElement("button");
    btn.className = "ordinal_btn";
    btn.textContent = sModule.unparse(ord);
    return btn;
}

function createDelButton(ord) {
    const btn = document.createElement("button");
    btn.className = "collapse_btn";
    btn.textContent = "-";
    return btn;
}

function createAnalysis(ord, div, container) {
    const analysis = sModule.analyze(ord);
    if (!analysis) return undefined;

    const name = document.createElement("span");
    name.className = "ordinal_name";
    name.textContent = analysis;
    return name;
}

function mountNode(ord, row, div, ana, btn, container) {
    row.appendChild(btn);
    if (ana) row.appendChild(ana);

    div.prepend(row);
    container.prepend(div);
    container.prepend(row);
}

function logError(newOrd, lowerBound) {
    log("Error", sModule.unparse(newOrd), sModule.unparse(lowerBound));
    log("JSON", newOrd, lowerBound);
}

function getOffset(cache, ord, lowerBound) {
    let offset = 0;
    let expOrd;

    while (true) {
        expOrd = sModule.expand(ord, offset);

        if (sModule.rank(expOrd, lowerBound)) break;
        else offset++;
    }

    cache.push(expOrd);
    return offset;
}

function getCacheOrd(cache, item, ord, offset) {
    cache[item] ??= sModule.expand(ord, item + offset);
    return cache[item];
}

function createExpander(ord, div, row, lowerBound) {
    const cache = [];
    const offset = getOffset(cache, ord, lowerBound);
    let counter = 0;

    const del = createDelButton(ord);
    row.append(del);
    del.style.display = "none";

    function getOrd(item) {
        cache[item] ??= sModule.expand(ord, item + offset);
        return cache[item];
    }

    del.onclick = function collapse() {
        for (let i = 0; i < 2; i++)
            div.firstElementChild?.remove();

        counter--;
        if (counter === 0)
            del.style.display = "none";
    }

    return function expand() {
        if (sModule.isSucc(ord) && counter > 0) return;

        createNode(getOrd(counter), div,
        counter > 0 ? getOrd(counter - 1) : lowerBound);

        del.style.display = "";
        counter++;
    };
}

function createNode(ord, container, lowerBound) {
    log(lowerBound)
    const div = createDivElement(ord);
    const btn = createOrdButton(ord);
    const ana = createAnalysis(ord, div, container);

    const row = document.createElement("div");
    row.className = "ordinal_row";
    mountNode(ord, row, div, ana, btn, container);

    const isSucc = sModule.isSucc(ord);
    const isZero = sModule.isZero(ord);
    if (isSucc && lowerBound !== undefined || isZero) return;

    if (!isSucc) {
        btn.addEventListener("mouseenter", () => {showTooltip(btn, ord);});
        btn.addEventListener("mouseleave", hideTooltip);
    }

    btn.onclick = createExpander(ord, div, row, lowerBound);
}

// Fundamental sequence tooltip

function showTooltip(button, ord) {
    const seq = [];
    for (let n = 0; n < TOOLTIP_LENGTH; n++) {
        const term = sModule.expand(ord, n);
        if (term === undefined) {
            throw new Error(`Undefined term`);
        }
        seq.push(sModule.unparse(term));
    }

    el.tooltip.innerHTML =
    "<b>Fundamental sequence:</b><br>" +
    seq.map((s, i) => `${i}: ${s}`).join("<br>");

    el.tooltip.style.display = "block";

    const rect = button.getBoundingClientRect();
    el.tooltip.style.left = rect.right + 10 + window.scrollX + "px";
    el.tooltip.style.top = rect.top + window.scrollY + "px";
}

function hideTooltip() {
    el.tooltip.style.display = "none";
}

// Select notation buttons

async function getModule(file) {
    try {        
        const appCatg = sCategory ? `${sCategory}/` : "";
        const url = `./${appCatg}${file}.js`;
        return await import(new URL(url, pageDir));
    }
    catch (error) {
        log("Failed to load module:", file, error);
        return undefined;
    }
}

function getGroup(catg) {
    return catg ? NOTATIONS[catg] : NOTATIONS;
}

function selectNotation(file) {
    sNotation = getGroup(sCategory)[file];
    sModule = fixModule(sNotation.module);

    const fullName = sNotation.fullName ?
    ` <font color="#A0A0A0">(${sNotation.fullName})</font>` : "";
    el.name.innerHTML = sNotation.name + fullName;
}

// Select category buttons

async function createButtons() {
    const catg = getGroup(sCategory);

    for (const file in catg) {
        const module = await getModule(file);
        if (!module) continue;

        catg[file].module = module;

        const btn = document.createElement("button");
        btn.textContent = catg[file].name;
        el.filters.appendChild(btn);

        btn.onclick = async () => {
            el.root.innerHTML = "";
            selectNotation(file);
            createNode(limit, el.root);
        };
    }
}

async function selectCategory(name) {
    el.filters.innerHTML = "";
    sCategory = name;
    await createButtons();
}

function toggleInline() {
    inline = !inline;
    document.getElementById("inline").textContent = inline
    ? "Enabled" : "Disabled";

    document.querySelectorAll(".node").forEach((el) => {
        el.classList.toggle("shifted");
    });
}

async function addCategories(list) {
    for (const item of list) {
        document.getElementById(item).addEventListener("click",
            async () => await selectCategory(item)
        );
    }
}

document.getElementById("inline").addEventListener("click", toggleInline);

// Starting setup

if (DEFAULT_CATEGORY) {
    await addCategories(Object.keys(NOTATIONS));
    await selectCategory(DEFAULT_CATEGORY);
} else {
    await selectCategory(null);
}

selectNotation(DEFAULT_NOTATION);
createNode(limit, el.root);