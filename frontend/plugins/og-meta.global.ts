import { defineNuxtPlugin } from '#app'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:rendered', () => {
    const route = useRoute()
    const lang = route.params.lang || 'en'
    const slug = route.params.slug
    if (!slug) return

    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const fullUrl = `https://yourdomain.com/${lang}/${slug}`
    const ogImage = `https://yourdomain.com/api/og-image?title=${encodeURIComponent(title)}&lang=${lang}`

    useHead({
      meta: [
        { property: 'og:title', content: `${title} Calculator` },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: fullUrl },
        { property: 'og:image', content: ogImage },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: ogImage }
      ]
    })
  })
})