import { useNameHelper } from '@db-plus/config';
import { computed, defineComponent } from 'vue';
import { inputProps } from './types';
export default defineComponent({
  name: 'DbInput',
  props: inputProps,
  setup(props, { slots }) {
    const ns = useNameHelper('input');
    const className = [ns.b(), ns.be('vars')];

    const hasBefore = computed(() => {
      return props.before || slots.before;
    });

    const hasAfter = computed(() => {
      return props.after || slots.after;
    });

    return () => {
      return (
        <div class={className}>
          {hasBefore.value && (
            <div class={ns.be('before')}>{slots.before ? slots.before() : props.before}</div>
          )}
          <input type="text" />
          {hasAfter.value && (
            <div class={ns.be('after')}>{slots.after ? slots.after() : props.after}</div>
          )}
        </div>
      );
    };
  },
});
