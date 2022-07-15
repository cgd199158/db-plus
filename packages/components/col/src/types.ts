import type { ExtractPropTypes } from 'vue';

export const colProps = {
  span: {
    type: Number,
    default: 1,
  },
} as const;

export type ColProps = ExtractPropTypes<typeof colProps>;
