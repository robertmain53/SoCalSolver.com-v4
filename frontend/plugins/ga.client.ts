export default defineNuxtPlugin(() => {
  const { public: { gtagId, googleAnalyticsId } } = useRuntimeConfig();
  const analyticsId = gtagId || googleAnalyticsId;
  if (!analyticsId) return;

  // Google Analytics dataLayer and gtag setup
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag() {
    (window as any).dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', analyticsId);

  // Inject Google Analytics script into <head>
  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`,
        async: true
      }
    ]
  });
});
