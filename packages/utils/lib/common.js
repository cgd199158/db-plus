"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = exports.getType = exports.range = exports.noop = exports.isEmpty = exports.isRegExp = exports.isDate = exports.isMap = exports.isSet = exports.isFunction = exports.isPromise = exports.isObject = exports.isArray = exports.isBigInt = exports.isSymbol = exports.isFalse = exports.isTrue = exports.isBoolean = exports.isString = exports.isNaN = exports.isNumber = exports.isNull = exports.isDefined = exports.has = exports.is = void 0;
const toString = Object.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;
function is(value, type) {
    return toString.call(value) === `[object ${type}]`;
}
exports.is = is;
function has(value, key) {
    return hasOwnProperty.call(value, key);
}
exports.has = has;
function isDefined(value) {
    return value !== undefined && value !== null;
}
exports.isDefined = isDefined;
function isNull(value) {
    return value === undefined || value === null;
}
exports.isNull = isNull;
function isNumber(value) {
    return typeof value === 'number';
}
exports.isNumber = isNumber;
function isNaN(value) {
    return Number.isNaN(value);
}
exports.isNaN = isNaN;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isBoolean(value) {
    return typeof value === 'boolean';
}
exports.isBoolean = isBoolean;
function isTrue(value) {
    return value === true;
}
exports.isTrue = isTrue;
function isFalse(value) {
    return value === false;
}
exports.isFalse = isFalse;
function isSymbol(value) {
    return typeof value === 'symbol';
}
exports.isSymbol = isSymbol;
function isBigInt(value) {
    return typeof value === 'bigint';
}
exports.isBigInt = isBigInt;
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
function isObject(value) {
    return is(value, 'Object');
}
exports.isObject = isObject;
function isPromise(value) {
    return (!!value &&
        typeof value.then === 'function' &&
        typeof value.catch === 'function');
}
exports.isPromise = isPromise;
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
function isSet(value) {
    return is(value, 'Set');
}
exports.isSet = isSet;
function isMap(value) {
    return is(value, 'Map');
}
exports.isMap = isMap;
function isDate(value) {
    return is(value, 'Date');
}
exports.isDate = isDate;
function isRegExp(value) {
    return is(value, 'RegExp');
}
exports.isRegExp = isRegExp;
function isEmpty(value) {
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
exports.isEmpty = isEmpty;
/* eslint-disable-next-line @typescript-eslint/no-empty-function */
function noop() { }
exports.noop = noop;
/**
 * 生成一个 range 数组
 *
 * @param size 大小
 * @param start 开始的数值，默认为 1
 * @param step 跨度，默认为 1
 */
function range(size, start = 1, step = 1) {
    const array = [];
    for (let i = 0; i < size; ++i) {
        array.push(start + i * step);
    }
    return array;
}
exports.range = range;
/**
 * 获取变量类型
 *
 * @param value 任意变量
 */
function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}
exports.getType = getType;
/**
 * 根据长度生成一串随机的字符串
 *
 * @param length 字符串的长度
 */
function randomString(length = 16) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const maxPos = chars.length;
    let string = '';
    while (length--) {
        string += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return string;
}
exports.randomString = randomString;
