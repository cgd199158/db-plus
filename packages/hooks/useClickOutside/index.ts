import { getCurrentScope, onScopeDispose, Ref, ref, unref, watch } from 'vue';
import { noop, observe, TransferNode, disconnect } from '@db-plus/utils';
import { useListener } from '../useListener';

export const CLICK_OUTSIDE = 'clickoutside';

export function useClickOutside(handler: () => void, target: Ref<HTMLElement | null> = ref(null)) {
  let remove = noop;

  const stopWatch = watch(
    () => unref(target),
    (el) => {
      remove();

      if (!el) return;

      observe(target.value as TransferNode, CLICK_OUTSIDE);

      remove = () => {
        disconnect(target.value as TransferNode, CLICK_OUTSIDE);
        remove = noop;
      };
    },
    { immediate: true, flush: 'post' },
  );

  const stop = () => {
    stopWatch();
    remove();
  };

  getCurrentScope() && onScopeDispose(stop);
  useListener(target, CLICK_OUTSIDE, handler);

  return target;
}
