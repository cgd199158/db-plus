// ExtractPropTypes 自定处理props的类型
import type { ExtractPropTypes } from 'vue';

export const iconProps = {
  size: {
    type: Number,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
} as const;

export type IconProps = ExtractPropTypes<typeof iconProps>;
