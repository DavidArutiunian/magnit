import _ from "lodash";

type TPrimitives = string | number | boolean | symbol;
type TIndexObject = { [key: string]: TPrimitives | TIndexObject | TIndexObject[] };
type TTraverseArg = TIndexObject | TIndexObject[] | TPrimitives;

type TCallback = (...args: any[]) => void | boolean;

export function traverse(object: any | any[], callback?: TCallback) {
    const cache: TTraverseArg[] = [];
    _traverse(object, callback, undefined, cache);
}

function _traverse(
    object: TTraverseArg,
    callback?: TCallback,
    parent?: TTraverseArg,
    cache?: TTraverseArg[],
): void {
    if (cache && cache.indexOf(object) !== -1) {
        return;
    }
    if (cache) {
        cache.push(object);
    }
    if (isArray(object)) {
        const result = callback && callback(object, parent);
        if (result) {
            return;
        }
        object.forEach(prop => _traverse(prop, callback, parent));
    } else if (isObject(object)) {
        const result = callback && callback(object, parent);
        if (result) {
            return;
        }
        for (const key in object) {
            if (key === "parent") {
                continue;
            }
            if (object.hasOwnProperty(key)) {
                _traverse(object[key], callback, object);
            }
        }
    } else {
        callback && callback(object, parent);
    }
}

function isArray(value: any): value is TIndexObject[] {
    return _.isArray(value);
}

function isObject(value: any): value is TIndexObject {
    return _.isObject(value);
}
