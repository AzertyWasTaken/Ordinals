"use strict";
export function isObject(obj) {
    return obj === null ? false : typeof obj === "object";
}

export function clone(obj, layer) {
    if (layer !== undefined) {
        if (layer <= 0) {return obj;}
        layer--;
    }

    if (!isObject(obj)) {return obj;}

    if (obj instanceof Date) {return new Date(obj);}
    if (obj instanceof RegExp) {return new RegExp(obj);}
    if (obj instanceof Map) {return new Map(obj);}
    if (obj instanceof Set) {return new Set(obj);}

    if (Array.isArray(obj)) {
        return obj.map((i) => clone(i, layer));
    }

    const copy = Object.create(Object.getPrototypeOf(obj));
    for (const key of Reflect.ownKeys(obj)) {
        copy[key] = clone(obj[key], layer);
    }
    return copy;
}

export function compare(a, b) {
    if (a === b) {return true;}

    if (!isObject(a) || !isObject(b)) {return false;}

    const key_a = Object.keys(a);
    const key_b = Object.keys(b);
    if (key_a.length !== key_b.length) {return false;}
    
    for (const k of key_a) {
        if (!compare(a[k], b[k])) {return false;}
    }
    return true;
}

export function keyByValue(map, searchValue) {    
    for (const [key, value] of map.entries()) {
        if (compare(value, searchValue)) {return key;}
    }
    return undefined;
}

export function mapMap(map, func) {
    map.forEach((value, key) => {
        map.set(key, func(value));
    });
    return map;
}

export const limit = "limit";