import { r as defineEventHandler } from '../../../nitro/nitro.mjs';
import fs from 'fs-extra';
import path from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const contentDir = path.resolve("content");
const improvedDir = path.resolve("content-improved");
const approvedDir = path.resolve("approved/content");
const list_get = defineEventHandler(async () => {
  const files = await fs.readdir(contentDir);
  const calculators = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.en\.md$/, "");
    const entry = { slug, title: slug, status: "draft" };
    const improvedPath = path.join(improvedDir, file);
    const approvedPath = path.join(approvedDir, file);
    if (await fs.pathExists(improvedPath)) entry.status = "improved";
    if (await fs.pathExists(approvedPath)) entry.status = "approved";
    calculators.push(entry);
  }
  return calculators;
});

export { list_get as default };
//# sourceMappingURL=list.get.mjs.map
