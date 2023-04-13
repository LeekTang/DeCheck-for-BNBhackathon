<template>
  <div class="w-[75rem] mx-auto mt-[4rem]">
    <div class="text-[1.25rem] text-[#fff] font-extrabold mb-[1.5rem]">{{t('DeCheckDAO')}}</div>
    <div class="w-full h-[23.75rem] con-bg rounded-[1.25rem] flex justify-between">
      <div class="p-[4rem] flex flex-col justify-between">
        <div>
          <p class="text-[1.44rem] text-[#FFFFFFA8] font-medium mb-[1rem] leading-[1.5rem]">{{t('developer')}}</p>
          <p class="text-[2.56rem] text-[#fff] leading-[2.5rem] font-extrabold text-bg">{{t('earnaudit')}}</p>
        </div>
        <div>
          <p class="text-[1.44rem] text-[#FFFFFFA8] font-medium mb-[1rem] leading-[1.5rem]">{{t('notdeveloper')}}</p>
          <p class="text-[2.56rem] text-[#fff] leading-[2.5rem] font-extrabold text-bg">{{t('earnreview')}}</p>
        </div>
      </div>
      <div class="w-[36.75rem] h-[20.75rem] mr-[1.5rem] mt-[1.5rem]">
        <swiper class="dao w-[36.75rem] h-[20.75rem]">
          <swiper-slide v-for="(item,index) in 3" :key="index">
            <div class="w-[36.75rem] h-[20.75rem] bg-[#F4F7FFFF] rounded-[1.25rem] relative">
              <img src="images/project-right.svg" class="w-full h-full"/>
            </div>
          </swiper-slide>
          <div class="swiper-button-next h-[4rem] w-[4rem] absolute right-0 top-[50%] translate-y-[-50%] z-50">
            <img src="/images/project-right.svg" class="h-[4rem] w-[4rem]">
          </div>
          <div class="swiper-button-next h-[4rem] w-[4rem] absolute left-0 top-[50%] translate-y-[-50%] z-50">
            <img src="/images/project-left.svg" class="h-[4rem] w-[4rem]">
          </div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import SwiperCore, {Autoplay, Navigation} from 'swiper'
import Swipers from 'swiper'
import { onMounted,ref } from 'vue'
import { useI18n } from  'vue-i18n'
const { t,locale } = useI18n();

SwiperCore.use([Autoplay,Navigation])

onMounted(()=>{
  new Swipers('.dao',{
    slidesPerView: 1,
    loop:true,
    observer:true,
    observeParents:true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })
})
</script>

<style scoped>
.con-bg{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}
.text-bg{
  display: inline-block;
  background: linear-gradient(225deg, #00DCB4 0%, #022BFF 100%);
  background-size: 100% 50%;
  background-repeat: no-repeat;
  background-position-y: bottom;
}
</style>