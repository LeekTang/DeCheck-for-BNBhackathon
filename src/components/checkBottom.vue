<template>
  <div class="w-[75rem] mx-auto mt-[1.5rem] mb-[14rem]" v-if="Object.keys(state.goInfo).length > 0">
    <div class="flex justify-between">
      <div class="w-[36.75rem] div-bg rounded-[1.25rem]">
        <div class="flex items-center justify-between bg-[#FFFFFF1C] h-[4rem] w-full px-[1.5rem]">
          <div class="text-[1.25rem] text-[#4972FFFF] font-bold">Token Holders Info</div>
          <div class="h-[2rem] w-[16.13rem] bg-[#1E50FFFF] flex items-center justify-between px-[1rem] rounded-[0.75rem]">
            <p class="text-[0.88rem] text-[#fff] font-bold">View on Browser</p>
            <img class="h-[0.63rem] w-[0.63rem]"/>
          </div>
        </div>
        <div class="p-[1.5rem]">
          <div class="flex justify-between items-center">
            <div class="">
              <p class="text-[1.5rem] text-[#fff] font-bold">{{state.goInfo.holder_count}}</p>
              <p class="text-[0.88rem] text-[#FFFFFFA8] font-bold">Token Holders</p>
            </div>
            <p class="text-[2.56rem] text-[#11B466] font-bold">{{holdALL()}}</p>
          </div>
          <el-progress v-if="state.goInfo.holders" :percentage="state.holdNow" :show-text="false" :stroke-width="12" color="#11B466" class="mt-[1rem]"/>
        </div>
        <div class="px-[1.5rem] mt-[1rem]">
          <p class="text-[1rem] text-[#fff] font-bold mb-[1rem]">Top 10 holders ratio</p>
          <div class="flex justify-between mb-[1rem]" v-for="(item,index) in state.goInfo.holders" :key="item">
            <p class="text-[0.88rem] text-[#FFFFFFA8] leading-[0.88rem] font-medium">{{index}}. {{plusXing(item.address)}}</p>
            <p class="text-[0.88rem] text-[#fff] leading-[0.88rem] font-bold">{{toshor(item.balance)}}({{tosix(item.percent)}})</p>
          </div>
        </div>
      </div>
      <div class="w-[36.75rem] div-bg rounded-[1.25rem]">
        <div class="flex items-center justify-between bg-[#FFFFFF1C] h-[4rem] w-full px-[1.5rem]">
          <div class="text-[1.25rem] text-[#4972FFFF] font-bold">LP Pool Info</div>
        </div>
        <div class="p-[1.5rem]">
          <div class="flex justify-between items-center">
            <div class="">
              <p class="text-[1.5rem] text-[#fff] font-bold">{{state.goInfo.lp_holder_count}}</p>
              <p class="text-[0.88rem] text-[#FFFFFFA8] font-bold">LP Holders</p>
            </div>
            <div class="">
              <p class="text-[1.5rem] text-[#fff] font-bold" v-if="state.goInfo.lp_total_supply">{{toshor(state.goInfo.lp_total_supply)}}</p>
              <p class="text-[0.88rem] text-[#FFFFFFA8] font-bold">Total Supply</p>
            </div>
            <p class="text-[2.56rem] text-[#4D75FFFF] font-bold">{{LPALL()}}</p>
          </div>
          <el-progress v-if="state.goInfo.lp_holders" :percentage="state.LPNow" :show-text="false" :stroke-width="12" color="#4D75FFFF" class="mt-[1rem]"/>
        </div>
        <div class="px-[1.5rem] mt-[1rem]">
          <p class="text-[1rem] text-[#fff] font-bold mb-[1rem]">Percentage of LP locked</p>
          <div class="flex justify-between mb-[1rem]" v-for="(item,index) in state.goInfo.lp_holders" :key="item">
            <p class="text-[0.88rem] text-[#FFFFFFA8] leading-[0.88rem] font-medium">{{index}}. {{plusXing(item.address)}}</p>
            <p class="text-[0.88rem] text-[#fff] leading-[0.88rem] font-bold">{{toshor(item.balance)}}({{tosix(item.percent)}})</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import request from '@/src/utils/request'
import { userStore } from '@/src/stores/user'
import { storeToRefs } from 'pinia'
const store = userStore();
const { searchInfo } = storeToRefs( store )

const state = reactive({
  goInfo: searchInfo.value,
  holdNow: 0,
  LPNow: 0
})

watch(searchInfo,() => {
  state.goInfo = searchInfo.value
})

const plusXing = (item) => {
  return item.substring(0,4) + '...' + item.substring(item.length - 4);
}

const tosix = (item) => {
  return Number(item * 100).toFixed(2) + '%'
}

const toshor = (item) => {
  return Number(item).toFixed(6)
}

const holdALL = () => {
  if(state.goInfo.holders != undefined){
      let a = state.goInfo.holders.reduce((sumData,key) => {
        return sumData + Number(key.percent)
      },0);
      state.holdNow = (a * 100).toFixed(0)
      return (a * 100).toFixed(0) + '%'
    } 
}

const aa = () =>{
  setTimeout(() => {
    if(state.goInfo.holders != undefined){
      let a = state.goInfo.holders.reduce((sumData,key) => {
        return sumData + Number(key.percent)
      },0);
      state.holdNow = Number((a * 100).toFixed(0))
    } 
  }, 1000);
}

const bb = () =>{
  setTimeout(() => {
    if(state.goInfo.lp_holders != undefined){
    let a = state.goInfo.lp_holders.reduce((sumData,key) => {
      return sumData + Number(key.percent)
    },0);
    state.LPNow = Number((a * 100).toFixed(0))
  }
  }, 1000);
}

const LPALL = () => {
  if(state.goInfo.lp_holders != undefined){
    let a = state.goInfo.lp_holders.reduce((sumData,key) => {
      return sumData + Number(key.percent)
    },0);
    state.LPNow = (a * 100).toFixed(0)
    return (a * 100).toFixed(0) + '%'
  }
}

onMounted(()=>{
  holdALL();
  LPALL();
  bb();
  aa();
})

</script>

<style scoped>
.div-bg{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}
</style>