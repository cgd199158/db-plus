const toString = Object.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function is(value, type) {
    return toString.call(value) === `[object ${type}]`;
}
export function has(value, key) {
    return hasOwnProperty.call(value, key);
}
export function isDefined(value) {
    return value !== undefined && value !== null;
}
export function isNull(value) {
    return value === undefined || value === null;
}
export function isNumber(value) {
    return typeof value === 'number';
}
export function isNaN(value) {
    return Number.isNaN(value);
}
export function isString(value) {
    return typeof value === 'string';
}
export function isBoolean(value) {
    return typeof value === 'boolean';
}
export function isTrue(value) {
    return value === true;
}
export function isFalse(value) {
    return value === false;
}
export function isSymbol(value) {
    return typeof value === 'symbol';
}
export function isBigInt(value) {
    return typeof value === 'bigint';
}
export function isArray(value) {
    return Array.isArray(value);
}
export function isObject(value) {
    return is(value, 'Object');
}
export function isPromise(value) {
    return (!!value &&
        typeof value.then === 'function' &&
        typeof value.catch === 'function');
}
export function isFunction(value) {
    return typeof value === 'function';
}
export function isSet(value) {
    return is(value, 'Set');
}
export function isMap(value) {
    return is(value, 'Map');
}
export function isDate(value) {
    return is(value, 'Date');
}
export function isRegExp(value) {
    return is(value, 'RegExp');
}
export function isEmpty(value) {
    if (Array.isArray(value) || typeof value === 'string') {
        return value.length === 0;
    }
    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }
    if (isObject(value)) {
        return Object.keys(value).length === 0;
    }
    return false;
}
/* eslint-disable-next-line @typescript-eslint/no-empty-function */
export function noop() { }
/**
 * 生成一个 range 数组
 *
 * @param size 大小
 * @param start 开始的数值，默认为 1
 * @param step 跨度，默认为 1
 */
export function range(size, start = 1, step = 1) {
    const array = [];
    for (let i = 0; i < size; ++i) {
        array.push(start + i * step);
    }
    return array;
}
/**
 * 获取变量类型
 *
 * @param value 任意变量
 */
export function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}
/**
 * 根据长度生成一串随机的字符串
 *
 * @param length 字符串的长度
 */
export function randomString(length = 16) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const maxPos = chars.length;
    let string = '';
    while (length--) {
        string += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return string;
}
