import { r as defineEventHandler, U as readBody } from '../../nitro/nitro.mjs';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const translationSuggest_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const logDir = join(process.cwd(), "logs");
  const logPath = join(logDir, "translation-suggestions.json");
  if (!existsSync(logDir)) mkdirSync(logDir);
  let existing = [];
  if (existsSync(logPath)) {
    try {
      existing = JSON.parse(readFileSync(logPath, "utf8"));
    } catch {
    }
  }
  const entry = {
    time: (/* @__PURE__ */ new Date()).toISOString(),
    field: body.field,
    text: body.text,
    name: body.name || "anonymous",
    page: body.page,
    lang: body.lang
  };
  existing.push(entry);
  writeFileSync(logPath, JSON.stringify(existing, null, 2));
  return { success: true };
});

export { translationSuggest_post as default };
//# sourceMappingURL=translation-suggest.post.mjs.map
