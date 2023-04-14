<template>
  <div class="w-[75rem] mx-auto mt-[8rem]">
    <div class="text-[1.25rem] text-[#fff] font-extrabold">{{ t('hotProjects')}}</div>
    <div class="mt-[1.5rem]">
      <swiper>
        <swiper-slide class="swiper-no-swiping" v-for="(item,index) in state.hotPorject" :key="index">
          <div class="h-[26.13rem] w-[24rem] bg-[#FFFFFF] rounded-[1.25rem] relative" @click="goUrl(item.id)">
            <img :src="item.logo" class="w-full h-[18rem] rounded-[1.25rem]" @error="imgError"/>
            <div class="h-[8.13rem] w-full absolute bottom-0 left-0 reviews rounded-[1.25rem] p-[1.5rem] flex flex-col justify-between">
              <p class="text-[1.13rem] text-[#121D43] font-bold">{{item.name}}</p>
              <div class="flex justify-between">
                <div class="flex items-center">
                  <div class="h-[2.5rem] w-[2.5rem] bg-[#E6E6E6] rounded-full mr-[0.63rem]"></div>
                  <div class="text-[0.75rem] text-[#121D43] font-bold">{{item.tokenList ? abbr(item.tokenList[0][1]) : '--'}}</div>
                </div>
                <el-rate disabled size="large" v-model="item.score" />
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

<script setup>
import { ElRate } from 'element-plus'
import SwiperCore, {Autoplay, Navigation} from 'swiper'
import Swipers from 'swiper'
import { onMounted, ref, reactive } from 'vue'
import { abbr, imgError } from '@/src/utils/utils'
import request from '@/src/utils/request'
import { useI18n } from  'vue-i18n'
const { t,locale } = useI18n();

SwiperCore.use([Autoplay,Navigation])
const router = useRouter()

const state = reactive({
  hotPorject: []
})

const goUrl = (id) => {
  router.push({
    name: "ProjectDetails",
    query: { id: id}
  })
}

const getHotProject = () => {
  request.get(`/plugin/decheck/api/project/hot`).then((res) => {
    res.forEach(ele => {
      if(ele.tokenAddr){
        ele.tokenList = Object.entries(ele.tokenAddr)
      }
    });
    state.hotPorject = res
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
      delay: 5000,
      disableOnInteraction: false
    }
  })
  getHotProject();
})
</script>