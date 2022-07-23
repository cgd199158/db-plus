import { CSSProperties } from 'vue';
import type { ExtractPropTypes, PropType } from 'vue';
export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual';
export type FollowerPlacement = 'top' | 'right' | 'left' | 'bottom';
export type MaybeArray<T> = T | T[];

export const popoverProps = {
  show: Boolean,
  defaultShow: Boolean,
  showArrow: {
    type: Boolean,
    default: true,
  },
  trigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'hover',
  },
  dely: {
    type: Number,
    default: 100,
  },
  duration: {
    type: Number,
    default: 100,
  },
  raw: Boolean,
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'top',
  },
  x: Number,
  y: Number,
  arrowPointToCenter: Boolean,
  disabled: Boolean,
  displatyDirective: {
    type: String as PropType<'if' | 'show'>,
    default: 'if',
  },
  arrowStyle: [String, Object] as PropType<string | CSSProperties>,
  // 翻转
  flip: {
    type: Boolean,
    default: true,
  },
  animated: {
    type: Boolean,
    defualt: true,
  },
  width: {
    type: [Number, String] as PropType<number | 'trigger'>,
    default: undefined,
  },
  overlap: Boolean,
  keepAliveOnHover: {
    type: Boolean,
    default: true,
  },
  zIndex: Number,
  to: {
    type: [String, Object] as PropType<string | null | Element>,
  },
  scrollable: Boolean,
  contentStyle: [Object, String] as PropType<string | CSSProperties>,
  headerStyle: [Object, String] as PropType<string | CSSProperties>,
  footerStyle: [Object, String] as PropType<string | CSSProperties>,
  // events
  onClickoutside: Function as PropType<(e: MouseEvent) => void>,
  'onUpdate:show': [Function, Array] as PropType<MaybeArray<(value: boolean) => void>>,
  onHide: [Function, Array] as PropType<MaybeArray<(value: boolean) => void>>,
  arrow: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  minWidth: Number,
  maxWidth: Number,
};

export type PopoverProps = ExtractPropTypes<typeof popoverProps>;
