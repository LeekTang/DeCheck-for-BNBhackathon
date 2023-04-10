<template>
  <div class="w-[75rem] mx-auto mt-[8rem]">
    <div class="text-[1.25rem] text-[#fff] font-extrabold">HOT PROJECTS</div>
    <div class="mt-[1.5rem]">
      <swiper>
        <swiper-slide class="swiper-no-swiping" v-for="(item,index) in 6" :key="index">
          <div class="h-[26.13rem] w-[24rem] bg-[#FFFFFF] rounded-[1.25rem] relative" @click="goUrl()">
            <img src="/images/test.png" class="w-full h-[18rem] rounded-[1.25rem]"/>
            <div class="h-[8.13rem] w-full absolute bottom-0 left-0 reviews rounded-[1.25rem] p-[1.5rem] flex flex-col justify-between">
              <p class="text-[1.13rem] text-[#121D43] font-bold">PREOJECTS NAME</p>
              <div class="flex justify-between">
                <div class="flex items-center">
                  <div class="h-[2.5rem] w-[2.5rem] bg-[#E6E6E6] rounded-full mr-[0.63rem]"></div>
                  <div>
                    <div class="text-[0.88rem] text-[#121D43] font-bold">USER NAME</div>
                    <div class="text-[0.75rem] text-[#121D43] font-medium">0xe04C...1Bc2</div>
                  </div>
                </div>
                <el-rate disabled size="large" v-model="value" />
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-button-next h-[4rem] w-[4rem] absolute right-[1rem] top-[50%] translate-y-[-50%] z-50">
          <img src="/images/project-right.svg" class="h-[4rem] w-[4rem]">
        </div>
        <div class="swiper-button-prev h-[4rem] w-[4rem] absolute left-0 top-[50%] translate-y-[-50%] z-50">
          <img src="/images/project-left.svg" class="h-[4rem] w-[4rem]">
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

const value = ref(5)

const router = useRouter()
const goUrl = () => {
  router.push({
    name: "ProjectDetails",
    
  })
}

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