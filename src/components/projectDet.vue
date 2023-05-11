<template>
  <div v-if="Object.keys(state.project).length > 0" class="w-[75rem] mx-auto mt-[1.5rem] flex">
    <div class="bg-[#110921] h-[22.9rem] w-[17.62rem] border border-solid border-[#ffffff1c] rounded-[0.75rem] mr-[1.5rem]">
      <img :src="state.project.logo" @error="imgError" class="h-[234px] w-[234px] rounded-[0.75rem] mt-[1.5rem] mx-auto"/>
      <div class="p-[1.5rem]">
        <div class="flex justify-between text-[0.87rem] mb-[1.5rem]">
          <p class="text-[#FFFFFFA8]">{{ t('Contracts') }}</p>
          <div class="flex items-center text-[#fff] font-bold cursor-pointer" v-if="Object.keys(state.project.tokenAddr).length > 0 ">
            <p @click="goToUrl(state.project.tokenList[proStore.chain][1])">{{state.project.tokenList ? abbr(state.project.tokenList[proStore.chain][1]) : '--'}}</p>
            <img src="/images/copy.svg" class="h-[1rem] w-[1rem] ml-[0.5rem]" @click="copyClick(state.project.tokenList[proStore.chain][1])"/>
          </div>
        </div>
        <div class="flex justify-between text-[0.87rem]">
          <p class="text-[#FFFFFFA8]">{{ t('Audits') }}</p>
          <p class="text-[#fff] font-bold w-[10rem] overflow-hidden whitespace-nowrap text-ellipsis text-right">
            {{state.project.auditor}}
          </p>
        </div>
        <!-- <p class="border border-[#FFFFFF1C]"></p>
        <p class="mt-[1rem] mb-[1.5rem] text-[0.88rem] text-[#fff] ">{{ t('tips') }}</p>
        <div 
          class="bg-[#1E50FF] w-[14.26rem] h-[2.5rem] rounded-[0.5rem] text-[1rem] text-[#fff] 
          font-bold text-center leading-[2.5rem] cursor-pointer" @click="reviewClick">
          {{ t('reviewNow') }}
        </div> -->
      </div>
    </div>
    <div class="flex-1">
      <p class="text-[2.56rem] text-[#fff] font-bold leading-[3rem]">{{state.project.name}}</p>
      <div class="flex justify-between items-center">
        <el-rate disabled size="large" v-model="state.project.score" />
        <div class="flex">
          <client-only>
            <el-tooltip v-for="(item,index) in iconList" :key="index" :hide-after="0" :content="item.tip" placement="top">
              <div v-if="item.webSrc" class="p-[0.69rem] hover:bg-[#4C406C] rounded-full cursor-pointer" @click.stop="goUrl(item.webSrc)">
                <img :src="item.icon" class="h-[1.5rem] w-[1.5rem]"/>
              </div>
            </el-tooltip>
          </client-only>
        </div>
      </div>
      <p class="text-[1rem] text-[#ffffffa8] leading-[1rem] my-[1rem]">{{ t('Investment') }}</p>
      <p class="text-[1rem] text-[#fff] font-bold leading-[1rem] my-[1rem]">{{state.project.invest || '--'}}</p>
      <div class="mt-[3.5rem] h-[15rem]">
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
import { ElRate, ElMessage } from 'element-plus'
import { onMounted,reactive,defineProps } from 'vue'
import web3js from '@/src/utils/link'
import request from '@/src/utils/request'
import { abbr, imgError, copyToClipBoard,webList } from '@/src/utils/utils'
import { userStore } from '@/src/stores/user'
const store = userStore();
import { projectStore } from '@/src/stores/project'
const proStore = projectStore();
import { useI18n } from  'vue-i18n'
const { t } = useI18n();
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
    if(el.chain == state.project.tokenList[proStore.chain][0]){
      url = el.web
    }
  })
  if(url){
    window.open(url + 'address/' + val,'_blank')
  }
}

const props = defineProps({
  projectID: {
    type: String
  }
})

const state = reactive({
  isEllipsis: true,
  project: {},
  isSign: computed(() => store.getIsSign),
})

const projectInfo = () => {
  request.get(`/plugin/decheck/api/project/detail/${props.projectID}`).then((res) => {
    if(res.tokenAddr){
      res.tokenList = Object.entries(res.tokenAddr)
    }
    if(res.website){
      iconList[0].webSrc = res.website
    }
    state.project = res
    if(state.project.auditor){
      state.project.auditor = state.project.auditor.join()
    }
    if(state.project.invest){
      state.project.invest = state.project.invest.join()
    }
    iconList.forEach((el,index) => {
      if(state.project.socialMedia[index + 1] != undefined){
        el.webSrc = state.project.socialMedia[index + 1]
      }
    })
  })
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
        id: props.projectID,
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
          localStorage.token = ""
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



onMounted(()=>{
  projectInfo();
})

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
  -webkit-line-clamp: 7;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>