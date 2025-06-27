export function generateEmbedCode(slug: string, lang: string, state: Record<string, any> = {}) {
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://www.calchub.xyz'
    : 'http://localhost:3000'

  const stateParam = encodeURIComponent(JSON.stringify(state))
  const embedUrl = `${baseUrl}/${lang}/${slug}?state=${stateParam}`

  return \`<iframe src="\${embedUrl}" width="100%" height="600" frameborder="0" style="border:1px solid #ccc;"></iframe>\`
}