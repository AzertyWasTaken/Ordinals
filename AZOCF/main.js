"use strict";
import {log} from "../log.js";

// Parser
// ================================================================

function tokenize(ord) {
    const regex = /[0-9]+|[ωεζφ+*^_()]/g;
    return ord.match(regex).map((v) => isNaN(v) ? v : parseInt(v));
}

function splitArray(ord, del) {
    const result = [];
    let curr = [];

    for (const item of ord) {
        if (item === del) {
            result.push(curr);
            curr = [];
        } else {
            curr.push(item);
        }
    }

    result.push(curr);
    return result;
}

function toObject(ord) {
    const sum = splitArray(ord, "+");
    const res = [];

    for (const addend of sum) {
        const type = addend[0];

        if (type === "φ") {
            res.push({t: "f", s: addend[2], f: addend[3], c: addend[5] ?? 1});
        }
        else if (type === "ζ") {
            res.push({t: "z", s: addend[2], c: addend[4] ?? 1});
        }
        else if (type === "ε") {
            res.push({t: "e", s: addend[2], c: addend[4] ?? 1});
        }
        else if (type === "ω") {
            res.push({t: "w", e: addend[2], c: addend[4] ?? 1});
        }
        else {
            res.push({t: "n", v: addend[0]});
        }
    }
    return res;
}

function parse(ord) {
    let i = 0;

    function scan(block) {
        const result = [];

        while (i < block.length) {
            if (block[i] === "(") {
                i++;
                result.push(toObject(scan(block)));
            }
            else if (block[i] === ")") {
                return result;
            }
            else {
                result.push(block[i]);
            }

            i++;
        }

        return result;
    }

    return toObject(scan(tokenize(ord)));
}

// Unparser
// ================================================================

function isZero(ord) {
    if (ord.length === 0) return true;

    const addend = ord.at(-1);
    return addend.t === "n"
    ? addend.v === 0 : addend.c === 0;
}

function strAddend(ord) {
    const type = ord.t;

    if (type === "n") {
        return String(ord.v);
    } else {
        if (ord.c === 0) return "0";

        let str;

        if (type === "w") {
            str = `ω^(${unparse(ord.e)})`;
        }
        else if (type === "e") {
            str = `ε_(${unparse(ord.s)})`;
        }
        else if (type === "z") {
            str = `ζ_(${unparse(ord.s)})`;
        }
        else if (type === "f") {
            str = `φ_(${ord.s})(${unparse(ord.f)})`;
        }

        if (ord.c !== 1) str += `*${ord.c}`;
        return str;
    }
}

function unparse(ord) {
    if (isZero(ord)) return "0";

    return ord.map(strAddend).join("+");
}

// Expander
// ================================================================

function isPhiFp(ord, sub) {
    if (ord.length !== 1) return false;

    const addend = ord.at(-1);
    if (addend.t === "n" || addend.c !== 1) return false;

    if (addend.t === "w") return addend.s > 0 || isPhiFp(addend.e, sub);
    else if (addend.t === "e") return addend.s > 1 || isPhiFp(addend.s, sub);
    else if (addend.t === "z") return addend.s > 2 || isPhiFp(addend.s, sub);
    else if (addend.t === "f") return addend.s > sub || isPhiFp(addend.f, sub);
    else return true;
}

function isZetaFp(ord) {
    if (ord.length !== 1) return false;

    const addend = ord.at(-1);
    if (addend.t === "n" || addend.c !== 1) return false;

    if (addend.t === "w") return isZetaFp(addend.e);
    else if (addend.t === "e" || addend.t === "z") return isZetaFp(addend.s);
    else if (addend.t === "f") return addend.s > 2;
    else return true;
}

function isEpsilonFp(ord) {
    if (ord.length !== 1) return false;

    const addend = ord.at(-1);
    if (addend.t === "n" || addend.c !== 1) return false;

    if (addend.t === "w") return isEpsilonFp(addend.e);
    else if (addend.t === "e") return isEpsilonFp(addend.s);
    else return true;
}

function isExpFp(ord) {
    if (ord.length !== 1) return false;

    const addend = ord.at(-1);
    if (addend.t === "n" || addend.c !== 1) return false;

    if (addend.t === "w") return isEpsilonFp(addend.e);
    else return true;
}

function phiTree(num, sub, exp) {
    let ord = exp;
    for (let i = 0; i < num; i++) ord = [{t: "f", s: sub, f: ord, c: 1}];
    return ord;
}

function epsilonTree(num, exp) {
    let ord = exp;
    for (let i = 0; i < num; i++) ord = [{t: "e", s: ord, c: 1}];
    return ord;
}

function omegaTree(num, exp) {
    let ord = exp;
    for (let i = 0; i < num; i++) ord = [{t: "w", e: ord, c: 1}];
    return ord;
}

function isSucc(ord) {
    const addend = ord.at(-1);

    if (addend.t === "n") {
        return addend.v > 0;
    }
    else if (addend.t === "w") {
        return addend.c > 0 && isZero(addend.e);
    }
    else {
        return false;
    }
}

function expand(ord, num) {
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

                if (isExpFp(newExp)) {
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

                if (isExpFp(newSub)) {
                    topOrd = topOrd.at(-1).s;
                    topOrd.at(-1).c = 2;
                }

                ord.push(...omegaTree(num, topOrd));
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

                if (isZetaFp(newSub)) {
                    topOrd = topOrd.at(-1).s;
                    topOrd.at(-1).c = 2;
                }

                ord.push(...epsilonTree(num, topOrd));
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
                
                if (isPhiFp(newArg, sub)) {
                    topOrd = topOrd.at(-1).f;
                    topOrd.at(-1).c = 2;
                }

                ord.push(...phiTree(num, sub - 1, topOrd));
            } else {
                ord.push({t: "f", s: sub, f: newArg, c: 1});
            }
        }
    }

    return ord;
}

// Tester
// ================================================================

function test(array) {
    for (const ord of array) {
        log(parse(ord));
        log(unparse(parse(ord)));
        log(unparse(expand(parse(ord), 3)));
    }
}

test([
    "0",
    "ω^(1)+3",
    "ω^(2)+ω^(1)*3",
    "ω^(3)",
    "ω^(ω^(1))*2",
    "ω^(ω^(2)*2)",
    "ε_(0)*3",
    "ω^(ω^(ε_(0)+1))",
    "ω^(ω^(ε_(0)+2)*2)",
    "ε_(ω^(1)+2)",
    "ε_(ω^(2))",
    "ε_(ζ_(0)+1)",
    "ε_(ζ_(0)*2)",
    "ζ_(2)",
    "ζ_(ε_(ω^(1)*2))",
    "φ_3(0)*2",
    "ζ_(φ_3(0)+1)",
    "φ_4(ω^(1))",
    "φ_4(φ_5(0)+1)",
]);
