import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
      vue({
    ...templateCompilerOptions
  }),],
  build: {
    rollupOptions: {
      external: ['troisjs', 'three'], // Добавьте сюда troisjs и three
    },
  },
})


