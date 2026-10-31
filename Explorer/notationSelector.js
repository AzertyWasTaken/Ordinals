"use strict";
import {fixModule} from "./notationWrapper.js";
import {CONTENT} from "../Metadata/panelContent.js";

const panel = document.getElementById("panel");
const panelButton = document.getElementById("toggleButton");
const panelContent = document.getElementById("panelContent");

panelButton.addEventListener("click", () => {
    const isExpanded = panelButton.getAttribute("aria-expanded") === "true";

    panelButton.setAttribute("aria-expanded", String(!isExpanded));
    panelContent.hidden = isExpanded;

    panelButton.textContent = isExpanded
        ? "Show"
        : "Hide";
});

export function createNotationSelector({
    elements,
    notations,
    pageDir,
    onNotationSelected,
}) {
    let category;
    let notation;
    let notationMod;

    function getGroup(catg) {
        return catg ? notations[catg] : notations;
    }

    async function getModule(catg, file) {
        const currentModule = getGroup(catg)[file].module;
        if (currentModule) return currentModule;

        try {
            const appCatg = catg ? `${catg}/` : "";
            const url = `../${appCatg}${file}.js`;
            const importedModule = await import(new URL(url, pageDir));

            getGroup(catg)[file].module = importedModule;
            return importedModule;
        }
        catch (error) {
            console.log("Failed to load module:", file, error);
            return undefined;
        }
    }

    async function selectNotation(file) {
        const selectedModule = await getModule(category, file);
        if (!selectedModule) return;

        elements.root.innerHTML = "";
        notation = getGroup(category)[file];
        notationMod = fixModule(selectedModule, file);

        let notationHtml = notation.name;

        if (notation.fullName)
            notationHtml +=
                `<font color="#C0C0C0"> (${notation.fullName})</font>`;

        if (notation.experimental)
            notationHtml +=
                `<font color="#FF4040"> experimental</font>`;

        elements.name.innerHTML = notationHtml;

        const newPanelContent = CONTENT[category][file];
        if (newPanelContent) {
            panel.style.display = "block";
            panelContent.innerHTML = CONTENT[category][file];
        } else {
            panel.style.display = "none";
        }

        onNotationSelected();
    }

    async function createButtons(catg) {
        const catgGroup = getGroup(catg);

        for (const file in catgGroup) {
            if (category !== catg) return;

            const btn = document.createElement("button");
            btn.textContent = catgGroup[file].name;
            elements.filters.appendChild(btn);

            btn.onclick = async () => {
                await selectNotation(file);
            };
        }
    }

    async function selectCategory(name) {
        elements.filters.innerHTML = "";
        category = name;
        await createButtons(category);
    }

    async function addCategories(list) {
        for (const item of list) {
            document.getElementById(item).addEventListener(
                "click",
                async () => await selectCategory(item),
            );
        }
    }

    return {
        get module() {return notationMod;},
        getGroup,
        selectNotation,
        selectCategory,
        addCategories,
    };
}
