import { createI18n } from 'vue-i18n'
import zh from '@/locales/zh-cn.json'
import en from '@/locales/en.json'

export default defineNuxtPlugin(({vueApp}) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'zh',
    messages: {
      en,
      zh
    }
  })

  vueApp.use(i18n)
})