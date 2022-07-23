import type { CSSProperties, PropType, Ref } from 'vue';

export type MaybeArrayDeep<T> = T | MaybeArrayDeep<T>[];
export type MaybeRef<T> = Ref<T> | T;
export type MaybeArray<T> = T | T[];
export type MaybeRefRecord<T> = {
  [K in keyof T]: MaybeRef<T[K]>;
};

export type PropsOptions = Record<string, Record<string, unknown>>;
export type ClassType = MaybeArrayDeep<string | { [x: string]: ClassType }>;
export type StyleType = MaybeArrayDeep<string | CSSProperties>;

export type ComponentSize = 'small' | 'default' | 'large';
export const sizeProp = String as PropType<ComponentSize>;
export const classProp = [String, Object, Array] as PropType<ClassType>;
export const styleProp = [String, Object, Array] as PropType<StyleType>;

type AnyFunction = (...args: any[]) => any;
type VoidFunction = () => void;

const eventTypes = [Function, Array];

export function eventProp<F extends AnyFunction = VoidFunction>() {
  return eventTypes as PropType<MaybeArray<F>>;
}

export type Placement =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export function emitEvent<A extends any[]>(handlers: MaybeArray<(...args: A) => void>, ...args: A) {
  if (Array.isArray(handlers)) {
    for (let i = 0, len = handlers.length; i < len; ++i) {
      const handler = handlers[i];
      typeof handler === 'function' && handlers[i](...args);
    }
  } else {
    typeof handlers === 'function' && handlers(...args);
  }
}
