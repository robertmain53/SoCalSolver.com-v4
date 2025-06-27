export default defineEventHandler(async (event) => {
    const { $i18n } = useNuxtApp();
  
    try {
      const locales = $i18n?.availableLocales || [];
  
      for (const locale of locales) {
        const messages = $i18n.getLocaleMessage(locale);
        if (messages) {
          void messages['__init__'] || null;
        }
      }
  
      return { status: 'ok', hydrated: locales };
    } catch (e) {
      return { status: 'error', error: e.message };
    }
  });
  