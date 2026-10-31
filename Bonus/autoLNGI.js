"use strict";
import {LIMIT} from "../utils.js";
import {fixModule} from "../Explorer/notationWrapper.js";

export function* createLngi(mod, maxLength, start, end, offset) {
    const notationMod = fixModule(mod);

    function* expand(ord, len, lowerBound) {
        const succ = notationMod.isSucc(ord);
        if ((succ && lowerBound !== undefined) || notationMod.isZero(ord)) {return;}

        let first;
        let counter = 0;
        let children = 0;

        let newLength = len;

        function* nextOrd() {
            if ((succ && counter > 0) || newLength < 1) {return;}

            const newOrd = notationMod.expand(ord, counter);
            counter++;

            if (first || notationMod.rank(newOrd, lowerBound)) {
                children++;
                newLength = len - offset(children);

                yield* expand(newOrd, newLength, first ?? lowerBound);

                yield {type: "entry", ord: newOrd, str: notationMod.unparse};
                first = newOrd;

            } else if (counter > 4) {
                yield {type: "error", prev: lowerBound, curr: newOrd, next: ord, str: notationMod.unparse};
                return;
            }

            yield* nextOrd();
        }

        yield* nextOrd();
    }

    yield* expand(end, maxLength, start);

    yield {type: "entry", ord: LIMIT, str: notationMod.unparse};
}
