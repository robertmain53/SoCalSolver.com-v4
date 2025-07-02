import { d as defineEventHandler, c as checkAuth } from '../../../nitro/nitro.mjs';
import 'jsonwebtoken';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';

const analytics_get = defineEventHandler(async (event) => {
  await checkAuth(event);
  return { message: "Hello Admin" };
});

export { analytics_get as default };
//# sourceMappingURL=analytics.get.mjs.map
