import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (e.g., "test" => ".env.test")
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      NodeGlobalsPolyfillPlugin({
        process: true,
        buffer: true,
      }),
    ],
    server: {
      host: "0.0.0.0",
      port: 5170,
    },
    define: {
      global: "window",
      "process.env": env, // make env variables accessible (for fallback)
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext",
      },
    },
  };
});
