export default defineNuxtConfig({
 
  nitro: {
    preset: 'vercel',
    compatibilityDate: '2025-07-02'
  },
  
  plugins: [
    '~/plugins/markdown-it-challenge',
    '~/plugins/markdown-it-explain',
    '~/plugins/markdown-it-meta-tags'
  ],

  routeRules: {
    '/admin/**': { middleware: 'protectedAuth' },
  },
  
  ssr: true,

  css: [
    '~/assets/css/main.css'
  ],

  modules: [
   '@nuxt/ui',
   '@nuxt/content',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    "@sidebase/nuxt-auth"
  ],

  i18n: {
    strategy: 'prefix',
    defaultLocale: 'en',
    lazy: false,
    locales: [
      { code: 'en', name: 'English' },
      { code: 'it', name: 'Italiano' },
      { code: 'fr', name: 'Français' }
    ],
    detectBrowserLanguage: false
  },

  app: {
    head: {
      link: [
        {
          rel: 'alternate',
          hreflang: 'en',
          href: 'https://example.com/en'
        },
        {
          rel: 'alternate',
          hreflang: 'it',
          href: 'https://example.com/it'
        },
        {
          rel: 'alternate',
          hreflang: 'fr',
          href: 'https://example.com/fr'
        },
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: 'https://example.com'
        }
      ]
    }
  }
})