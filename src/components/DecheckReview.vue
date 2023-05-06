<template>
  <div class="w-[75rem] mx-auto mt-[4rem]  mb-[14rem]" v-if="state.comments">
    <div class="text-[1.25rem] text-[#fff] font-extrabold">{{t('decheckReview')}}</div>
    <client-only>
      <el-select v-model="state.selectValue" class="h-[3.5rem] w-[17.62rem] my-[1.5rem]" size="large" :teleported="false" @change="sortClick">
        <el-option v-for="item in options" :key="item.value" :label=item.label :value="item.value" />
      </el-select>
    </client-only>
    <div class="flex">
      <div class="w-[49.5rem]">
        <div v-for="(item, index) in state.comments" :key="index" 
          class="w-full bg-[#110921] p-[1.5rem] rounded-[1.25rem] mb-[1.75rem] border border-solid border-[#ffffff1c]">
          <div class="flex justify-between items-start">
            <div class="flex items-center">
              <div :class="`${item.type == 1 ? 'avatar' : ''} h-[2.5rem] w-[2.5rem] rounded-full mr-[0.63rem] relative `">
                <img src="/images/avatar.png" class="h-[2.5rem] w-[2.5rem] rounded-full" />
              </div>
              <div class="mr-[0.63rem] text-[0.75rem] text-[#FFFFFFA8] font-bold">{{abbr(item.userId)}}</div>
              <div :class="`${item.type == 1 ? 'reviewed' : 'bg-[#11B466]'} flex items-center h-[1.2rem] px-[0.5rem] rounded-[1.25rem] text-[#fff] text-[0.63rem] font-semibold`">Reviewed: {{item.reviewed}}</div>
            </div>
            <el-rate disabled size="large" v-model="item.score" />
          </div>
          <div :class="`${item.type == 1 ? 'content-wrap' : ''} relative  bg-[#FFFFFF1C] rounded-[0.75rem]`">
            <div class="mt-[1.5rem] rounded-[0.75rem] overflow-hidden p-[1rem] relative">
              <div class="flex justify-between mb-[1rem]">
                <div class="flex flex-wrap">
                  <p v-for="(com,index) in item.tags" :key="index" class="h-[1rem] max-w-[5rem] overflow-hidden leading-[1rem] rounded-[0.25rem] text-[0.63rem] text-[#fff] bg-[#FFFFFF1C] mr-[0.5rem] px-[0.5rem]">{{com}}</p>
                </div>
                <div class="text-[0.75rem] text-[#FFFFFFA8]">{{timestampToTime(item.createAt)}}</div>
              </div>
              <p class="text-[0.88rem] text-[#fff] leading-[1.25rem] whitespace-pre-wrap" v-html="item.content"></p>
            </div>
            <div v-if="item.video" class="h-[11.63rem] w-[46.5rem] rounded-[0.75rem] mt-[1.5rem] flex justify-center items-center">
              <video class="h-[8.63rem] w-[43.44rem] rounded-[0.75rem]" v-for="(video,index) in item.attachment" :key="index" controls>
                <source :src="video" type="video/mp4">
              </video>
            </div>
            <div v-if="item.image" class="mt-[1.5rem] relative py-[1.5rem] rounded-[0.75rem] mx-[1rem]">
              <swiper :class="`swiperc${index}`" class="swiper-no-swiping" :style="`${ item.attachment.length > 4 ? 'margin: 0 5rem' : ''}`">
                <swiper-slide  v-for="(icon,index) in item.attachment" :key="index" >
                  <el-image :hide-on-click-modal="true" fit="cover" :preview-src-list="item.attachment" :initial-index="index" preview-teleported :src="icon" class="w-[110px] h-[110px] bg-[#312963FF] rounded-[0.75rem] ml-[0.75rem]"/>
                </swiper-slide>
              </swiper>
              <div v-if="item.attachment.length > 4" class="swiper-button-next h-[4rem] w-[4rem] absolute right-0 top-[50%] translate-y-[-50%] z-50">
                  <img src="/images/swiper_right.svg" class="h-[4rem] w-[4rem]">
                </div>
                <div v-if="item.attachment.length > 4" class="swiper-button-prev h-[4rem] w-[4rem] absolute left-0 top-[50%] translate-y-[-50%] z-50">
                  <img src="/images/swiper_left.svg" class="h-[4rem] w-[4rem]">
                </div>
            </div>
          </div>
          <div 
            :class="`${item.liked ? 'bg-[#fff] text-[#121D43FF]' : 'text-[#FFFFFFA8]'} h-[2rem] w-[4.88rem] mt-[1.5rem] 
            flex items-center justify-center border-2 border-[#FFFFFFA8] rounded-[0.75rem] cursor-pointer`" @click="likeClick(item.liked,item.id)">
            <img :src="item.liked ? '/images/like.svg' : '/images/notlike.svg'" class="h-[1rem] w-[1rem] mr-[0.5rem]">
            <p>{{item.helpful}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElRate,ElImage, ElMessage } from 'element-plus'
import SwiperCore, {Autoplay, Navigation} from 'swiper'
import Swipers from 'swiper'
import { onMounted,ref, reactive, defineProps } from 'vue'
import request from '@/src/utils/request'
import web3js from '@/src/utils/link'
import { abbr,timestampToTime, matchType } from '@/src/utils/utils'
SwiperCore.use([Autoplay,Navigation])
import { useI18n } from  'vue-i18n'
const { t } = useI18n();
import { MD5 } from '@/src/utils/md5'
import { userStore } from '@/src/stores/user'
import { useFetch } from 'nuxt/app'
const store = userStore();
const runConfig = useRuntimeConfig()

const options = [
  { value: 1, label: t('latest'), },
  { value: 2, label: t('hottest'), },
]

const props = defineProps({
  projectID: {
    type: String
  }
})

const state = reactive({
  selectValue: 2,
  comments: [],
  isSign: computed(() => store.getIsSign),
})

const projectInfo = () => {
  request.get(`/plugin/decheck/api/project/detail/review/page/${props.projectID}?page=1&pageSize=50&sort=${state.selectValue}`).then((res) => {
    if(res.list){
      state.comments = res.list
      state.comments.forEach((el,index) => {
        if(el.attachment){
          if(matchType(el.attachment[0]) == 'video' && el.attachment.length == 1){
            el.video = true
          }else if(matchType(el.attachment[0]) == 'image' && el.attachment.length >= 1){
            el.image = true
            setTimeout(() => {
              new Swipers(`.swiperc${index}`,{
                slidesPerView: 4,
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
              })
            }, 1000);
          }
        }
      });
    }
  })
}


const likeClick = (type,id) => {
  if(state.isSign){
    state.comments.forEach((el,index) => {
      if(el.id == id){
        el.liked = !type
        if(el.liked){
          el.helpful = el.helpful + 1;
        }else{
          el.helpful = el.helpful - 1;
        }
      }
    });
    request.get(`/plugin/decheck/api/user/review/like/${id}`).then(res => {
      projectInfo()
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
  
}

const sortClick = (val) => {
  projectInfo()
}

onMounted(()=>{
  projectInfo()
})
</script>

<style scoped>

.content-wrap:before{
  content: '';
  position: absolute;
  inset: 0px;
  height: 100%;
  width: 100%;
  background: radial-gradient(#c42d01 0%, #c42d01 10%, #fcf26e 40%, #00e754 60%, #00eef4 70%, #0070f3 100%);
  background-size: 300% 300%;
  padding: 2px;
  border-radius: 0.75rem;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: shining-gradient-svg_translateGradient 10s linear infinite;
  will-change: background-position;
}

.avatar:before{
  content: '';
  position: absolute;
  inset: -2px;
  height: 110%;
  width: 110%;
  background: radial-gradient(#c42d01 0%, #c42d01 10%, #fcf26e 40%, #00e754 60%, #00eef4 70%, #0070f3 100%);
  background-size: 300% 300%;
  padding: 2px;
  border-radius: 30rem;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: shining-gradient-svg_translateGradient 10s linear infinite;
  will-change: background-position;
}

.reviewed{
  background: radial-gradient(#11B466 0%, #1E50FF 100%);
  background-size: 300% 300%;
  animation: shining-gradient-svg_translateGradient 10s linear infinite;
  will-change: background-position;
  -webkit-mask: none;
  mask: none;
  -webkit-mask-composite: none;
  mask-composite: none;
}

@keyframes shining-gradient-svg_translateGradient {
    0% {
        background-position: -20% -20%;
    }

    25% {
        background-position: 30% 80%;
    }

    50% {
        background-position: 110% 110%;
    }

    75% {
        background-position: 80% 30%;
    }

    to {
        background-position: -20% -20%;
    }
}

/* 下拉选择样式 */
:deep(.el-input__wrapper){
  height: 3.5rem;
  background-color: #ffffff1c;
  box-shadow: none;
  border-radius: 20px;
}

:deep(.el-input__inner){
  color: #fff;
}

:deep(.el-select-dropdown__item.hover, .el-select-dropdown__item:hover){
  background-color: #493d6a;
  border-radius: 0.25rem;
}

:deep(.el-select-dropdown__item){
  height: 3rem;
  line-height: 3rem;
  color: #fff;
  margin: 0 0.5rem;
}

:deep(.el-popper.is-light){
  background-color: #252033;
  border: none;
}

:deep(.el-rate__icon){
  font-size: 20px !important;
}
</style>