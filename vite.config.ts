import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Content-Security-Policy injectée uniquement au build (le dev server de Vite
// a besoin de scripts inline pour le hot reload).
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src https://api.emailjs.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export default defineConfig({
  // Le site est servi sur https://luumia.github.io/portfolio/
  base: "/portfolio/",
  plugins: [
    react(),
    {
      name: "inject-csp",
      apply: "build",
      transformIndexHtml: () => [
        {
          tag: "meta",
          attrs: { "http-equiv": "Content-Security-Policy", content: csp },
          injectTo: "head-prepend",
        },
      ],
    },
  ],
  test: { environment: "node" },
});
