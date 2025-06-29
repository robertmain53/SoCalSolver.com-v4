import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request' });
  }

  // Extract expected parameters from request body
  const { challengeId, text, targetLang } = body;
  if (!text && !challengeId) {
    throw createError({ statusCode: 400, statusMessage: 'No text or challengeId provided for translation' });
  }
  if (!targetLang) {
    throw createError({ statusCode: 400, statusMessage: 'No targetLang specified' });
  }

  // (Optional) Verify user is an admin if needed
  // if (!event.context?.auth?.isAdmin) {
  //   throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  // }

  // Determine source text to translate
  let sourceText = text;
  if (!sourceText && challengeId) {
    // TODO: Fetch the challenge text from database by challengeId
    // sourceText = await getChallengeText(challengeId);
    sourceText = '';
  }
  if (!sourceText) {
    throw createError({ statusCode: 404, statusMessage: 'Source text not found' });
  }

  // Perform translation (placeholder logic – replace with real translation API or library)
  const translatedText = `Translated [${targetLang}]: ${sourceText}`;

  // Return the translated text (and optionally save it to the database as needed)
  return { success: true, translatedText };
});
