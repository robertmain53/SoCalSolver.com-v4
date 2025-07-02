import { w as executeAsync, I as useSession } from '../nitro/nitro.mjs';
import { k as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import 'jsonwebtoken';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'vue';
import 'pinia';
import 'vue-router';
import 'requrl';
import 'markdown-it-container';
import 'vue/server-renderer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const protectedAuth = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  const session = ([__temp, __restore] = executeAsync(() => useSession()), __temp = await __temp, __restore(), __temp);
  if (!session.status || session.status !== "authenticated") {
    return navigateTo("/login");
  }
});

export { protectedAuth as default };
//# sourceMappingURL=protectedAuth-BNxw7v7R.mjs.map
