import { r as defineEventHandler, x as getCookie } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const me_get = defineEventHandler((event) => {
  const cookie = getCookie(event, "auth_token");
  if (!cookie) return { user: null };
  try {
    const user = JSON.parse(cookie);
    return { user };
  } catch (e) {
    return { user: null };
  }
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
