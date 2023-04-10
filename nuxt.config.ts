import VueI18nVitePlugin from 'postcss-px-to-viewport-8-plugin'
import {loadEnv } from 'vite'

interface VITE_ENV_CONFIG {
  VITE_API_URL: string
}

const envScript = process.env.npm_lifecycle_script.split(' ')
const envName = envScript[envScript.length - 1]
const envData = loadEnv(envName, 'env') as unknown as VITE_ENV_CONFIG

export default defineNuxtConfig({
  publicRuntimeConfig: envData,
  app: {
    head: {
      titleTemplate: "DeCheck",
      title: "DeCheck",
      link: [

      ],
      meta: [
        { name: "keywords", content: "web3、区块链、元宇宙、比特币、以太坊、区块链媒体,区块链新闻,区块链快讯,区块链专栏,区块链游戏,区块链投资,区块链赚钱,区块链钱包,BTC,ETH,DeFi,交易所,稳定币,DApp,NFT" },
        { name: "description", content: "2web3,是一个汇总整理区块链领域相关项目信息、行业工具、 产品资讯等内容的垂直领域导航网站。我们将配合视频内容的形式为站点赋能，尽可能降低普通用户从web2过渡 到web3的学习和认知成本。" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" },
      ],
      __dangerouslyDisableSanitizers: ['script'],
    }
  },
  experimental: {
    viteNode: true
  },
  modules: ["@nuxtjs/tailwindcss","@element-plus/nuxt","@pinia/nuxt"],
  plugins: [{src: '~/plugins/swiper.js', ssr: false}],
  css: ["element-plus/dist/index.css"],
  postcss: {
    plugins: {
      'postcss-px-to-viewport-8-plugin': {
        unitToConvert: 'px', // 需要转换的单位，默认为"px"
        viewportWidth: 1600, // 设计稿的视口宽度
        unitPrecision: 5, // 单位转换后保留的精度
        propList: ['*'], // 能转化为vw的属性列表,!font-size表示font-size后面的单位不会被转换
        viewportUnit: 'vw', // 希望使用的视口单位
        fontViewportUnit: 'vw', // 字体使用的视口单位
        // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
        // 下面配置表示类名中含有'keep-px'都不会被转换
        selectorBlackList: ['keep-px'],
        minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
        mediaQuery: false, // 媒体查询里的单位是否需要转换单位
        replace: true, //  是否直接更换属性值，而不添加备用属性
        exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
        include: [/src/], // 如果设置了include，那将只有匹配到的文件才会被转换
        landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
        landscapeUnit: 'vw', // 横屏时使用的单位
        landscapeWidth: 1338, // 横屏时使用的视口宽度
      }
    }
  },
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
  },
  devServer: {
    allowedHosts: "all",
  },
  render: {
    resourceHints: false
  }
})
