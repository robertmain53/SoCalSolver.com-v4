import { r as defineEventHandler } from '../../../nitro/nitro.mjs';
import { readFileSync } from 'fs';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const analytics_get = defineEventHandler(() => {
  const path = join(process.cwd(), "server/analytics/analytics.json");
  const raw = readFileSync(path, "utf-8");
  return JSON.parse(raw);
});

export { analytics_get as default };
//# sourceMappingURL=analytics.get.mjs.map
