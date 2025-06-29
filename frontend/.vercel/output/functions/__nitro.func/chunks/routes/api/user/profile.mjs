import { r as defineEventHandler } from '../../../nitro/nitro.mjs';
import { r as requireAuth } from '../../../_/requireAuth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const profile = defineEventHandler((event) => {
  requireAuth(event);
  return { id: 1, name: "John Doe", email: "john@example.com" };
});

export { profile as default };
//# sourceMappingURL=profile.mjs.map
