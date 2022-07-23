import { classProp, Placement, eventProp } from '@db-plus/config';
import type { InjectionKey, PropType } from 'vue';
import type { ExtractPropTypes } from 'vue';

export type SelectHandler = (
  labels: (string | number)[],
  metas: Array<Record<string, any>>,
) => void;

export interface DropdownState {
  handleSelect: SelectHandler;
  handleTriggerEnter: () => void;
  handleTriggerLeave: () => void;
}

export const DROPDOWN_STATE: InjectionKey<DropdownState> = Symbol('DROPDOWN_STATE');
export const SELECT_HANDLER: InjectionKey<SelectHandler> = Symbol('SELECT_HANDLER');

export type DropdownTrigger = 'hover' | 'click' | 'custom';

export const dropdownProps = {
  visible: Boolean,
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom',
  },
  outsideClose: Boolean,
  trigger: {
    type: String as PropType<DropdownTrigger>,
    default: 'hover',
  },
  label: [String, Number],
  transitionName: {
    type: String,
    default: 'db-drop',
  },
  transfer: [Boolean, String],
  dropClass: classProp,
  appear: Boolean,
  meta: Object as PropType<Record<string, any>>,
  onToggle: eventProp<(visible: boolean) => void>(),
  onSelect: eventProp<(labels: (string | number)[], metas: Array<Record<string, any>>) => void>(),
  onClickOutside: eventProp(),
  onOutsideClose: eventProp(),
};

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>;
