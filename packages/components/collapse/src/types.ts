import type { PropType, Ref, ExtractPropTypes, InjectionKey } from 'vue';
export type CollapseArrowType = 'right' | 'left' | 'none';

export const collapseProps = {
  modelValue: {
    type: [String, Array],
  },
  // 手风琴
  accordion: {
    type: Boolean,
    default: true,
  },
  // 默认全部展开
  expanded: {
    type: Boolean,
    default: false,
  },
  // 展示形式 default: 默认形式, card: 卡片形式
  type: {
    type: String as PropType<'card' | 'default'>,
    default: 'default',
  },
  arrowType: {
    type: String as PropType<CollapseArrowType>,
    default: 'right',
  },
};

export type CollapseProps = ExtractPropTypes<typeof collapseProps>;

export interface CollapseState {
  arrowType: CollapseArrowType;
  registerPane: (label: string | number, paneExpanded: Ref<boolean>) => void;
  unregisterPane: (label: string | number) => void;
  expandPane: (label: string | number, expanded: boolean) => void;
}
export const COLLAPSE_STATE: InjectionKey<CollapseState> = Symbol('COLLAPSE_STATE');
