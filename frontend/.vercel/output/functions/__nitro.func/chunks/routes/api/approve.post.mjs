import { d as defineEventHandler, c as checkAuth, a as createError, r as readBody } from '../../nitro/nitro.mjs';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import 'jsonwebtoken';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';

const approve_post = defineEventHandler(async (event) => {
  await checkAuth(event);
  if (event.context.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Forbidden" });
  }
  const body = await readBody(event);
  const { slug, lang } = body;
  const improvedPath = join(process.cwd(), "content-improved", `${slug}.${lang}.md`);
  const originalPath = join(process.cwd(), "content", lang, `${slug}.${lang}.md`);
  const improved = readFileSync(improvedPath, "utf-8");
  writeFileSync(originalPath, improved, "utf-8");
  return { approved: true, slug, lang };
});

export { approve_post as default };
//# sourceMappingURL=approve.post.mjs.map
