export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const analyticsId = runtimeConfig.public.gtagId || runtimeConfig.public.googleAnalyticsId;
  if (!analyticsId) return;

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`,
        async: true,
      },
      {
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticsId}');
        `,
      },
    ],
  });
});
