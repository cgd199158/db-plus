import { MaybeRef } from '@db-plus/config';
import { noop } from '@db-plus/utils';
import { watch, unref, getCurrentScope, onScopeDispose } from 'vue';

// eslint-disable-next-line max-params
export function useListener<E = Event>(
  target: MaybeRef<EventTarget | null>,
  event: string,
  listener: (event: E) => any,
  // eslint-disable-next-line no-undef
  options?: AddEventListenerOptions | boolean,
) {
  if (!target) {
    return noop;
  }

  let remove = noop;

  const stopWatch = watch(
    () => unref(target),
    (el) => {
      remove();
      if (!el) return;

      el.addEventListener(event, listener as any, options);
      remove = () => {
        el.removeEventListener(event, listener as any, options);
        remove = noop();
      };
    },
  );

  const stop = () => () => {
    stopWatch();
    remove();
  };

  getCurrentScope() && onScopeDispose(stop);

  return stop;
}
