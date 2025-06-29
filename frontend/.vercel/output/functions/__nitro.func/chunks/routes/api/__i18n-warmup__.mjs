import { r as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const __i18nWarmup__ = defineEventHandler(async (event) => {
  const { $i18n } = useNuxtApp();
  try {
    const locales = ($i18n == null ? void 0 : $i18n.availableLocales) || [];
    for (const locale of locales) {
      const messages = $i18n.getLocaleMessage(locale);
      if (messages) {
        void messages["__init__"] || null;
      }
    }
    return { status: "ok", hydrated: locales };
  } catch (e) {
    return { status: "error", error: e.message };
  }
});

export { __i18nWarmup__ as default };
//# sourceMappingURL=__i18n-warmup__.mjs.map
