import { d as defineEventHandler, r as readBody } from '../../nitro/nitro.mjs';
import { readFileSync } from 'fs';
import { join } from 'path';
import { diffLines } from 'diff';
import 'jsonwebtoken';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';

const review_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { slug, lang } = body;
  const currentPath = join(process.cwd(), "content", lang, `${slug}.${lang}.md`);
  const improvedPath = join(process.cwd(), "content-improved", `${slug}.${lang}.md`);
  const current = readFileSync(currentPath, "utf-8");
  const improved = readFileSync(improvedPath, "utf-8");
  const diff = diffLines(current, improved);
  return {
    slug,
    lang,
    diff
  };
});

export { review_post as default };
//# sourceMappingURL=review.post.mjs.map
