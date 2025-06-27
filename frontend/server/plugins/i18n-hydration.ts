import { defineNuxtPlugin } from '#app'
export default defineNuxtPlugin(() => {
    if (process.server) {
      const i18n = useI18n();
  
      const locales = i18n.availableLocales || [];
  
      // Touch translation keys to force internal hydration
      for (const locale of locales) {
        try {
          const messages = i18n.getLocaleMessage(locale);
          // Access a dummy key to trigger hydration
          if (messages) {
            void messages['__init__'] || null;
          }
        } catch (e) {
          console.warn(`[i18n preload] Failed to access messages for ${locale}`, e);
        }
      }
    }
  });
  