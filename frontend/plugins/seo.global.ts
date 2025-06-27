import { defineNuxtPlugin } from '#app'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:rendered', () => {
    const route = useRoute()
    const lang = route.params.lang || 'en'
    const slug = route.params.slug
    if (!slug) return

    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const canonicalUrl = `https://yourdomain.com/${lang}/${slug}`

    useHead({
      link: [
        { rel: 'canonical', href: canonicalUrl },
        { rel: 'alternate', hreflang: lang, href: canonicalUrl }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": `${title} Calculator`,
            "applicationCategory": "EducationApplication",
            "operatingSystem": "All",
            "url": canonicalUrl,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "258"
            }
          })
        }
      ]
    })
  })
})