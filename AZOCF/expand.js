"use strict";
import {log} from "../log.js";
import {isZero, isFixedPoint, isSucc} from "./properties.js";

function nest(ord, num, callback) {
    for (let i = 0; i < num; i++) ord = callback(ord);
    return ord;
}

export function expand(ord, num) {
    if (isZero(ord)) return ord;

    const addend = ord.pop();
    const type = addend.t;

    if (type === "n") {
        const value = addend.v;
        if (value > 1) ord.push({t: "n", v: value - 1});
    }
    else {
        const coeff = addend.c;

        if (coeff > 1) {
            const clone = structuredClone(addend)
            clone.c--;
            ord.push(clone);
        }

        if (type === "w") {
            const exp = addend.e;

            if (!isZero(exp)) {
                const newCoeff = isSucc(exp) ? num : 1;
                const newExp = expand([...exp], num);

                if (isFixedPoint(newExp, 0)) {
                    newExp.at(-1).c = newCoeff;
                    ord.push(...newExp);
                }
                else if (newCoeff > 0) {
                    ord.push({t: "w", e: newExp, c: newCoeff});
                }
            }
        }
        else if (type === "e") {
            const sub = addend.s;
            const newSub = expand([...sub], num);

            if (isSucc(sub) || isZero(sub)) {
                let topOrd = isZero(sub)
                ? [] : [{t: "e", s: newSub, c: 2}];

                if (isFixedPoint(newSub, 1)) {
                    topOrd = topOrd.at(-1).s;
                    topOrd.at(-1).c = 2;
                }

                ord.push(...nest(topOrd, num,
                    (a) => [{t: "w", e: a, c: 1}]
                ));
            } else {
                ord.push({t: "e", s: newSub, c: 1});
            }
        }
        else if (type === "z") {
            const sub = addend.s;
            const newSub = expand([...sub], num);

            if (isSucc(sub) || isZero(sub)) {
                let topOrd = isZero(sub)
                ? [] : [{t: "z", s: newSub, c: 2}];

                if (isFixedPoint(newSub, 2)) {
                    topOrd = topOrd.at(-1).s;
                    topOrd.at(-1).c = 2;
                }
                
                ord.push(...nest(topOrd, num,
                    (a) => [{t: "e", s: a, c: 1}]
                ));
            } else {
                ord.push({t: "z", s: newSub, c: 1});
            }
        }
        else if (type === "f") {
            const sub = addend.s;
            const arg = addend.f;
            const newArg = expand([...arg], num);

            if (isSucc(arg) || isZero(arg)) {
                let topOrd = isZero(arg)
                ? [] : [{t: "f", s: sub, f: newArg, c: 2}];

                if (isFixedPoint(newArg, sub)) {
                    topOrd = topOrd.at(-1).f;
                    topOrd.at(-1).c = 2;
                }

                ord.push(...nest(topOrd, num,
                    (a) => [{t: "f", s: sub - 1, f: a, c: 1}]
                ));
            } else {
                ord.push({t: "f", s: sub, f: newArg, c: 1});
            }
        }
    }

    return ord;
}
