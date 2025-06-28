export default defineNuxtPlugin({
  // Run this plugin after i18n is initialized
  enforce: 'post',  // (We'll explain enforce: 'post' below)
  setup(nuxtApp) {
    if (process.server) {
      const i18nInstance = nuxtApp.$i18n;  // global i18n instance
      const locales = i18nInstance.availableLocales || [];
      // Touch translation keys to force internal hydration
      for (const locale of locales) {
        try {
          const messages = i18nInstance.getLocaleMessage(locale);
          if (messages) {
            // Access a dummy key to trigger hydration
            void messages['__init__'] || null;
          }
        } catch (e) {
          console.warn(`[i18n preload] Failed to access messages for ${locale}`, e);
        }
      }
    }
  }
});
