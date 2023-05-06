import VueI18nVitePlugin from 'postcss-px-to-viewport-8-plugin'
import {loadEnv } from 'vite'

interface VITE_ENV_CONFIG {
  VITE_API_URL: string
  VITE_SIGN_TEXT: string
  VITE_LOGIN_URL: string
  VITE_LOGIN_ID: string
}

const envScript = process.env.npm_lifecycle_script.split('')
const envName = envScript[envScript.length - 1]
const envData = loadEnv(envName, 'env') as unknown as VITE_ENV_CONFIG

export default defineNuxtConfig({
  runtimeConfig: {
    public: envData
  },
  app: {
    head: {
      titleTemplate: "DeCheck",
      title: "DeCheck",
      link: [],
      meta: [
        { name: "keywords", content: "" },
        { name: "description", content: "" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" },
      ],
      __dangerouslyDisableSanitizers: ['script'],
    }
  },
  experimental: {
    viteNode: true
  },
  modules: ["@nuxtjs/tailwindcss","@element-plus/nuxt","@pinia/nuxt","@pinia-plugin-persistedstate/nuxt"],
  plugins: [{src: '~/plugins/swiper.js', ssr: false}],
  css: ["element-plus/dist/index.css","@/assets/css/font.css"],
  vite: {
    envDir: '~/env',
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        }
      ]
    }
  }
})
