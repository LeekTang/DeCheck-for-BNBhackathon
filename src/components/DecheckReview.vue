<template>
  <div class="w-[75rem] mx-auto mt-[4rem]">
    <div class="text-[1.25rem] text-[#fff] font-extrabold">DECHECK REVIEW</div>
    <client-only>
      <el-select v-model="value" class="h-[3.5rem] w-[11.25rem] my-[1.5rem]" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </client-only>
    <div class="flex">
      <div class="w-[49.5rem]">
        <div v-for="(item, index) in commentList" :key="index" class="w-full common-bg p-[1.5rem] rounded-[0.75rem] mb-[1.75rem]">
          <div class="flex justify-between items-start">
            <div class="flex items-start">
              <div class="h-[2.5rem] w-[2.5rem] rounded-full bg-[#e6e6e6] mr-[0.63rem]"></div>
              <div class="mr-[0.63rem]">
                <p class="text-[0.88rem] text-[#fff] font-bold">{{item.name}}</p>
                <p class="text-[0.75rem] text-[#FFFFFFA8] ">{{item.address}}</p>
              </div>
              <div class="flex items-center h-[1rem] px-[0.5rem] py-[0.19rem] bg-[#11B466FF] rounded-[1.25rem] text-[#fff] text-[0.63rem] font-semibold">Reviewed: {{item.reviewed}}</div>
            </div>
            <el-rate disabled size="large" v-model="item.rate" />
          </div>
          <div class="mt-[1.5rem] bg-[#FFFFFF1C] rounded-[0.75rem] p-[1rem]">
            <div class="flex justify-between my-[1rem]">
              <div class="flex">
                <p v-for="(com,index) in item.label" :key="index" class="h-[1rem] leading-[1rem] rounded-[0.25rem] text-[0.63rem] text-[#fff] bg-[#FFFFFF1C] mr-[0.5rem] px-[0.5rem]">{{com}}</p>
              </div>
              <div class="text-[0.75rem] text-[#FFFFFFA8]">{{item.time}}</div>
            </div>
            <div class="text-[0.88rem] text-[#fff] leading-[1.25rem]">{{item.content}}</div>
          </div>
          <div v-if="item.images" class="mt-[1.5rem] w-full bg-[#FFFFFF1C] py-[1.5rem]">
            <swiper>
              <swiper-slide  v-for="(icon,index) in item.images" :key="index">
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
            <p>{{item.like}}</p>
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
import { onMounted,ref } from 'vue'

SwiperCore.use([Autoplay,Navigation])
const value = ref(1)
const options = [
  { value: 1, label: 'all', },
  { value: 2, label: 'latest', },
  { value: 3, label: 'hottest', },
]

const commentList = [
  {name: 'USER NAME', address: '0xe04C...1Bc2', reviewed: 25, rate: 4, label: ['General','Contract','Tokenomics'],time: "2023-02-21 18:23",content:"Within our ventures, the expansion circuit of Ethereum is inevitable. It is just a matter of how to make decisions on different projects with different technical points in different areas. arbitrum was often contrasted with optimism (op) and zksync.At that time, zksync2.0 had not been put on the line yet, and there was a lot of uncertainty about it, but its leading technology was beyond doubt, so we put zkrollup on hold for a while and compared it with op. If not to pick out the details, in general, arbitrum and op have one difference. Is that op at that time can only do 99% compatible with EVM, it does its own EVM execution level some instruction set is not enough support, but arbitrum is the first to do 100% compatible with EVM, Although it may seem a difference of 1%, but compared with op and arbitrum, arbitrum has a very big difference in the rapid roll-out of the market execution level. By the end of '21, there was some money available to try out some local dog projects on arbitrum. And then there were some good projects, like GMX, or some derivatives, because this kind of financial derivative is naturally suitable for layer2 to do. This case fully illustrates the importance of technological innovation itself, as well as how to better advance quickly in the market strategy. ",images:['images/test.png','images/test.png','images/test.png','images/test.png','images/test.png','images/test.png','images/test.png','images/test.png'], like: 46, islike: false},
  {name: 'ADMIN NAME', address: '0xe04C...1CB3', reviewed: 15, rate: 5, label: ['Contract','Tokenomics'],time: "2023-02-21 18:23",content:"Within our ventures, the expansion circuit of Ethereum is inevitable. It is just a matter of how to make decisions on different projects with different technical points in different areas. arbitrum was often contrasted with optimism (op) and zksync.At that time, zksync2.0 had not been put on the line yet, and there was a lot of uncertainty about it, but its leading technology was beyond doubt, so we put zkrollup on hold for a while and compared it with op. If not to pick out the details, in general, arbitrum and op have one difference. Is that op at that time can only do 99% compatible with EVM, it does its own EVM execution level some instruction set is not enough support, but arbitrum is the first to do 100% compatible with EVM, Although it may seem a difference of 1%, but compared with op and arbitrum, arbitrum has a very big difference in the rapid roll-out of the market execution level. By the end of '21, there was some money available to try out some local dog projects on arbitrum. And then there were some good projects, like GMX, or some derivatives, because this kind of financial derivative is naturally suitable for layer2 to do. This case fully illustrates the importance of technological innovation itself, as well as how to better advance quickly in the market strategy. ",video:'https://www.youtube.com/live/zUAX0NjR-7c?feature=share', like: 46, islike: true},
  {name: 'USER NAME', address: '0xe04C...1Bc2', reviewed: 25, rate: 4, label: ['General','Contract','Tokenomics'],time: "2023-02-21 18:23",content:"Within our ventures, the expansion circuit of Ethereum is inevitable. It is just a matter of how to make decisions on different projects with different technical points in different areas. arbitrum was often contrasted with optimism (op) and zksync.At that time, zksync2.0 had not been put on the line yet, and there was a lot of uncertainty about it, but its leading technology was beyond doubt, so we put zkrollup on hold for a while and compared it with op. If not to pick out the details, in general, arbitrum and op have one difference. Is that op at that time can only do 99% compatible with EVM, it does its own EVM execution level some instruction set is not enough support, but arbitrum is the first to do 100% compatible with EVM, Although it may seem a difference of 1%, but compared with op and arbitrum, arbitrum has a very big difference in the rapid roll-out of the market execution level. By the end of '21, there was some money available to try out some local dog projects on arbitrum. And then there were some good projects, like GMX, or some derivatives, because this kind of financial derivative is naturally suitable for layer2 to do. This case fully illustrates the importance of technological innovation itself, as well as how to better advance quickly in the market strategy. ",images:['images/test.png','images/test.png','images/test.png','images/test.png','images/test.png','images/test.png','images/test.png','images/test.png'], like: 46, islike: false},
]

onMounted(()=>{
  new Swipers('.swiper',{
    slidesPerView : 4,
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
})
</script>

<style scoped>
.common-bg{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
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