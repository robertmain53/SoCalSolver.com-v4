import { d as defineEventHandler, r as readBody, a as createError } from '../../../nitro/nitro.mjs';
import { OpenAI } from 'openai';
import 'jsonwebtoken';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';

const generate_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { inputs, formula } = body;
  if (!inputs || !formula) {
    throw createError({ statusCode: 400, statusMessage: "Missing inputs or formula" });
  }
  const prompt = `Generate a calculator code in JavaScript. Use these inputs:

${JSON.stringify(inputs, null, 2)}

Formula:
${formula}

Return only the code.`;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4"
  });
  return {
    code: response.choices[0].message.content
  };
});

export { generate_post as default };
//# sourceMappingURL=generate.post.mjs.map
