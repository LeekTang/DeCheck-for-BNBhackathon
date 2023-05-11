<template>
  <div v-if="Object.keys(state.project).length > 0" class="w-[75rem] mx-auto mt-[1.5rem] flex">
    <div class="bg-[#110921] h-[22.9rem] border border-solid border-[#ffffff1c] w-[17.62rem] rounded-[0.75rem] mr-[1.5rem]">
      <img :src="state.project.logo" @error="imgError" class="h-[14.62rem] w-[14.62rem] rounded-[0.75rem] mt-[1.5rem] mx-auto"/>
      <div class="p-[1.5rem]">
        <div class="flex justify-between text-[0.87rem] mb-[1.5rem]">
          <p class="text-[#FFFFFFA8]">{{t('Contracts')}}</p>
          <div class="text-[#fff] font-bold cursor-pointer flex items-center" v-if="state.project.tokenAddr">
            <p @click="goToUrl(state.project.tokenList[0][1])">{{state.project.tokenList ? abbr(state.project.tokenList[0][1]) : '--'}}</p>
            <img src="/images/copy.svg" class="h-[1rem] w-[1rem] ml-[0.5rem]" @click="copyClick(state.project.tokenList[0][1])"/>
          </div>
        </div>
        <div class="flex justify-between text-[0.87rem] text-right">
          <p class="text-[#FFFFFFA8]">{{t('Audits')}}</p>
          <p class="text-[#fff] w-[10rem] font-bold overflow-hidden whitespace-nowrap text-ellipsis">
            {{state.project.auditor || '--'}}
          </p>
        </div>
        <!-- <p class="border border-[#FFFFFF1C]"></p>
        <p class="my-[1.5rem] text-[0.88rem] text-[#fff] ">{{t('tips')}}</p>
        <div class="w-[14.26rem] h-[2.5rem] bg-[#1E50FF] rounded-[0.5rem] cursor-pointer text-[1rem] text-[#fff] font-bold text-center leading-[2.5rem]" @click="reviewClick">{{t('reviewNow')}}</div> -->
      </div>
    </div>
    <div class="w-[55.87rem]">
      <p class="text-[2.56rem] text-[#fff] font-bold leading-[3rem]">{{state.project.name}}</p>
      <div class="flex justify-between items-center">
        <el-rate disabled size="large" v-model="state.project.score" />
        <div class="flex">
          <client-only>
            <el-tooltip v-for="(item,index) in iconList" :key="index" :content="item.tip" placement="top">
              <div v-if="item.webSrc" class="p-[0.69rem] hover:bg-[#4C406C] rounded-full cursor-pointer" @click.stop="goUrl(item.webSrc)">
                <img :src="item.icon" class="h-[1.5rem] w-[1.5rem]"/>
              </div>
            </el-tooltip>
          </client-only>
        </div>
      </div>
      <p class="text-[1rem] text-[#ffffffa8] leading-[1rem] my-[1rem]">{{t('Investment')}}</p>
      <p class="text-[1rem] text-[#fff] font-bold leading-[1rem] my-[1rem]">{{state.project.invest || '--'}}</p>
      <div class="mt-[3.5rem]">
        <div :class="`${state.isEllipsis ? 'text-ellipsis7' : 'more-ellipsis'} text-[1rem] text-[#ffffffa8] leading-[2rem]`">
            {{state.project.intro}}
        </div>
        <template v-if="state.project.intro">
          <img v-if="state.isEllipsis" src="/images/down.svg" class="h-[1.5rem] w-[1.5rem] mx-auto" @click="state.isEllipsis = !state.isEllipsis"/>
          <img v-else src="/images/up.svg" class="h-[1.5rem] w-[1.5rem] mx-auto"  @click="state.isEllipsis = !state.isEllipsis"/>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElRate } from 'element-plus'
