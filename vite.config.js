import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deployed at https://henrikarba.github.io/RecipeBook/, so assets need the
// repo name as a base path. Dev server stays at "/".
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/RecipeBook/" : "/",
  plugins: [react()],
}));
