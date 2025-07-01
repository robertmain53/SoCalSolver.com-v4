import { r as defineEventHandler, x as getCookie, n as createError } from '../nitro/nitro.mjs';

const checkAuth = defineEventHandler((event) => {
  const token = getCookie(event, "auth_token");
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Not authenticated" });
  }
});

export { checkAuth as c };
//# sourceMappingURL=checkAuth.mjs.map