import { onMounted,reactive } from 'vue'
import request from '@/src/utils/request'
import web3js from '@/src/utils/link'
import { abbr, imgError, copyToClipBoard, webList } from '@/src/utils/utils'
import { useI18n } from  'vue-i18n'
const { t } = useI18n();
import { userStore } from '@/src/stores/user' 
import { storeToRefs } from 'pinia'
const store = userStore()
const router = useRouter()
const runConfig = useRuntimeConfig()

const iconList = [
  {name: 'web', icon: '/images/web-icon.svg', tip: 'Official website', webSrc: ''},
  {name: 'twitter', icon: '/images/twitter-icon.svg', tip: 'Twitter', webSrc: ''},
  {name: 'telegram', icon: '/images/telegram-icon.svg', tip: 'Telegram', webSrc: ''},
  {name: 'discord', icon: '/images/discord-icon.svg', tip: 'Discord', webSrc: ''},
  {name: 'youtube', icon: '/images/youtube.svg', tip: 'YouTube', webSrc: ''},
  {name: 'reddit', icon: '/images/reddit.svg', tip: 'Reddit', webSrc: ''},
  {name: 'github', icon: '/images/github-icon.svg', tip: 'Github', webSrc: ''},
  {name: 'whitePaper', icon: '/images/whitePaper.svg', tip: 'WhitePaper', webSrc: ''},
]

const goUrl = (url) => {
  if(url){
    window.open(url,'_blank')
  }
}

const goToUrl = (val) => {
  let url = '';
  webList.forEach(el => {
    if(el.chain == store.chain){
      url = el.web
    }
  })
  if(url){
    window.open(url + 'address/' + val,'_blank')
  }
}

const { tokenID } = storeToRefs( store )

const state = reactive({
  isEllipsis: true,
  project: {},
  isSign: computed(() => store.getIsSign),
})

watch(tokenID,() => {
  projectInfo()
})

const projectInfo = () => {
  if(tokenID.value){
    request.get(`/plugin/decheck/api/project/detail/${tokenID.value}`).then((res) => {
      if(res.tokenAddr){
        res.tokenList = Object.entries(res.tokenAddr)
      }
      if(res.website){
        iconList[0].webSrc = res.website
      }
      store.searchProjectInfo = state.project = res
      if(state.project.auditor){
        state.project.auditor = state.project.auditor.join()
      }
      if(state.project.invest){
        state.project.invest = state.project.invest.join()
      }
      if(state.project.socialMedia){
        iconList.forEach((el,index) => {
          if(state.project.socialMedia[index + 1] != undefined){
            el.webSrc = state.project.socialMedia[index + 1]
          }
        })
      }
      
    })
  }else{
    store.searchProjectInfo = state.project = ''
  }
}

const copyClick = (val) => {
  if(val){
    copyToClipBoard(val);
    ElMessage({
      message: t('copySuccess'),
      type: 'success',
      offset: 120
    })
  }
}

const reviewClick = () => {
  if(state.isSign){
    router.push({
      name: 'comment',
      query: {
        id: tokenID.value,
        name: state.project.name
      }
    })
  }else{
    web3js.connect().then((res) => {
		  if(res == undefined) {return;}
      web3js.change().then(chanres => {
        if(chanres == true){
          store.isSign = false;
	        store.userInfo = {};
          localStorage.language = ''
          localStorage.token = ''
        }
      })
      web3js.getSign().then(signres=>{
        if(signres.signMessage){
          let data = {
            aggregateType: 7,
            appId: runConfig.public.VITE_LOGIN_ID,
            authId: signres.account,
            strSign: signres.signMessage,
            type: 4,
            data: runConfig.public.VITE_SIGN_TEXT
          }
          request({ url: `/center/apis/user/user-login/login`,method: 'post', data: data, baseURL: runConfig.public.VITE_LOGIN_URL}).then(loginres => {
            localStorage.setItem('token',loginres.tokenValue)
            store.userInfo = { account: signres.account}
            store.isSign = true;
          })
        }
      })
    })
  }
}

</script>
<style scoped>

.text-ellipsis7{
  overflow:hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  -webkit-box-orient: vertical; 
}
.more-ellipsis{
  overflow:hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 10;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>