import type { ExtractPropTypes } from 'vue';

export const inputProps = {
  placeholder: {
    type: String,
    default: '请输入',
  },
  before: {
    type: String,
    default: '',
  },
  after: {
    type: String,
    default: '',
  },
};

export type InputProps = ExtractPropTypes<typeof inputProps>;
