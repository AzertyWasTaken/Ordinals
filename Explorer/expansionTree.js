"use strict";
const TOOLTIP_LENGTH = 5;

export function createExpansionTree({elements, getModule, isInline}) {
    function createDivElement() {
        const div = document.createElement("div");
        div.className = "node";
        if (isInline()) div.classList.add("shifted");
        return div;
    }

    function createOrdButton(ord) {
        const btn = document.createElement("button");
        btn.className = "ordinal_btn";
        btn.textContent = getModule().unparse(ord);
        return btn;
    }

    function createDelButton() {
        const btn = document.createElement("button");
        btn.className = "collapse_btn";
        btn.textContent = "-";
        return btn;
    }

    function createAnalysis(ord) {
        const analysis = getModule().analyze(ord);
        if (!analysis) return undefined;

        const name = document.createElement("span");
        name.className = "ordinal_name";
        name.textContent = analysis;
        return name;
    }

    function mountNode(row, div, analysis, btn, container) {
        row.appendChild(btn);
        if (analysis) row.appendChild(analysis);

        div.prepend(row);
        container.prepend(div);
        container.prepend(row);
    }

    function getOffset(cache, ord, lowerBound) {
        const module = getModule();
        let offset = 0;
        let expOrd;

        while (true) {
            expOrd = module.expand(ord, offset);

            if (module.rank(expOrd, lowerBound)) break;
            else offset++;
        }

        cache.push(expOrd);
        return offset;
    }

    function createExpander(ord, div, row, lowerBound) {
        const module = getModule();
        const cache = [];
        const offset = getOffset(cache, ord, lowerBound);
        let counter = 0;

        const del = createDelButton();
        row.append(del);
        del.style.display = "none";

        function getOrd(item) {
            cache[item] ??= module.expand(ord, item + offset);
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
            if (module.isSucc(ord) && counter > 0) return;

            const callback = createNode(
                getOrd(counter),
                div,
                counter > 0 ? getOrd(counter - 1) : lowerBound,
            );

            del.style.display = "";
            counter++;

            if (bulkExpand > 1 && callback)
                callback(bulkExpand - 1);
        };
    }

    function createNode(ord, container, lowerBound) {
        const module = getModule();
        const div = createDivElement();
        const btn = createOrdButton(ord);
        const analysis = createAnalysis(ord);

        const row = document.createElement("div");
        row.className = "ordinal_row";
        mountNode(row, div, analysis, btn, container);

        const isSucc = module.isSucc(ord);
        const isZero = module.isZero(ord);
        if (isSucc && lowerBound !== undefined || isZero) {
            btn.classList.add("ordinal_btn_terminal");
            return undefined;
        }

        if (!isSucc) {
            btn.addEventListener("mouseenter", () => {
                showTooltip(btn, ord);
            });
            btn.addEventListener("mouseleave", hideTooltip);
        }

        const callback = createExpander(ord, div, row, lowerBound);
        btn.addEventListener("click", () => {
            callback(elements.bulkExpand.value);
        });

        return callback;
    }

    function showTooltip(button, ord) {
        const module = getModule();
        const seq = [];
        for (let n = 0; n < TOOLTIP_LENGTH; n++) {
            const term = module.expand(ord, n);
            if (term === undefined) {
                throw new Error("Undefined term");
            }
            seq.push(module.unparse(term));
        }

        elements.tooltip.innerHTML =
            "<b>Fundamental sequence:</b><br>" +
            seq.map((s, i) => `${i}: ${s}`).join("<br>");

        elements.tooltip.style.display = "block";

        const rect = button.getBoundingClientRect();
        elements.tooltip.style.left =
            rect.right + 10 + window.scrollX + "px";
        elements.tooltip.style.top =
            rect.top + window.scrollY + "px";
    }

    function hideTooltip() {
        elements.tooltip.style.display = "none";
    }

    return {createNode};
}
