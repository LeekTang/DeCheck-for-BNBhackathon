<template>
  <div class="w-[75rem] mx-auto mt-[6.5rem]">
    <div class="text-[1.25rem] text-[#fff] font-extrabold">{{ t('hotProjects')}}</div>
    <div class="mt-[1.5rem]">
      <swiper class="hotSwiper">
        <swiper-slide class="swiper-no-swiping" v-for="(item,index) in state.hotPorject" :key="index">
          <div class="h-[23rem] w-[17.62rem] bg-[#110921] rounded-[1.25rem] p-[1.25rem] border border-solid border-[#ffffff1c]" @click="goUrl(item.id)">
            <img :src="item.logo" class="w-[14.62rem] h-[14.62rem] rounded-[0.75rem] m-auto cursor-pointer" @error="imgError"/>
            <p class="text-[1rem] text-[#fff] mt-[1rem] text-ellipsis h-[40px]">{{item.name}}</p>
            <el-rate disabled size="large" v-model="item.score" />
          </div>
        </swiper-slide>
        <div class="swiper-button-next cursor-pointer h-[4rem] w-[4rem] absolute right-[1rem] top-[50%] translate-y-[-50%] z-50">
          <img src="/images/project-right.svg" class="h-[4rem] w-[4rem]">
        </div>
        <div class="swiper-button-prev cursor-pointer h-[4rem] w-[4rem] absolute left-0 top-[50%] translate-y-[-50%] z-50">
          <img src="/images/project-left.svg" class="h-[4rem] w-[4rem]">
        </div>
      </swiper>
      <el-skeleton :loading="state.loading" animated>
        <template #template>
          <el-skeleton-item variant="rect" style="width: 282px; height: 368px; border-radius: 20px; background: #110921;border: 1px solid #ffffff1c; margin-right: 24px"/>
          <el-skeleton-item variant="rect" style="width: 282px; height: 368px; border-radius: 20px; background: #110921;border: 1px solid #ffffff1c; margin-right: 24px"/>
          <el-skeleton-item variant="rect" style="width: 282px; height: 368px; border-radius: 20px; background: #110921;border: 1px solid #ffffff1c; margin-right: 24px"/>
          <el-skeleton-item variant="rect" style="width: 282px; height: 368px; border-radius: 20px; background: #110921;border: 1px solid #ffffff1c;"/>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup>
import { ElRate } from 'element-plus'
import SwiperCore, {Autoplay, Navigation} from 'swiper'
import Swipers from 'swiper'
import { onMounted, ref, reactive } from 'vue'
import { imgError } from '@/src/utils/utils'
import request from '@/src/utils/request'
import { useI18n } from  'vue-i18n'
const { t } = useI18n();

SwiperCore.use([Autoplay,Navigation])
const router = useRouter()

const state = reactive({
  hotPorject: [],
  loading: true
})

const goUrl = (id) => {
  router.push({
    name: "ProjectDetails",
    query: { id: id}
  })
}

const getHotProject = () => {
  state.hotPorject = JSON.parse(localStorage.getItem('hotProject')) || [];
  if(state.hotPorject.length > 0 ){
    state.loading = false
  }
  new Swipers('.hotSwiper',{
      slidesPerView: 4,
      loop:true,
      initialSlide: 1,
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
  request.get(`/plugin/decheck/api/project/hot`).then((res) => {
    state.loading = false
    res.forEach(ele => {
      if(ele.tokenAddr){
        ele.tokenList = Object.entries(ele.tokenAddr)
      }
    });
    state.hotPorject = res
    localStorage.setItem('hotProject',JSON.stringify(state.hotPorject))
  })
}

onMounted(()=>{
  getHotProject();
})
</script>

<style scoped>
.swbg{
  background: linear-gradient(262.88deg, #363574 0%, #2A1C52 99.99%);
}

.text-ellipsis{
  overflow:hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

:deep(.el-rate__icon){
  font-size: 24px !important;
}
</style>