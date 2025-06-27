import { defineNuxtPlugin } from '#app'
export default defineNuxtPlugin(() => {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "CalcHub",
          "url": "https://yourdomain.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://yourdomain.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })
      }
    ]
  })
})
