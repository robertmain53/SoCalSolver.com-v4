import { x as getCookie, n as createError } from '../nitro/nitro.mjs';

function requireAuth(event) {
  const token = getCookie(event, "auth_token");
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
}

export { requireAuth as r };
//# sourceMappingURL=requireAuth.mjs.map
