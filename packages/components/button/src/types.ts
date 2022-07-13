import { sizeProp } from '@db-plus/config/src/props';
import type { ExtractPropTypes, PropType } from 'vue';

export type ButtonType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';

export const buttonProps = {
  size: sizeProp,
  type: String as PropType<ButtonType>,
  disabled: Boolean,
  icon: String,
  color: String,
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
