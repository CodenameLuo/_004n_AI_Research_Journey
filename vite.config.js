import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
    server: {
        host: '0.0.0.0',
        port: 7100,

        proxy: {

            // '/': {
            //     target: 'http://localhost:8100',
            //     changeOrigin: true,
            // },

            // 功能1
            // '/StoryDiffusion_api': {
            //     target: 'http://localhost:8100',
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace(/^\/StoryDiffusion_api/, ''),
            // },

            // =======================================================

            '/Gallery_api': {
                target: 'http://localhost:8100',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/Gallery_api/, ''),
            },

            // 功能2
            '/AiStory_api': {
                target: 'http://localhost:8100',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/AiStory_api/, '/api'),
            },

            // 功能3
            '/StickColor_api': {
                target: 'http://localhost:8100',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/StickColor_api/, ''),
            },

            // 功能4
            '/lingxi': {
                target: 'http://localhost:8100',
                changeOrigin: true,
                // rewrite: path => path.replace(/^\/lingxi/, ''),
            },
            
        },
    },
    
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }
  // define: {
  //   __VUE_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })'
  // }
})
