import { computed, unref } from 'vue';
import { configLocale, configZIndex } from '@db-plus/config';

import type { Ref, App } from 'vue';
import type { LocaleOptions } from '@db-plus/config';

type MaybeRef<T> = T | Ref<T>;

export interface InstallOptions {
  locale?: MaybeRef<LocaleOptions>;
  zIndex?: MaybeRef<number>;
}

export function buildInstall(components: any[] = [], defaultLocale?: 'zh-CN' | 'en-US') {
  return function install(app: App, options: InstallOptions = {}) {
    const { locale = { locale: defaultLocale }, zIndex } = options;

    const withDefaultLocale = computed(() => {
      return { locale: defaultLocale, ...unref(locale) };
    });

    configLocale(withDefaultLocale, app);

    if (typeof zIndex === 'number') {
      configZIndex(zIndex, app);
    }

    components.forEach((component) => {
      app.use(component);
    });
  };
}
