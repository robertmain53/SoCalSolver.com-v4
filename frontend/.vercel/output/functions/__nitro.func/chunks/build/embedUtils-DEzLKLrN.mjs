function generateEmbedIframe(baseUrl, lang, slug, state) {
  const stateParam = encodeURIComponent(JSON.stringify(state));
  const embedUrl = `${baseUrl}/${lang}/${slug}?state=${stateParam}`;
  return `<iframe src="${embedUrl}" width="100%" height="600" frameborder="0" style="border:1px solid #ccc;"></iframe>`;
}

export { generateEmbedIframe };
//# sourceMappingURL=embedUtils-DEzLKLrN.mjs.map
