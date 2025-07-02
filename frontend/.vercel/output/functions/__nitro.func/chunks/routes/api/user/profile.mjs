import { d as defineEventHandler, e as requireAuth } from '../../../nitro/nitro.mjs';
import 'jsonwebtoken';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';

const profile = defineEventHandler((event) => {
  requireAuth(event);
  return { id: 1, name: "John Doe", email: "john@example.com" };
});

export { profile as default };
//# sourceMappingURL=profile.mjs.map
