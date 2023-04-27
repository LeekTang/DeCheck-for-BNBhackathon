<template>
  <div class="w-full fixed top-0 bg-[#000] z-[100]">
    <div class="w-[75rem] mx-auto flex items-center justify-between">
      <div class="flex items-center w-[38.2rem] py-[0.75rem] justify-between text-[1rem] text-[#ffffffa8]">
        <NuxtLink to="/"><img src="/images/logo.png" class="h-[2.5rem] w-[11rem] cursor-pointer" /></NuxtLink>
        <NuxtLink to="/" activeClass="font-extrabold text-[#fff]">{{ t('Home') }}</NuxtLink>
        <NuxtLink to="/explorer" activeClass="font-extrabold text-[#fff]">{{ t('Explorer') }}</NuxtLink>
        <NuxtLink to="/dao" activeClass="font-extrabold text-[#fff]">{{ t('DeCheckDAO') }}</NuxtLink>
        <NuxtLink to="/check" activeClass="font-extrabold text-[#fff]">{{ t('Check') }}</NuxtLink>
      </div>
      <div class="flex">
        <client-only>
          <el-popover :ref="(ref) => {state.languagePop = ref}" placement="bottom" :hide-after="0" :show-arrow="false" transition="none" :teleported="false"  trigger="click">
            <template #reference>
              <div class="h-[2rem] w-[4.88rem] flex justify-center items-center bg-[#ffffff1c] font-semibold rounded-[0.75rem] mr-[1.5rem] border-2 border-white cursor-pointer">
                <img src="/images/web.svg" class="h-[1rem] w-[1rem]">
                <span class="text-[1rem] text-[#ffffff] ml-[0.44rem]">{{state.language}}</span>
              </div>
            </template>
            <div class="flex flex-col cursor-pointer rounded-[0.75rem] bg-[#322558FF]">
              <div v-for="(item, index) in languageList" :key="index" @click="onSetLanguage(item.key)"
                class="h-[3rem] text-center rounded-[0.5rem] leading-[3rem] text-[#fff] hover:bg-[#493d6a] ">
                {{ item.label }}
              </div>
            </div>
          </el-popover>
        </client-only>
        
        <client-only>
				  <el-popover :ref="(ref) => { state.setPop = ref}" placement="bottom" :hide-after="0" :width="180" :show-arrow="false" transition="none" :teleported="false" trigger="click" v-if="state.isSign">
            <template #reference>
              <div class="text-[#fff] text-[1rem] text-center font-semibold  cursor-pointer flex items-center">
                <img src="/images/avatar.png" class="h-[2rem] w-[2rem] rounded-full mr-[0.5rem]" />
                <p>{{abbr(state.userInfo.account)}}</p>
              </div>
            </template>
            <div
              class="flex flex-col cursor-pointer items-center rounded-[0.75rem] text-[#fff] bg-[#322558FF]">
              <div @click="onShowInfo" class="h-[3rem] w-[10.25rem] rounded-[0.5rem] text-center leading-[3rem] font-bold hover:bg-[#493d6a]"><NuxtLink to="/userInfo">{{ t('myreviews') }}</NuxtLink></div>
              <div @click="goSignOut" class="h-[3rem] w-[10.25rem] rounded-[0.5rem] text-center text-[#FF5353FF] leading-[3rem] font-bold hover:bg-[#493d6a] ">{{ t('logout') }}</div>
            </div>
          </el-popover>
          <div v-else class="h-[2rem] leading-[2rem] w-[11.25rem] bg-white 
            text-[#121D43] text-[1rem] text-center font-semibold rounded-[0.5rem] cursor-pointer" @click="connectClick()">
            {{ t('Connect')}}
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>
<script setup >
import web3js from '@/src/utils/link'
import { abbr } from '@/src/utils/utils'
import { userStore } from '@/src/stores/user'
import { onMounted, reactive} from 'vue'
import request from '@/src/utils/request'
import { useI18n } from  'vue-i18n'
import { useRuntimeConfig } from 'nuxt/app'
const { t,locale } = useI18n();
const store = userStore()
const router = useRouter()
const route = useRoute();
const runConfig = useRuntimeConfig()

const state = reactive ({
  language: computed(() => { return locale.value }),
  isSign: computed(() => store.getIsSign),
  userInfo: computed(() => store.getUserInfo),
})

const languageList = [
	{ key: 'ZH', label: '简体中文', value: 'ZH' },
	{ key: 'EN', label: 'English', value: 'EN' },
];

const onSetLanguage = (value) => {
  locale.value = value;
  localStorage.language = value
  state.languagePop.hide();
};

const connectClick = () => {
  web3js.connect().then((res) => {
		if(res == undefined) {return;}
    web3js.change().then(chanres => {
      if(chanres == true){
        goSignOut()
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
          data: "Welcome to DeCheck! Click to sign in and accept the DeCheck Terms of Service: https://decheck.io This request will not trigger a blockchain transaction or cost any gas fees."
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

const initLanguage = () => {
	locale.value = localStorage.language || 'EN';
};

const goSignOut = () => {
  store.isSign = false;
	store.userInfo = {};
  localStorage.language = ''
  localStorage.token = ""
  if(route.name == "comment" || route.name == "userInfo"){
    router.replace({
      name: 'explorer'
    })
  }
}

onMounted(()=>{
  initLanguage();
})

</script>

<style scoped>
.chad{
  height: 90px;
}
.logo{
  background: linear-gradient(225deg, #26fff270 0%, #7350ff70 100%);
}
:deep(.el-popover){
  padding: 0.56rem;
  border: none;
  border-radius: 0.75rem;
  background-color: #322558FF;
}
</style>