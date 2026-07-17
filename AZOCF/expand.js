"use strict";
import {log} from "../log.js";
import {isZero, isFixedPoint, isSucc} from "./properties.js";
import {parse} from "./parser.js";

function nest(ord, num, callback) {
    for (let i = 0; i < num; i++) ord = callback(ord);
    return ord;
}

function expandOmega(ord, exp, num) {
    if (!isZero(exp)) {
        const newCoeff = isSucc(exp) ? num : 1;
        const newExp = expand([...exp], num);

        if (isFixedPoint(newExp, parse("0"))) {
            newExp.at(-1).c = newCoeff;
            ord.push(...newExp);
        }
        else if (newCoeff > 0) {
            if (isZero(newExp)) {
                ord.push({t: "n", v: newCoeff});
            } else {
                ord.push({t: "w", e: newExp, c: newCoeff});
            }
        }
    }
}

function expandEpsilon(ord, sub, num) {
    const newSub = expand([...sub], num);

    if (isSucc(sub) || isZero(sub)) {
        let topOrd = isZero(sub)
        ? [] : [{t: "e", s: newSub, c: 2}];

        if (isFixedPoint(newSub, parse("1"))) {
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

function expandZeta(ord, sub, num) {
    const newSub = expand([...sub], num);

    if (isSucc(sub) || isZero(sub)) {
        let topOrd = isZero(sub)
        ? [] : [{t: "z", s: newSub, c: 2}];

        if (isFixedPoint(newSub, parse("2"))) {
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

function expandPhi(ord, sub, arg, num) {
    const newArg = expand([...arg], num);

    if (isZero(sub)) {
        if (!isZero(arg)) {
            const newCoeff = isSucc(arg) ? num : 1;

            if (isFixedPoint(newArg, parse("0"))) {
                newArg.at(-1).c = newCoeff;
                ord.push(...newArg);
            }
            else if (newCoeff > 0) {
                if (isZero(newArg)) {
                    ord.push({t: "n", v: newCoeff});
                } else {
                    ord.push({t: "f", s: sub, f: newArg, c: newCoeff});
                }
            }
        }
    }
    else if (isSucc(arg) || isZero(arg)) {
        const expSub = expand([...sub], num);

        if (isSucc(sub)) {
            let topOrd = isZero(arg)
            ? [] : [{t: "f", s: sub, f: newArg, c: 2}];

            if (isFixedPoint(newArg, sub)) {
                topOrd = topOrd.at(-1).f;
                topOrd.at(-1).c = 2;
            }

            ord.push(...nest(topOrd, num,
                (a) => [{t: "f", s: expSub, f: a, c: 1}]
            ));
        }
        else if (isSucc(arg)) {
            let topOrd = [{t: "f", s: sub, f: newArg, c: 2}];

            if (isFixedPoint(newArg, sub)) {
                topOrd = topOrd.at(-1).f;
                topOrd.at(-1).c = 2;
            }

            ord.push({t: "f", s: expSub, f: topOrd, c: 1});
        }
        else {
           ord.push({t: "f", s: expSub, f: parse("0"), c: 1});
        }
    }
    else {
        ord.push({t: "f", s: sub, f: newArg, c: 1});
    }
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
            expandOmega(ord, addend.e, num);
        }
        else if (type === "e") {
            expandEpsilon(ord, addend.s, num);
        }
        else if (type === "z") {
            expandZeta(ord, addend.s, num);
        }
        else if (type === "f") {
            expandPhi(ord, addend.s, addend.f, num);
        }
    }

    return ord;
}
