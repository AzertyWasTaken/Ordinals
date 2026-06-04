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
    bulkExpand: document.getElementById("bulkExpand"),
    bulkExpandValue: document.getElementById("bulkExpandValue"),
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

// Expansion manager

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

    return function expand(bulkExpand = 1) {
        const a = el.bulkExpand.value;

        // Expand only once if `ord` is successor
        if (sModule.isSucc(ord) && counter > 0) return;

        const callback = createNode(getOrd(counter), div,
        counter > 0 ? getOrd(counter - 1) : lowerBound);

        del.style.display = "";
        counter ++;

        if (bulkExpand > 1 && callback)
            callback(bulkExpand - 1);
    };
}

function createNode(ord, container, lowerBound) {
    const div = createDivElement(ord);
    const btn = createOrdButton(ord);
    const ana = createAnalysis(ord, div, container);

    const row = document.createElement("div");
    row.className = "ordinal_row";
    mountNode(ord, row, div, ana, btn, container);

    const isSucc = sModule.isSucc(ord);
    const isZero = sModule.isZero(ord);
    if (isSucc && lowerBound !== undefined || isZero)
        return undefined;

    if (!isSucc) {
        btn.addEventListener("mouseenter", () => {showTooltip(btn, ord);});
        btn.addEventListener("mouseleave", hideTooltip);
    }

    const callback = createExpander(ord, div, row, lowerBound);
    btn.addEventListener("click", () => callback(el.bulkExpand.value));

    return callback;
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

async function getModule(catg, file) {
    const currentModule = getGroup(catg)[file].module;
    if (currentModule) return currentModule;

    try {        
        const appCatg = catg ? `${catg}/` : "";
        const url = `./${appCatg}${file}.js`;
        const importedModule = await import(new URL(url, pageDir));

        getGroup(catg)[file].module = importedModule;
        return importedModule;
    }
    catch (error) {
        log("Failed to load module:", file, error);
        return undefined;
    }
}

function getGroup(catg) {
    return catg ? NOTATIONS[catg] : NOTATIONS;
}

async function selectNotation(file) { // TODO fix await occuring twice & getNotation function
    const mod = await getModule(sCategory, file);
    if (!mod) return;

    el.root.innerHTML = "";
    sNotation = getGroup(sCategory)[file];
    sModule = fixModule(mod);

    let notationHtml = sNotation.name

    if (sNotation.fullName)
        notationHtml += `<font color="#C0C0C0"> (${sNotation.fullName})</font>`;

    if (sNotation.experimental)
        notationHtml += `<font color="#FF4040"> experimental</font>`;

    el.name.innerHTML = notationHtml;
}

// Select category buttons

async function createButtons(catg) {
    const catgGroup = getGroup(catg);

    for (const file in catgGroup) {
        if (sCategory !== catg) return;

        const btn = document.createElement("button");
        btn.textContent = catgGroup[file].name;
        el.filters.appendChild(btn);

        btn.onclick = async () => {
            await selectNotation(file);
            createNode(limit, el.root);
        };
    }
}

async function selectCategory(name) {
    el.filters.innerHTML = "";
    sCategory = name;
    await createButtons(sCategory);
}

async function addCategories(list) {
    for (const item of list) {
        document.getElementById(item).addEventListener("click",
            async () => await selectCategory(item)
        );
    }
}

el.bulkExpand.addEventListener("input", () => {
    el.bulkExpandValue.textContent = el.bulkExpand.value;
});

// Toggle inline

function toggleInline() {
    inline = !inline;
    document.getElementById("inline").textContent = inline
    ? "Enabled" : "Disabled";

    document.querySelectorAll(".node").forEach((el) => {
        el.classList.toggle("shifted");
    });
}

document.getElementById("inline").addEventListener("click", toggleInline);

// Starting setup

function getURLPreselection() {
    const params = new URLSearchParams(window.location.search);

    const categoryParam = params.get("category");
    const notationParam = params.get("notation");

    // Validate category
    const validCategories = Object.keys(NOTATIONS);
    const startCategory = (categoryParam && validCategories.includes(categoryParam))
        ? categoryParam
        : DEFAULT_CATEGORY;

    // Validate notation within the chosen category
    const group = getGroup(startCategory);
    const validNotations = Object.keys(group);
    const startNotation = (notationParam && validNotations.includes(notationParam))
        ? notationParam
        : DEFAULT_NOTATION;

    return {startCategory, startNotation};
}

const {startCategory, startNotation} = getURLPreselection();

if (startCategory) {
    await addCategories(Object.keys(NOTATIONS));
    await selectCategory(startCategory);
} else {
    await selectCategory(null);
}

await selectNotation(startNotation);
createNode(limit, el.root);
