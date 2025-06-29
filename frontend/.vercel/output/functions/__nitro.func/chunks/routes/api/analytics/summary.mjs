import { r as defineEventHandler } from '../../../nitro/nitro.mjs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const summary = defineEventHandler(async () => {
  const path = join(process.cwd(), "logs", "challenge-counts.json");
  let raw = {};
  try {
    raw = JSON.parse(await readFile(path, "utf-8"));
  } catch (e) {
    console.warn("Challenge count log not found or invalid");
  }
  const entries = Object.entries(raw || {}).map(([slug, count]) => ({
    slug,
    count
  }));
  entries.sort((a, b) => b.count - a.count);
  return {
    top: entries.slice(0, 10),
    total: entries.reduce((sum, e) => sum + e.count, 0)
  };
});

export { summary as default };
//# sourceMappingURL=summary.mjs.map
