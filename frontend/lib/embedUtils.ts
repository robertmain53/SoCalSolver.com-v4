export function generateEmbedIframe(
  baseUrl: string,
  lang: string,
  slug: string,
  state: object
) {
  const stateParam = encodeURIComponent(JSON.stringify(state))
  const embedUrl = `${baseUrl}/${lang}/${slug}?state=${stateParam}`

  return `<iframe src="${embedUrl}" width="100%" height="600" frameborder="0" style="border:1px solid #ccc;"></iframe>`
}
