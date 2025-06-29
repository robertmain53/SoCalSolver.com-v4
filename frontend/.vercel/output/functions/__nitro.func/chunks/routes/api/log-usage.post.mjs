import { r as defineEventHandler, U as readBody, D as getRequestIP } from '../../nitro/nitro.mjs';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const logUsage_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const logDir = join(process.cwd(), "logs");
  const logPath = join(logDir, "usage-log.json");
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
    slug: body.slug,
    lang: body.lang,
    ip: getRequestIP(event)
  };
  existing.push(entry);
  writeFileSync(logPath, JSON.stringify(existing, null, 2));
  return { success: true };
});

export { logUsage_post as default };
//# sourceMappingURL=log-usage.post.mjs.map
