"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCapitalCase = void 0;
// 全大写命名
function toCapitalCase(value) {
    return (value.charAt(0).toUpperCase() +
        value.slice(1).replace(/-([a-z])/g, (_, char) => (char ? char.toUpperCase() : '')));
}
exports.toCapitalCase = toCapitalCase;
