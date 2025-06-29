import { r as defineEventHandler } from '../../../nitro/nitro.mjs';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const complete_post = defineEventHandler(async () => {
  const file = join(process.cwd(), "server/data/challenges.json");
  const raw = await readFile(file, "utf-8");
  const data = JSON.parse(raw);
  data.count++;
  await writeFile(file, JSON.stringify(data, null, 2));
  return { success: true, count: data.count };
});

export { complete_post as default };
//# sourceMappingURL=complete.post.mjs.map
