<template>
  <div class="w-[75rem] mx-auto mt-[4rem]" v-if="state.comments">
    <div class="text-[1.25rem] text-[#fff] font-extrabold">DECHECK REVIEW</div>
    <client-only>
      <el-select v-model="state.selectValue" class="h-[3.5rem] w-[11.25rem] my-[1.5rem]" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </client-only>
    <div class="flex">
      <div class="w-[49.5rem]">
        <div v-for="(item, index) in state.comments" :key="index" class="w-full common-bg p-[1.5rem] rounded-[0.75rem] mb-[1.75rem]">
          <div class="flex justify-between items-start">
            <div class="flex items-start">
              <div class="h-[2.5rem] w-[2.5rem] rounded-full bg-[#e6e6e6] mr-[0.63rem]"></div>
              <div class="mr-[0.63rem] text-[0.75rem] text-[#FFFFFFA8] font-bold">{{item.userId}}</div>
              <div class="flex items-center h-[1rem] px-[0.5rem] py-[0.19rem] bg-[#11B466FF] rounded-[1.25rem] text-[#fff] text-[0.63rem] font-semibold">Reviewed: {{item.reviewed || '--'}}</div>
            </div>
            <el-rate disabled size="large" v-model="item.score" />
          </div>
          <div class="mt-[1.5rem] bg-[#FFFFFF1C] rounded-[0.75rem] p-[1rem]">
            <div class="flex justify-between my-[1rem]">
              <div class="flex flex-wrap">
                <p v-for="(com,index) in item.tags" :key="index" class="h-[1rem] max-w-[5rem] overflow-hidden leading-[1rem] rounded-[0.25rem] text-[0.63rem] text-[#fff] bg-[#FFFFFF1C] mr-[0.5rem] mb-[0.5rem] px-[0.5rem]">{{com}}</p>
              </div>
              <div class="w-[15.5rem] text-[0.75rem] text-[#FFFFFFA8]">{{item.createAt}}</div>
            </div>
            <div class="text-[0.88rem] text-[#fff] leading-[1.25rem]">{{item.content}}</div>
          </div>
          <div v-if="item.attachment" class="mt-[1.5rem] w-full bg-[#FFFFFF1C] py-[1.5rem]">
            <swiper>
              <swiper-slide  v-for="(icon,index) in item.attachment" :key="index">
                <img :src="icon" class="w-[8.63rem] h-[8.63rem] rounded-[0.75rem] ml-[0.75rem]"/>
              </swiper-slide>
              <div class="swiper-button-next h-[4rem] w-[4rem] absolute right-0 top-[50%] translate-y-[-50%] z-50">
                <img src="/images/project-right.svg" class="h-[4rem] w-[4rem]">
              </div>
              <div class="swiper-button-prev h-[4rem] w-[4rem] absolute left-0 top-[50%] translate-y-[-50%] z-50">
                <img src="/images/project-left.svg" class="h-[4rem] w-[4rem]">
              </div>
            </swiper>
          </div>
          <div v-if="item.video" class="h-[11.63rem] w-[46.5rem] bg-[#FFFFFF1C] rounded-[0.75rem] mt-[1.75rem] flex justify-center items-center">
            <video class="h-[8.63rem] w-[43.44rem] rounded-[0.75rem]" controls autoplay>
              <source src="1.mp4" type="video/mp4">
            </video>
          </div>
          <div :class="`${item.islike ? 'bg-[#fff] text-[#121D43FF]' : 'text-[#FFFFFFA8]'} h-[2rem] w-[4.88rem] mt-[1.5rem] flex items-center justify-center border-2 border-[#FFFFFFA8] rounded-[0.75rem]`">
            <img :src="item.islike ? 'images/like.svg' : 'images/notlike.svg'" class="h-[1rem] w-[1rem] mr-[0.5rem]">
            <p>{{item.like || '--'}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElRate } from 'element-plus'
import SwiperCore, {Autoplay, Navigation} from 'swiper'
import Swipers from 'swiper'
import { onMounted,ref, reactive, defineProps } from 'vue'
import request from '@/src/utils/request'
SwiperCore.use([Autoplay,Navigation])

const options = [
  { value: 1, label: 'all', },
  { value: 2, label: 'latest', },
  { value: 3, label: 'hottest', },
]

const props = defineProps({
  projectID: {
    type: String
  }
})

const state = reactive({
  selectValue: 1,
  comments: {}
})

const projectInfo = () => {
  request.get(`/plugin/decheck/api/project/detail/review/${props.projectID}`).then((res) => {
    state.comments = res
  })
}

onMounted(()=>{
  new Swipers('.swiper',{
    loop: true,
    observer:true,
    observeParents:true,
    observeSlideChildren:true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    }
  })
  projectInfo()
})
</script>

<style scoped>
.common-bg{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}

.swiper-slide{
width: auto!important;
margin-right: 15px!important;
}

:deep(.el-input__wrapper){
  background: #474174;
  box-shadow: none;
  border-radius: 1.25rem;
}

:deep(.select-trigger .el-input__wrapper){
  height: 3.5rem;
}
:deep(.el-input__inner){
  color: #fff;
}
</style>