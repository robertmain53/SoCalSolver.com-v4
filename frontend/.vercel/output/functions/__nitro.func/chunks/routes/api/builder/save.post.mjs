import { r as defineEventHandler, U as readBody } from '../../../nitro/nitro.mjs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { nanoid } from 'nanoid';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const save_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = nanoid(8);
  const filePath = join(process.cwd(), "drafts", `${id}.calcbundle.json`);
  await writeFile(filePath, JSON.stringify(body, null, 2), "utf-8");
  return { success: true, id };
});

export { save_post as default };
//# sourceMappingURL=save.post.mjs.map
