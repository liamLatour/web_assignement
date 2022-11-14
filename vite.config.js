import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === "serve") {
    return {
      plugins: [vue()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
      server: {
        proxy: {
          "/api": {
            //target: "http://127.0.0.1:8080",
            target: "http://liam-latour.cleverapps.io/",
            changeOrigin: true,
            secure: false,
          },
        },
      },
      base: "/",
    };
  } else {
    return {
      plugins: [vue()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
      server: {
        proxy: {
          "/api": {
            //target: "http://127.0.0.1:8080",
            target: "http://liam-latour.cleverapps.io/",
            changeOrigin: true,
            secure: false,
          },
        },
      },
      base: "/web_assignement/",
    };
  }
});
