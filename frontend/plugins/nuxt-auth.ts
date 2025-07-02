import { defineNuxtPlugin } from "#app";
import { useAuth } from "@sidebase/nuxt-auth";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      auth: useAuth()
    }
  };
});
