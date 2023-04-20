<template>
  <div class="w-[75rem] mx-auto mt-[4rem]">
    <client-only>
      <el-select v-model="state.typeValue" class="h-[3.5rem] w-[11.25rem] my-[1.5rem]" size="large" :teleported="false">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </client-only>
    <div>
        <div v-for="(item, index) in state.commentList" :key="index" class="w-full common-bg p-[1.5rem] rounded-[0.75rem] mb-[1.75rem]">
          <div class="">
            <div class="text-[1.5rem] text-[#fff] font-bold leading-[1.5rem]">{{item.projectName}}</div>
            <el-rate disabled size="large" v-model="item.score" />
          </div>
          <div class="">
            <div class="flex justify-between my-[1rem]">
              <div class="flex">
                <p v-for="(com,index) in item.tags" :key="index" class="h-[1rem] leading-[1rem] rounded-[0.25rem] text-[0.63rem] text-[#fff] bg-[#FFFFFF1C] mr-[0.5rem] px-[0.5rem]">{{com}}</p>
              </div>
              <div class="text-[0.75rem] text-[#FFFFFFA8]">{{timestampToTime(item.createAt)}}</div>
            </div>
            <div :class="`${item.isEllipsis ? 'text-ellipsis' : ''} text-[0.88rem] text-[#FFFFFFA8] leading-[1.25rem]`">{{item.content}}</div>
            <div v-if="item.isShowMore" class="flex mt-[1rem]" @click="item.isEllipsis = !item.isEllipsis">
              <p class="text-[1rem] text-[#fff] font-bold">{{ item.isEllipsis ? 'View All' : 'Retract'}}</p>
              <img :src="item.isEllipsis ? '/images/down.svg' : '/images/up.svg'" class="h-[1.5rem] w-[1.5rem] " />
            </div>
          </div>
          <div v-if="item.attachment" class="mt-[1.5rem] w-full py-[1.5rem]">
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
              <!-- <source src="/1.mp4" type="video/mp4"> -->
            </video>
          </div>
          <div :class="`${item.islike ? 'bg-[#fff] text-[#121D43FF]' : 'text-[#FFFFFFA8]'} h-[2rem] w-[4.88rem] mt-[1.5rem] flex items-center justify-center border-2 border-[#FFFFFFA8] rounded-[0.75rem]`">
            <img :src="item.islike ? '/images/like.svg' : '/images/notlike.svg'" class="h-[1rem] w-[1rem] mr-[0.5rem]">
            <p>{{item.like}}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ElRate } from 'element-plus'
import SwiperCore, {Autoplay, Navigation} from 'swiper'
import Swipers from 'swiper'
import { onMounted, ref, reactive } from 'vue'
import request from '@/src/utils/request'
import { timestampToTime } from '@/src/utils/utils'
SwiperCore.use([Autoplay,Navigation])

const options = [
  { value: 1, label: 'All', },
  { value: 2, label: 'Audit only', },
  { value: 3, label: 'Review only', },
  { value: 4, label: 'Under review', },
  { value: 5, label: 'Not passed', },
]

const state = reactive({
  typeValue: 1,
  isEllipsis: true,
  commentList: []
})

const getComment = () => {
  request({url: '/plugin/decheck/api/user/review/page?page=1&pageSize=50',  method: 'get'}).then(res => {
    console.log(res)
    if(res.list){
      state.commentList = res.list
      state.commentList.forEach(el => {
        console.log(el.content.length);
        if(el.content.length < 800){
          el.isShowMore = false
        }
        el.isEllipsis = true
      })
    }
  })
}

onMounted(()=>{
  new Swipers('.swiper',{
    slidesPerView : 7,
    loop: true,
    observer:true,
    observeParents:true,
    observeSlideChildren:true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })
  getComment()
})
</script>

<style scoped>
:deep(.el-popper.is-light){
  background: #322559;
  border: none;
}

:deep(.el-select-dropdown__item){
  color: #fff;
}

:deep(.el-select-dropdown__item.hover, .el-select-dropdown__item:hover){
  background-color: #493d6a;
  border-radius: 0.25rem;
}

.common-bg{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}

.text-ellipsis{
  overflow:hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 7;
  display: -webkit-box;
  -webkit-box-orient: vertical;
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