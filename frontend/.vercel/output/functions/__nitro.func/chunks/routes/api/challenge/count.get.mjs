import { r as defineEventHandler } from '../../../nitro/nitro.mjs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const count_get = defineEventHandler(async () => {
  const file = join(process.cwd(), "server/data/challenges.json");
  const raw = await readFile(file, "utf-8");
  return JSON.parse(raw);
});

export { count_get as default };
//# sourceMappingURL=count.get.mjs.map
