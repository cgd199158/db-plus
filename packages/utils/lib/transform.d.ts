/**
 * 根据数组元素中某个或多个属性的值转换为映射
 *
 * @param list 需要被转换的数组
 * @param prop 需要被转换的属性或提供一个读取方法
 * @param accessor 映射的值的读取方法，默认返回元素本身
 */
export declare function transformListToMap<T = any, K = T>(list: T[], prop: keyof T | ((item: T) => any), accessor?: (item: T) => K): Record<string, K>;
/**
 * 移除数组中的某个元素
 *
 * @param array 需要被移除元素的数组
 * @param item 需要被移除的元素, 或一个查找方法，如果元素为函数时则需要做一层简单包装
 * @param isFn 标记数组的元素是否为函数
 */
export declare function removeArrayItem<T = any>(array: T[], item: T | ((item: T) => boolean), isFn?: boolean): T | null;
/**
 * 按照一定顺序的属性对数据进行分组
 *
 * @param list 需要分数的数据
 * @param props 需要按顺序分组的属性
 */
export declare function groupByProps<T = any>(list: T[], props?: Array<string | ((item: T) => any)> | string | ((item: T) => any)): Record<string, T[]>;
export interface TreeOptions<T = string> {
    keyField?: T;
    childField?: T;
    parentField?: T;
    rootId?: any;
}
/**
 * 转换扁平结构为树形结构
 *
 * @param list 需要转换的扁平数据
 * @param options 转化配置项
 */
export declare function transformTree<T = any>(list: T[], options?: TreeOptions<keyof T>): T[];
/**
 * 转换树形结构为扁平结构
 *
 * @param tree 需要转换的树形数据
 * @param options 转化配置项
 */
export declare function flatTree<T = any>(tree: T[], options?: TreeOptions<keyof T>): T[];
export interface SortOptions<T = string> {
    key: T;
    method?: (prev: any, next: any) => number;
    accessor?: (...args: any[]) => any;
    type?: 'asc' | 'desc';
    params?: any[];
}
/**
 * 根据依赖的属性逐层排序
 *
 * @param list 需要排序的数组
 * @param props 排序依赖的属性 key-属性名 method-排序方法 accessor-数据获取方法 type-升降序
 */
export declare function sortByProps<T = any>(list: T[], props: keyof T | SortOptions<keyof T> | (keyof T | SortOptions<keyof T>)[]): T[];
/**
 * 将两个对象进行深度的动态合并
 *
 * @param sourceObj 用于接收合并的源对象
 * @param targetObj 被合并的对象，当属性名相同但值类型不同的情况，此对象的权重更高
 * @param isNewObj 标记合并至一个全新的对象（深度的）
 */
export declare function mergeObjects<T extends Record<string, any>, U extends Record<string, any>>(sourceObj: T, targetObj: U, isNewObj?: boolean): T & U;
