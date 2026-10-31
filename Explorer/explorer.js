"use strict";
import {LIMIT} from "../utils.js";
import {createExpansionTree} from "./expansionTree.js";
import {createNotationSelector} from "./notationSelector.js";

const pageDir = new URL(".", import.meta.url);
const {NOTATIONS, DEFAULT_CATEGORY, DEFAULT_NOTATION} =
    await import(new URL("../Metadata/notations.js", pageDir));

const el = {
    root: document.getElementById("root"),
    filters: document.getElementById("filters"),
    name: document.getElementById("name"),
    tooltip: document.getElementById("tooltip"),
    bulkExpand: document.getElementById("bulkExpand"),
    bulkExpandValue: document.getElementById("bulkExpandValue"),
};

let inline = true;

const tree = createExpansionTree({
    elements: el,
    getModule: () => selector.module,
    isInline: () => inline,
});

const selector = createNotationSelector({
    elements: el,
    notations: NOTATIONS,
    pageDir,
    onNotationSelected: () => tree.createNode(LIMIT, el.root),
});

el.bulkExpand.addEventListener("input", () => {
    el.bulkExpandValue.textContent = el.bulkExpand.value;
});

function toggleInline() {
    inline = !inline;
    document.getElementById("inline").textContent = inline
        ? "Enabled" : "Disabled";

    document.querySelectorAll(".node").forEach((el) => {
        el.classList.toggle("shifted");
    });
}

document.getElementById("inline").addEventListener("click", toggleInline);

function getURLPreselection() {
    const params = new URLSearchParams(window.location.search);

    const categoryParam = params.get("category");
    const notationParam = params.get("notation");

    const validCategories = Object.keys(NOTATIONS);
    const startCategory = categoryParam &&
        validCategories.includes(categoryParam)
        ? categoryParam
        : DEFAULT_CATEGORY;

    const group = selector.getGroup(startCategory);
    const validNotations = Object.keys(group);
    const startNotation = notationParam &&
        validNotations.includes(notationParam)
        ? notationParam
        : DEFAULT_NOTATION;

    return {startCategory, startNotation};
}

const {startCategory, startNotation} = getURLPreselection();

if (startCategory) {
    await selector.addCategories(Object.keys(NOTATIONS));
    await selector.selectCategory(startCategory);
} else {
    await selector.selectCategory(null);
}

await selector.selectNotation(startNotation);
