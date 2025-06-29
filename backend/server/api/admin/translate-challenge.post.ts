import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body) {
    throw createError({ statusCode: 400, statusMessage: 'No body provided' });
  }

  const { text, targetLang } = body;
  if (!text || !targetLang) {
    throw createError({ statusCode: 400, statusMessage: 'Missing text or targetLang' });
  }

  return { translatedText: `Translated(${targetLang}): ${text}` };
});
