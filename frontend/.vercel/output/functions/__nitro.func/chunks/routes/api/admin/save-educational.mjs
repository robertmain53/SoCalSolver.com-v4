import { d as defineEventHandler, r as readBody } from '../../../nitro/nitro.mjs';
import { readFile, writeFile } from 'fs/promises';
import { execSync } from 'child_process';
import path from 'path';
import 'jsonwebtoken';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';

const saveEducational = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { slug, explain, learn, challenge } = body;
  const mdPath = path.resolve("content", "calculators", `${slug}.generated.en.md`);
  try {
    const raw = await readFile(mdPath, "utf-8");
    const replaceSection = (name, value) => raw.replace(
      new RegExp(`:::${name}\\n([sS]*?):::`, "m"),
      `:::${name}
${value}
:::`
    );
    let updated = raw;
    updated = replaceSection("explain", explain);
    updated = replaceSection("learn", learn);
    updated = replaceSection("challenge", challenge);
    await writeFile(mdPath, updated, "utf-8");
    execSync('git config user.email "bot@calchub.com"');
    execSync('git config user.name "CalcHub Bot"');
    execSync(`git add "${mdPath}"`);
    execSync(`git commit -m "\u270D\uFE0F Updated educational content for ${slug}"`);
    return { success: true };
  } catch (e) {
    return { error: "Failed to update file: " + e.message };
  }
});

export { saveEducational as default };
//# sourceMappingURL=save-educational.mjs.map
