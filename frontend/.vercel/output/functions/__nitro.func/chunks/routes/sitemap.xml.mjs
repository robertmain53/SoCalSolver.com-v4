import { r as defineEventHandler } from '../nitro/nitro.mjs';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const sitemap_xml = defineEventHandler(() => {
  const contentPath = join(process.cwd(), "content");
  const langs = readdirSync(contentPath);
  const urls = /* @__PURE__ */ new Set();
  langs.forEach((lang) => {
    const files = readdirSync(join(contentPath, lang));
    files.forEach((file) => {
      if (!file.endsWith(".md")) return;
      const slug = file.replace(/\.[a-z]{2}\.md$/, "");
      const path = `/${lang}/${slug}`;
      urls.add(path);
      urls.add(`/embed/${slug}`);
      const raw = readFileSync(join(contentPath, lang, file), "utf-8");
      const authorMatch = raw.match(/author: *(\w+)/i);
      if (authorMatch) {
        urls.add(`/authors/${authorMatch[1]}`);
      }
    });
  });
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(urls).map((u) => `<url><loc>https://www.socalsolver.com${u}</loc></url>`).join("\n")}
</urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
});

export { sitemap_xml as default };
//# sourceMappingURL=sitemap.xml.mjs.map
