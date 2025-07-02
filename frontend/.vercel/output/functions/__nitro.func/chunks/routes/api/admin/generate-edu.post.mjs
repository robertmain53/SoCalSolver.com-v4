import { d as defineEventHandler, r as readBody, a as createError } from '../../../nitro/nitro.mjs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { OpenAI } from 'openai';
import 'jsonwebtoken';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';

const generateEdu_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { slug, locale } = body;
  if (!slug) throw createError({ statusCode: 400, statusMessage: "Missing slug" });
  const filepath = join(process.cwd(), "content", locale || "en", slug + ".md");
  const md = await readFile(filepath, "utf-8");
  const explainPrompt = await readFile(join(process.cwd(), "utils", "ai", "prompts", "edu-explain.txt"), "utf-8");
  const learnPrompt = await readFile(join(process.cwd(), "utils", "ai", "prompts", "edu-learn.txt"), "utf-8");
  const challengePrompt = await readFile(join(process.cwd(), "utils", "ai", "prompts", "edu-challenge.txt"), "utf-8");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const explainDeepPrompt = await readFile(join(process.cwd(), "utils", "ai", "prompts", "explain-deep.txt"), "utf-8");
  const [explain, learn, challenge, deep] = await Promise.all([
    openai.chat.completions.create({ messages: [{ role: "user", content: explainPrompt + md }], model: "gpt-4" }),
    openai.chat.completions.create({ messages: [{ role: "user", content: learnPrompt + md }], model: "gpt-4" }),
    openai.chat.completions.create({ messages: [{ role: "user", content: challengePrompt + md }], model: "gpt-4" }),
    openai.chat.completions.create({ messages: [{ role: "user", content: explainDeepPrompt + md }], model: "gpt-4" })
  ]);
  return {
    deepExplain: deep.choices[0].message.content,
    explain: explain.choices[0].message.content,
    learn: learn.choices[0].message.content,
    challenge: challenge.choices[0].message.content
  };
});

export { generateEdu_post as default };
//# sourceMappingURL=generate-edu.post.mjs.map
