import { PropType } from 'vue';
import type { ExtractPropTypes } from 'vue';

export type textPositionTypes = 'left' | 'center' | 'right';

export const dividerProps = {
  vertical: {
    type: Boolean,
    default: false,
  },
  dashed: {
    type: Boolean,
    default: false,
  },
  textPosition: {
    type: String as PropType<textPositionTypes>,
    default: 'center',
  },
} as const;

export type DividerPorps = ExtractPropTypes<typeof dividerProps>;
