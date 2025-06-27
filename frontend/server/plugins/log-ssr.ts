import { defineNitroPlugin } from '#imports';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', async (event) => {
    const url = event.path;
    const headers = event.node?.req?.headers || {};
    let cookies = headers.cookie || '';
    // Log basic request info
    console.log('[SSR LOG] Incoming request:', {
      url,
      headers,
      cookies,
    });

    // Try to log Nuxt/i18n state if available
    try {
      // These are only available in Nuxt context, so we must use dynamic import
      const { useNuxtApp, useI18n, useRoute } = await import('#imports');
      const nuxtApp = useNuxtApp();
      let locale = null;
      let route = null;
      try {
        locale = useI18n().locale.value;
      } catch (e) {
        locale = 'unavailable';
      }
      try {
        route = useRoute().fullPath;
      } catch (e) {
        route = 'unavailable';
      }
      console.log('[SSR LOG] Nuxt SSR state:', {
        locale,
        route,
      });
    } catch (e) {
      console.log('[SSR LOG] Could not access Nuxt SSR state:', e);
    }
  });
});
