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
              <img src="/images/avatar.png" class="h-[2.5rem] w-[2.5rem] rounded-full bg-[#e6e6e6] mr-[0.63rem]" />
              <div class="mr-[0.63rem] text-[0.75rem] text-[#FFFFFFA8] font-bold">{{abbr(item.userId)}}</div>
              <div class="flex items-center h-[1rem] px-[0.5rem] py-[0.19rem] bg-[#11B466FF] rounded-[1.25rem] text-[#fff] text-[0.63rem] font-semibold">Reviewed: {{item.reviewed}}</div>
            </div>
            <el-rate disabled size="large" v-model="item.score" />
          </div>
          <div class="mt-[1.5rem] bg-[#FFFFFF1C] rounded-[0.75rem] overflow-hidden p-[1rem]">
            <div class="flex justify-between mb-[1rem]">
              <div class="flex flex-wrap">
                <p v-for="(com,index) in item.tags" :key="index" class="h-[1rem] max-w-[5rem] overflow-hidden leading-[1rem] rounded-[0.25rem] text-[0.63rem] text-[#fff] bg-[#FFFFFF1C] mr-[0.5rem] px-[0.5rem]">{{com}}</p>
              </div>
              <div class="text-[0.75rem] text-[#FFFFFFA8]">{{timestampToTime(item.createAt)}}</div>
            </div>
            <p class="text-[0.88rem] text-[#fff] leading-[1.25rem] whitespace-pre-wrap" v-html="item.content"></p>
          </div>
          <div v-if="item.video" class="h-[11.63rem] w-[46.5rem] bg-[#FFFFFF1C] rounded-[0.75rem] mt-[1.5rem] flex justify-center items-center">
            <video class="h-[8.63rem] w-[43.44rem] rounded-[0.75rem]" v-for="(video,index) in item.attachment" :key="index" controls>
              <source :src="video" type="video/mp4">
            </video>
          </div>
          <div v-if="item.image" class="mt-[1.5rem] w-full relative bg-[#FFFFFF1C] py-[1.5rem] rounded-[0.75rem]">
            <swiper :class="`swiperc${index}`" class="swiper-no-swiping" :style="`${ item.attachment.length > 4 ? 'margin: 0 4rem' : ''}`">
              <swiper-slide  v-for="(icon,index) in item.attachment" :key="index" >
                <el-image :hide-on-click-modal="true" fit="cover" :preview-src-list="item.attachment" :initial-index="index" preview-teleported :src="icon" class="w-[8.63rem] h-[8.63rem] bg-[#312963FF] rounded-[0.75rem] ml-[0.75rem]"/>
              </swiper-slide>
            </swiper>
            <div v-if="item.attachment.length > 4" class="swiper-button-next h-[4rem] w-[4rem] absolute right-0 top-[50%] translate-y-[-50%] z-50">
                <img src="/images/project-right.svg" class="h-[4rem] w-[4rem]">
              </div>
              <div v-if="item.attachment.length > 4" class="swiper-button-prev h-[4rem] w-[4rem] absolute left-0 top-[50%] translate-y-[-50%] z-50">
                <img src="/images/project-left.svg" class="h-[4rem] w-[4rem]">
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
import { userStore } from '@/src/stores/user'
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
  selectValue: 1,
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
</style>