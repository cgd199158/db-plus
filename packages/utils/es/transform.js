import { isDefined, isObject, isFunction } from './common';
import { deepClone } from './deep-clone';
/**
 * 根据数组元素中某个或多个属性的值转换为映射
 *
 * @param list 需要被转换的数组
 * @param prop 需要被转换的属性或提供一个读取方法
 * @param accessor 映射的值的读取方法，默认返回元素本身
 */
export function transformListToMap(list, prop, accessor = v => v) {
    const map = {};
    if (!isDefined(prop))
        return map;
    const propAccessor = isFunction(prop) ? prop : (item) => item[prop];
    list.forEach(item => {
        const key = propAccessor(item);
        if (isDefined(key)) {
            map[key] = accessor(item);
        }
    });
    return map;
}
/**
 * 移除数组中的某个元素
 *
 * @param array 需要被移除元素的数组
 * @param item 需要被移除的元素, 或一个查找方法，如果元素为函数时则需要做一层简单包装
 * @param isFn 标记数组的元素是否为函数
 */
export function removeArrayItem(array, item, isFn = false) {
    let index = -1;
    if (isFn || typeof item !== 'function') {
        index = array.findIndex(current => current === item);
    }
    else {
        index = array.findIndex(item);
    }
    if (~index) {
        return array.splice(index, 1)[0];
    }
    return null;
}
/**
 * 按照一定顺序的属性对数据进行分组
 *
 * @param list 需要分数的数据
 * @param props 需要按顺序分组的属性
 */
export function groupByProps(list, props = []) {
    if (typeof props === 'string' || typeof props === 'function') {
        props = [props];
    }
    const propCount = props.length;
    const zipData = {};
    for (const item of list) {
        let data;
        for (let i = 0; i < propCount; ++i) {
            const isLast = i === propCount - 1;
            const prop = props[i];
            const value = typeof prop === 'function' ? prop(item) : item[prop];
            if (!data) {
                if (!zipData[value]) {
                    zipData[value] = isLast ? [] : {};
                }
                data = zipData[value];
            }
            else {
                if (!data[value]) {
                    data[value] = isLast ? [] : {};
                }
                data = data[value];
            }
        }
        data.push(item);
    }
    return zipData;
}
/**
 * 转换扁平结构为树形结构
 *
 * @param list 需要转换的扁平数据
 * @param options 转化配置项
 */
export function transformTree(list, options = {}) {
    const { keyField = 'id', childField = 'children', parentField = 'parent', rootId = null } = options;
    const hasRootId = isDefined(rootId) && rootId !== '';
    const tree = [];
    const record = new Map();
    for (let i = 0, len = list.length; i < len; ++i) {
        const item = list[i];
        const id = item[keyField];
        if (hasRootId ? id === rootId : !id) {
            continue;
        }
        if (record.has(id)) {
            item[childField] = record.get(id);
        }
        else {
            item[childField] = [];
            record.set(id, item[childField]);
        }
        if (item[parentField] && (!hasRootId || item[parentField] !== rootId)) {
            const parentId = item[parentField];
            if (!record.has(parentId)) {
                record.set(parentId, []);
            }
            record.get(parentId).push(item);
        }
        else {
            tree.push(item);
        }
    }
    return tree;
}
/**
 * 转换树形结构为扁平结构
 *
 * @param tree 需要转换的树形数据
 * @param options 转化配置项
 */
export function flatTree(tree, options = {}) {
    const { keyField = 'id', childField = 'children', parentField = 'parent', rootId = null } = options;
    const hasRootId = isDefined(rootId) && rootId !== '';
    const list = [];
    const loop = [...tree];
    let idCount = 1;
    while (loop.length) {
        const item = loop.shift();
        let children = [];
        const childrenValue = item[childField];
        if (Array.isArray(childrenValue) && childrenValue.length) {
            children = childrenValue;
        }
        if (!item[keyField]) {
            item[keyField] = idCount++;
        }
        const id = item[keyField];
        if (hasRootId ? item[parentField] === rootId : !item[parentField]) {
            item[parentField] = rootId;
        }
        for (let i = 0, len = children.length; i < len; ++i) {
            const child = children[i];
            child[parentField] = id;
            loop.push(child);
        }
        list.push(item);
    }
    return list;
}
const defaultSortMethod = (prev, next) => {
    if (Number.isNaN(Number(prev) - Number(next))) {
        return String(prev).localeCompare(next);
    }
    return prev - next;
};
/**
 * 根据依赖的属性逐层排序
 *
 * @param list 需要排序的数组
 * @param props 排序依赖的属性 key-属性名 method-排序方法 accessor-数据获取方法 type-升降序
 */
export function sortByProps(list, props) {
    if (!list.sort ||
        (isObject(props) && !props.key) ||
        !props.length) {
        return list;
    }
    const sortedList = Array.from(list);
    if (!Array.isArray(props)) {
        props = [props];
    }
    const formattedProps = props
        .map(value => (typeof value === 'string'
        ? {
            key: value,
            method: defaultSortMethod,
            type: 'asc'
        }
        : value))
        .map(value => {
        if (typeof value.accessor !== 'function') {
            value.accessor = (data) => data[value.key];
        }
        if (typeof value.method !== 'function') {
            value.method = defaultSortMethod;
        }
        value.params = Array.isArray(value.params) ? value.params : [];
        return value;
    });
    sortedList.sort((prev, next) => {
        let lastResult = 0;
        for (const prop of formattedProps) {
            const { method, type, accessor, params } = prop;
            const desc = type === 'desc';
            const result = method(accessor(prev, ...params), accessor(next, ...params));
            lastResult = desc ? -result : result;
            // 若不为0则无需进行下一层排序
            if (lastResult)
                break;
        }
        return lastResult;
    });
    return sortedList;
}
/**
 * 将两个对象进行深度的动态合并
 *
 * @param sourceObj 用于接收合并的源对象
 * @param targetObj 被合并的对象，当属性名相同但值类型不同的情况，此对象的权重更高
 * @param isNewObj 标记合并至一个全新的对象（深度的）
 */
export function mergeObjects(sourceObj, targetObj, isNewObj = true) {
    sourceObj = isNewObj ? deepClone(sourceObj) : sourceObj;
    const loop = [
        {
            source: sourceObj,
            target: targetObj
        }
    ];
    while (loop.length) {
        const { source, target } = loop.pop();
        Object.keys(target).forEach(key => {
            if (isObject(target[key])) {
                if (!isObject(source[key])) {
                    source[key] = {};
                }
                loop.push({
                    source: source[key],
                    target: target[key]
                });
            }
            else if (Array.isArray(target[key])) {
                if (!Array.isArray(source[key])) {
                    source[key] = [];
                }
                loop.push({
                    source: source[key],
                    target: target[key]
                });
            }
            else {
                source[key] = target[key];
            }
        });
    }
    return sourceObj;
}
