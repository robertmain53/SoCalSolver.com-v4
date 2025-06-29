import { r as defineEventHandler, U as readBody, n as createError } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const translateChallenge_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { content, targetLang } = body;
  if (!content || !targetLang) {
    throw createError({ statusCode: 400, statusMessage: "Missing content or targetLang" });
  }
  return { translated: `[${targetLang}] ${content}` };
});

export { translateChallenge_post as default };
//# sourceMappingURL=translate-challenge.post.mjs.map
