"use strict";
import {LIMIT} from "../utils.js";
import {createExpansionTree} from "./expansionTree.js";
import {createNotationSelector} from "./notationSelector.js";

const pageDir = new URL("./", document.baseURI);
const {NOTATIONS, DEFAULT_CATEGORY, DEFAULT_NOTATION} =
    await import(new URL("./Metadata/notations.js", pageDir));

const el = {
    root: document.getElementById("root"),
    filters: document.getElementById("filters"),
    name: document.getElementById("name"),
    tooltip: document.getElementById("tooltip"),
    bulkExpand: document.getElementById("bulkExpand"),
    bulkExpandValue: document.getElementById("bulkExpandValue"),
};
