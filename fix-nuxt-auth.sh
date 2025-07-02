#!/usr/bin/env bash
set -e

# Go to frontend directory
cd "$(dirname "$0")/frontend"

echo "Installing @sidebase/nuxt-auth..."
pnpm add @sidebase/nuxt-auth

echo "Cleaning up old or duplicate auth scripts..."
rm -f fixMiddleware.sh fix_nuxt_middleware.sh fix-middleware.sh fixDuplicateScripts.sh setup-nuxt-auth.sh

echo "Checking if protectedAuth middleware exists..."
if [ ! -f middleware/protectedAuth.ts ]; then
  echo "Creating protectedAuth middleware..."
  mkdir -p middleware
  cat > middleware/protectedAuth.ts <<'EOF'
export default defineNuxtRouteMiddleware(async (to, from) => {
  const session = await useSession()
  if (!session.status || session.status !== 'authenticated') {
    return navigateTo('/login')
  }
})
EOF
fi

echo "Patching auth.config.ts to use a backend API endpoint..."
cat > auth.config.ts <<'EOF'
import { defineAuthConfig } from "@sidebase/nuxt-auth"

export default defineAuthConfig({
  providers: [
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const res = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            username: credentials?.username,
            password: credentials?.password
          }
        })
        if (res && res.user) {
          return res.user
        }
        return null
      }
    }
  ]
})
EOF

echo "Creating example /api/auth/login endpoint..."
mkdir -p server/api/auth
cat > server/api/auth/login.post.ts <<'EOF'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (body.username === 'admin' && body.password === 'password') {
    return { user: { id: '1', name: 'Admin User' } }
  }
  return { user: null }
})
EOF

echo "Ensuring @sidebase/nuxt-auth module in nuxt.config.ts..."
if ! grep -q "@sidebase/nuxt-auth" nuxt.config.ts; then
  sed -i 's/\(@pinia\/nuxt[^\]]*\)/\1,\n    "@sidebase\/nuxt-auth"/' nuxt.config.ts
fi

echo "Installing other dependencies..."
pnpm install

echo "Running lint..."
pnpm lint --fix || true

echo "Build check..."
pnpm build

echo "✅ Authentication cleaned and project is ready."
