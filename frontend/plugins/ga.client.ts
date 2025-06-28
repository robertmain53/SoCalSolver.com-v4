import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  useHead({
    script: [
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
      },
      {
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `
      }
    ]
  })
})