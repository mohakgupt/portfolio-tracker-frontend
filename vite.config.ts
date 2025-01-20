import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    build: {
      // generate .vite/manifest.json in outDir
      manifest: true,
      rollupOptions: {
        // overwrite default .html entry
        input: '/app/root.tsx',
      },
    },
    define: {
      'process.env.REACT_APP_BACKEND_URL': JSON.stringify(env.REACT_APP_BACKEND_URL)
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    ssr: {
      noExternal: [
        "@mui/system",   
        "@mui/icons-material",
        "@mui/lab",
        "@mui/material",
        "@mui/styles",
        "@mui/utils",
        "@mui/x-date-pickers"
      ],
    },
    plugins: [reactRouter(), tsconfigPaths()],
  }
})