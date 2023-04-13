import { createI18n } from 'vue-i18n'
import ZH from '@/locales/zh-cn.json'
import EN from '@/locales/en.json'

export default defineNuxtPlugin(({vueApp}) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'EN',
    messages: {
      EN,
      ZH
    }
  })

  vueApp.use(i18n)
})