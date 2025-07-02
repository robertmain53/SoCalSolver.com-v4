import { d as defineEventHandler, r as readBody, a as createError } from '../../../nitro/nitro.mjs';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import 'jsonwebtoken';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';

const saveSection_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { slug, locale = "en", section, content } = body;
  if (!slug || !section || !content) {
    throw createError({ statusCode: 400, statusMessage: "Missing slug, section or content" });
  }
  const filePath = join(process.cwd(), "content", locale, slug + ".md");
  const raw = await readFile(filePath, "utf-8");
  const pattern = new RegExp(`:::${section}[\\s\\S]*?:::`, "g");
  const updated = raw.replace(pattern, content);
  await writeFile(filePath, updated, "utf-8");
  return { success: true };
});

export { saveSection_post as default };
//# sourceMappingURL=save-section.post.mjs.map
