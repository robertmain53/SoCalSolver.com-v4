import { d as defineEventHandler, a as createError } from '../../../nitro/nitro.mjs';
import { readdir, readFile } from 'fs/promises';
import { join, parse } from 'path';
import matter from 'gray-matter';
import 'jsonwebtoken';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';

const _slug_ = defineEventHandler(async (event) => {
  var _a;
  const slug = (_a = event.context.params) == null ? void 0 : _a.slug;
  const baseDir = join(process.cwd(), "content", "en");
  const files = await readdir(baseDir);
  const data = [];
  for (const file of files) {
    const full = await readFile(join(baseDir, file), "utf-8");
    const { data: fm } = matter(full);
    data.push({ slug: parse(file).name, ...fm });
  }
  const current = data.find((d) => d.slug === slug);
  if (!current) throw createError({ statusCode: 404, statusMessage: "Not found" });
  const related = data.filter((d) => d.slug !== slug).map((d) => {
    var _a2;
    return {
      slug: d.slug,
      title: d.title,
      score: ((_a2 = d.tags) == null ? void 0 : _a2.filter((tag) => {
        var _a3;
        return (_a3 = current.tags) == null ? void 0 : _a3.includes(tag);
      }).length) || 0 + (d.units && current.units && d.units.some((u) => current.units.includes(u)) ? 1 : 0)
    };
  }).sort((a, b) => b.score - a.score).slice(0, 4);
  return related;
});

export { _slug_ as default };
//# sourceMappingURL=_slug_.mjs.map
