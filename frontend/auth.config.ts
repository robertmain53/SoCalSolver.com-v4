import { defineAuthConfig } from "@sidebase/nuxt-auth"

export default defineAuthConfig({
  // Example: credentials provider for email/password login
  // You will customize this with your own backend later
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
        // Here you can call your backend API to verify credentials
        // For now, a dummy user if username === "admin" and password === "password"
        if (
          credentials?.username === "admin" &&
          credentials?.password === "password"
        ) {
          return { id: "1", name: "Admin User" }
        }
        return null
      }
    }
  ]
})
