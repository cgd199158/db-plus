"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = void 0;
/**
 * 深度拷贝对象或数组 (避免一层死循环)
 *
 * @param obj 需要拷贝的对象或数组
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const _root = (Array.isArray(obj) ? [] : {});
    // 循环数组栈
    const loopList = [
        {
            parent: _root,
            key: undefined,
            data: obj
        }
    ];
    while (loopList.length) {
        // 先入后出，深度优先
        const node = loopList.pop();
        const { parent, key, data } = node;
        const type = Array.isArray(data) ? 'array' : 'object';
        if (!parent)
            continue;
        // 初始化克隆对象_root
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = type === 'array' ? [] : {};
        }
        Object.keys(data).forEach(i => {
            const _data = data[i];
            // 避免一层死循环
            if (_data === data) {
                res[i] = res;
            }
            else if (_data !== null && typeof _data === 'object') {
                loopList.push({
                    parent: res,
                    key: i,
                    data: _data
                });
            }
            else {
                res[i] = _data;
            }
        });
    }
    return _root;
}
exports.deepClone = deepClone;
