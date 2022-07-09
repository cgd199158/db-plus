"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.widthInstall = void 0;
const widthInstall = (comp) => {
    comp.install = function (app) {
        app.component(comp.name, comp);
    };
    return comp;
};
exports.widthInstall = widthInstall;