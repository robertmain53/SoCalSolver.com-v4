import { d as defineEventHandler, g as getQuery } from '../../../nitro/nitro.mjs';
import { readFile } from 'fs/promises';
import path from 'path';
import 'jsonwebtoken';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';

const loadEducational = defineEventHandler(async (event) => {
  const slug = getQuery(event).slug;
  if (!slug) return { error: "No slug provided" };
  const mdPath = path.resolve("content", "calculators", `${slug}.generated.en.md`);
  try {
    const raw = await readFile(mdPath, "utf-8");
    const extractSection = (name) => {
      const match = raw.match(new RegExp(`:::${name}\\n([sS]*?):::`, "m"));
      return match ? match[1].trim() : "";
    };
    return {
      explain: extractSection("explain"),
      learn: extractSection("learn"),
      challenge: extractSection("challenge")
    };
  } catch (e) {
    return { error: "Could not read file" };
  }
});

export { loadEducational as default };
//# sourceMappingURL=load-educational.mjs.map
