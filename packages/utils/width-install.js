export const widthInstall = (comp) => {
    comp.install = function (app) {
        app.component(comp.name, comp);
    };
    return comp;
};   comp.install = function (app) {
        app.component(comp.name, comp);
    };
    return comp;
};
exports.widthInstall = widthInstall;