<template>
  <div class="w-[75rem] mx-auto mt-[4rem]">
    <div class="text-[1.25rem] text-[#fff] font-extrabold">{{ t('hotpeviews') }}</div>
    <div class="mt-[1.5rem]" @mousemove="mousEnter" @mouseleave="mousLeave">
      <swiper class="mySwiper">
        <swiper-slide class="swiper-no-swiping" v-for="(item,index) in state.hotList" :key="index">
          <div class="h-[19.5rem] w-[24rem] bg-[#F4F7FFFF] rounded-[1.25rem] p-[1.5rem] relative">
            <div class="flex justify-between items-end w-full">
              <img src="/images/mark.svg" class="h-[2rem] w-[2.56rem]">
              <el-rate disabled size="large" v-model="item.score" />
            </div>
            <div class="mt-[2rem] text-[1.13rem] text-[#121D43FF] font-bold only">{{item.projectName}}</div>
            <div class="mt-[0.6rem] text-[0.88rem] text-[#121D43A8] leading-[1.13rem] font-medium text-ellipsis">{{item.content}}</div>
            <div class="h-[5.5rem] w-full absolute bottom-0 left-0 reviews rounded-[1.25rem] p-[1.5rem] flex items-center">
              <div class="h-[2.5rem] w-[2.5rem] bg-[#E6E6E6FF] rounded-full mr-[0.63rem]"></div>
              <div class="text-[0.88rem] text-[#FFFFFF] font-medium">0xe04C...1Bc2</div>
            </div>
          </div>
        </swiper-slide>
        <div v-show="state.isShowNav" class="swiper-button-next transition duration-500 absolute right-0 top-0 h-full w-[4.88rem] bg-[#0000008c] z-50 flex justify-center items-center">
          <img src="/images/right.svg" class="h-[1.25rem] w-[1.25rem]">
        </div>
        <div v-show="state.isShowNav" class="swiper-button-prev absolute left-0 top-0 h-full w-[4.88rem] bg-[#0000008c] z-50 flex justify-center items-center">
          <img src="/images/left.svg" class="h-[1.25rem] w-[1.25rem]">
        </div>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { onMounted,ref } from 'vue'
import { ElRate } from 'element-plus'
import SwiperCore, {Autoplay, Navigation} from 'swiper'
import Swipers from 'swiper'
import request from '@/src/utils/request'
import { useI18n } from  'vue-i18n'
const { t,locale } = useI18n();

SwiperCore.use([Autoplay,Navigation])

const state = reactive({
  hotList: [],
  isShowNav: false
})

const mousEnter = () => {
  state.isShowNav = true  
}

const mousLeave = () => {
  state.isShowNav = false
}

const hotReviews = () => {
  request.get(`/plugin/decheck/api/project/review/hot`).then((res) => {
    state.hotList = res
  })
}

onMounted(()=>{
  new Swipers('.mySwiper',{
    slidesPerView: 3,
    loop:true,
    observer:true,
    observeParents:true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })
  hotReviews()
})

</script>

<style scoped>
.reviews{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}

.text-ellipsis{
  overflow:hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.only{
  width: 320px;
  display: block;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis
}
</style>