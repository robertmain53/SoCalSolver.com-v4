import { r as defineEventHandler, U as readBody } from '../../../nitro/nitro.mjs';
import jwt from 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const USERS = {
  admin: { password: "admin123", role: "admin" },
  editor: { password: "editme", role: "editor" }
};
const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;
  const user = USERS[username];
  if (!user || user.password !== password) {
    return { error: "Invalid credentials" };
  }
  const token = jwt.sign({ username, role: user.role }, "socal-secret", { expiresIn: "2h" });
  return { token, role: user.role };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
