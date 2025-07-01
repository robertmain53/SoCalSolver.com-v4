import { r as defineEventHandler } from '../../../nitro/nitro.mjs';
import { c as checkAuth } from '../../../_/checkAuth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const analytics_get = defineEventHandler(async (event) => {
  await checkAuth(event);
  return { message: "Hello Admin" };
});

export { analytics_get as default };
//# sourceMappingURL=analytics.get.mjs.map
