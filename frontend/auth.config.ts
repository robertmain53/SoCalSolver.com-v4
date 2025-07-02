import { defineAuthConfig } from "@sidebase/nuxt-auth"

export default defineAuthConfig({
  // You can customize sessions, callbacks, etc.
  session: {
    strategy: "jwt"
  },
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
        // Instead of calling $fetch(), you do any backend call or logic directly here.
        // For example, call your database, or an internal API
        // Example dummy check:
        if (
          credentials?.username === "admin" &&
          credentials?.password === "password"
        ) {
          return {
            id: "1",
            name: "Admin User"
          }
        }
        // If no user found:
        return null
      }
    }
  ]
})
