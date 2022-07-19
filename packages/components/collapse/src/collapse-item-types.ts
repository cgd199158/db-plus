import type { ExtractPropTypes, PropType } from 'vue';

export const collapseItemProps = {
  name: {
    type: [String, Number],
  },
  title: {
    type: String,
  },
  arrowType: {
    type: String as PropType<'left' | 'right' | 'none'>,
    default: 'right',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
};

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>;
