import type { ExtractPropTypes } from 'vue';
import { PropType } from 'vue';

export const rowProps = {
  columns: {
    type: Number,
    default: 24,
  },
  gutter: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 10,
  },
} as const;

export type RowProps = ExtractPropTypes<typeof rowProps>;
