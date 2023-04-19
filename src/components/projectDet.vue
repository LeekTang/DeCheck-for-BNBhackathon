<template>
  <div v-if="Object.keys(state.project).length > 0" class="w-[75rem] mx-auto mt-[1.5rem] flex">
    <div class="info-bg rounded-[0.75rem] mr-[1.5rem]">
      <img :src="state.project.logo" @error="imgError" class="h-[16rem] w-[16rem] rounded-[0.75rem] mt-[1.5rem] pb-1 mx-auto"/>
      <div class="p-[1.5rem]">
        <div class="flex justify-between text-[1rem] mb-[1.5rem]">
          <p class="text-[#FFFFFFA8]">{{ t('Contracts') }}</p>
          <p class="text-[#fff] font-bold cursor-pointer" v-if="state.project.tokenAddr" @click="copyClick(state.project.tokenList[0][1])">{{state.project.tokenList ? abbr(state.project.tokenList[0][1]) : '--'}}</p>
        </div>
        <div class="flex justify-between text-[1rem] mb-[1.5rem]">
          <p class="text-[#FFFFFFA8]">{{ t('Autids') }}</p>
          <p class="text-[#fff] font-bold">
            {{state.project.auditor}}
          </p>
        </div>
        <p class="border border-[#FFFFFF1C]"></p>
        <p class="my-[1.5rem] text-[0.88rem] text-[#fff] ">{{ t('tips') }}</p>
        <div class="bg-[#1E50FF] w-[21rem] h-[3.5rem] rounded-[0.75rem] text-[1rem] text-[#fff] font-bold text-center leading-[3.5rem]" @click="reviewClick">{{ t('reviewNow') }}</div>
      </div>
    </div>
    <div class="w-[49.5rem]">
      <p class="text-[2.56rem] text-[#fff] font-bold leading-[3rem]">{{state.project.name}}</p>
      <div class="flex justify-between items-center">
        <el-rate disabled size="large" v-model="state.project.score" />
        <div class="flex">
          <client-only>
            <el-tooltip v-for="(item,index) in iconList" :key="index" :hide-after="0" :content="item.tip" placement="top">
              <div v-if="item.webSrc" class="p-[0.69rem] hover:bg-[#4C406C] rounded-full" @click.stop="goUrl(item.webSrc)">
                <img :src="item.icon" class="h-[1.5rem] w-[1.5rem]"/>
              </div>
            </el-tooltip>
          </client-only>
        </div>
      </div>
      <p class="text-[1rem] text-[#ffffffa8] leading-[1rem] my-[1rem]">{{ t('Investment') }}</p>
      <p class="text-[1rem] text-[#fff] font-bold leading-[1rem] my-[1rem]">{{state.project.invest || '--'}}</p>
      <div class="mt-[3.5rem]">
        <div :class="`${state.isEllipsis ? 'text-ellipsis' : 'more-ellipsis'} text-[1rem] text-[#ffffffa8] leading-[2rem]`">
            {{state.project.intro}}
        </div>
        <!-- <img v-if="state.isEllipsis" src="images/down.svg" class="h-[1.5rem] w-[1.5rem] mx-auto" @click="state.isEllipsis = !state.isEllipsis"/>
        <img v-else src="images/up.svg" class="h-[1.5rem] w-[1.5rem] mx-auto"  @click="state.isEllipsis = !state.isEllipsis"/> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElRate, ElMessage } from 'element-plus'
import { onMounted,reactive,defineProps } from 'vue'
import web3js from '@/src/utils/link'
import request from '@/src/utils/request'
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()
import { abbr, imgError } from '@/src/utils/utils'
import { userStore } from '@/src/stores/user'
import { useI18n } from  'vue-i18n'
const store = userStore();
const router = useRouter()
const { t } = useI18n();

const iconList = [
  {name: 'web', icon: '/images/web-icon.svg', tip: 'Official website', webSrc: ''},
  {name: 'twitter', icon: '/images/twitter-icon.svg', tip: 'twitter', webSrc: ''},
  {name: 'telegram', icon: '/images/telegram-icon.svg', tip: 'telegram', webSrc: ''},
  {name: 'discord', icon: '/images/discord-icon.svg', tip: 'discord', webSrc: ''},
  {name: 'cainstagramnd', icon: '/images/cand-icon.svg', tip: 'instagram', webSrc: ''},
  {name: 'github', icon: '/images/github-icon.svg', tip: 'github', webSrc: ''},
  {name: 'gitbook', icon: '/images/gitbook-icon.svg', tip: 'gitbook', webSrc: ''},
]

const goUrl = (url) => {
  if(url){
    window.open(url,'_blank')
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

const copyClick = async (val) => {
  try {
    await toClipboard(val);
    ElMessage.success('粘贴成功')
  } catch (error) {
    console.log(error)
  }
}

const projectInfo = () => {
  request.get(`/plugin/decheck/api/project/detail/${props.projectID}`).then((res) => {
    if(res.tokenAddr){
      res.tokenList = Object.entries(res.tokenAddr)
    }
    if(res.website){
      iconList[0].webSrc = res.website
    }
    state.project = res
    state.project.auditor = state.project.auditor.join()
    state.project.invest = state.project.invest.join()
    iconList.forEach((el,index) => {
      if(state.project.socialMedia[index + 1] != undefined){
        el.webSrc = state.project.socialMedia[index + 1]
      }
    })
  })
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
            appId: "1646086759245303808",
            authId: signres.account,
            strSign: signres.signMessage,
            type: 4,
            data: 'Welcome to DeCheck! Click to sign in and accept the DeCheck Terms of Service: https://decheck.io This request will not trigger a blockchain transaction or cost any gas fees.'
          }
          request({ url: `/center/apis/user/user-login/login`,method: 'post', data: data,baseURL:'https://www.2web3.net/test-user-center'}).then(loginres => {
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
.info-bg{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}
.text-ellipsis{
  overflow:hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 7;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.more-ellipsis{
  overflow:hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>