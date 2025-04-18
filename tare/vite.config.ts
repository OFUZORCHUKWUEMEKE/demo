import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: ["5173-ofuzorchukwuemek-demo-p45vrqhp4f7.ws-eu118.gitpod.io","5173-ofuzorchukwuemek-demo-c72yzqsi2kk.ws-eu118.gitpod.io"]
  }

})
