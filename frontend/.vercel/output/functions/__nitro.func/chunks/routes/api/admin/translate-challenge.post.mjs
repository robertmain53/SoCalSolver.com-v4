import { d as defineEventHandler, r as readBody, a as createError } from '../../../nitro/nitro.mjs';
import 'jsonwebtoken';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';

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
