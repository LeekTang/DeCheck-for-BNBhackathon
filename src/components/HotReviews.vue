<template>
  <div class="w-full px-[12.5rem] mt-[4rem]">
    <div class="text-[1.25rem] text-[#fff]">HOT REVIEWS</div>
    <div class="mt-[1.5rem]" @mousemove="mousEnter" @mouseleave="mousLeave">
      <swiper>
        <swiper-slide class="swiper-no-swiping" v-for="(item,index) in 6" :key="index">
          <div class="h-[19.5rem] w-[24rem] bg-[#F4F7FFFF] rounded-[1.25rem] p-[1.5rem] relative">
            <div class="flex justify-between items-end w-full">
              <img src="/images/mark.svg" class="h-[2rem] w-[2.56rem]">
              <el-rate disabled size="large" v-model="value" />
            </div>
            <div class="mt-[2rem] text-[1.13rem] text-[#121D43FF] font-bold">{{index}}A conceptual design for a blog...</div>
            <div class="mt-[0.6rem] text-[0.88rem] text-[#121D43A8] leading-[1.13rem] font-medium">When people make comments, they are giving their opinion or perspective on something in the form of an observation or criticism. Comments are usually short statements. </div>
            <div class="h-[5.5rem] w-full absolute bottom-0 left-0 reviews rounded-[1.25rem] p-[1.5rem] flex items-center">
              <div class="h-[2.5rem] w-[2.5rem] bg-[#E6E6E6FF] rounded-full mr-[0.63rem]"></div>
              <div>
                <div class="text-[0.88rem] text-[#FFFFFFFF] font-bold">USER NAME</div>
                <div class="text-[0.75rem] text-[#FFFFFFA8] font-medium">0xe04C...1Bc2</div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <div v-show="isShowNav" class="swiper-button-next transition duration-500 absolute right-0 top-0 h-full w-[4.88rem] bg-[#0000008c] z-50 flex justify-center items-center">
          <img src="/images/right.svg" class="h-[1.25rem] w-[1.25rem]">
        </div>
        <div v-show="isShowNav" class="swiper-button-prev absolute left-0 top-0 h-full w-[4.88rem] bg-[#0000008c] z-50 flex justify-center items-center">
          <img src="/images/left.svg" class="h-[1.25rem] w-[1.25rem]">
        </div>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElRate } from 'element-plus'
import SwiperCore, {Autoplay, Navigation} from 'swiper'
import Swipers from 'swiper'
import { onMounted,ref } from 'vue'

SwiperCore.use([Autoplay,Navigation])

const isShowNav = ref(false)

const mousEnter = () => {
  isShowNav.value = true  
}

const mousLeave = () => {
  isShowNav.value = false
}

const value = ref(3)

onMounted(()=>{
  new Swipers('.swiper',{
    slidesPerView: 3,
    loop:true,
    observer:true,
    observeParents:true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    }
  })
})

</script>

<style scoped>
.reviews{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}
</style>