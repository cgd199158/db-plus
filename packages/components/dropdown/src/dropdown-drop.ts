import { inject, provide, defineComponent } from 'vue';
import { DROPDOWN_STATE, SELECT_HANDLER } from './types';

export default defineComponent({
  functional: true,
  setup(props, { slots }) {
    const dropdownState = inject(DROPDOWN_STATE, null);

    provide(SELECT_HANDLER, dropdownState?.handleSelect);

    return () => slots.default?.() ?? null;
  },
});
