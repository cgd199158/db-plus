import { PropType } from 'vue';

export type PropsOptions = Record<string, Record<string, unknown>>;

export type ComponentSize = 'small' | 'default' | 'large';
export const sizeProp = String as PropType<ComponentSize>;
