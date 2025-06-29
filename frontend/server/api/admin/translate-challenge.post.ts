import { defineEventHandler, readBody, createError, H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const { content, targetLang } = body;

  if (!content || !targetLang) {
    throw createError({ statusCode: 400, statusMessage: 'Missing content or targetLang' });
  }

  return { translated: `[${targetLang}] ${content}` };
});
