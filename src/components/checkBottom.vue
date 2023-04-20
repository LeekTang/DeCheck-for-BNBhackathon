<template>
  <div class="w-[75rem] mx-auto mt-[1.5rem] mb-[14rem]" v-if="Object.keys(state.goInfo).length > 0">
    <div class="flex justify-between">
      <div class="w-[36.75rem] div-bg rounded-[1.25rem]">
        <div class="flex items-center justify-between bg-[#FFFFFF1C] h-[4rem] w-full px-[1.5rem] rounded-t-[1.25rem]">
          <div class="text-[1.25rem] text-[#4972FFFF] font-bold">{{t('tokenHoldersInfo')}}</div>
          <div class="h-[2rem] w-[16.13rem] bg-[#1E50FFFF] flex items-center justify-between px-[1rem] rounded-[0.75rem]">
            <p class="text-[0.88rem] text-[#fff] font-bold">View on Browser</p>
            <img class="h-[0.63rem] w-[0.63rem]"/>
          </div>
        </div>
        <template v-if="state.goInfo.holders">
          <div class="p-[1.5rem]">
            <div class="flex justify-between items-center">
              <div class="">
                <p class="text-[1.5rem] text-[#fff] font-bold">{{state.goInfo.holder_count}}</p>
                <p class="text-[0.88rem] text-[#FFFFFFA8] font-bold">{{t('tokenHolders')}}</p>
              </div>
              <p class="text-[2.56rem] text-[#11B466] font-bold">{{holdALL()}}</p>
            </div>
            <el-progress v-if="state.goInfo.holders" :percentage="state.holdNow" :show-text="false" :stroke-width="12" color="#11B466" class="mt-[1rem]"/>
          </div>
          <div class="px-[1.5rem] mt-[1rem]">
            <p class="text-[1rem] text-[#fff] font-bold mb-[1rem]">{{t('top10holders')}}</p>
            <div class="flex justify-between mb-[1rem]" v-for="(item,index) in state.goInfo.holders" :key="item">
              <p class="text-[0.88rem] text-[#FFFFFFA8] leading-[0.88rem] font-medium">{{index}}. {{abbr(item.address)}}</p>
              <p class="text-[0.88rem] text-[#fff] leading-[0.88rem] font-bold">{{toShort(item.balance, 2)}}({{tosix(item.percent)}})</p>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="h-[30rem] w-[36.75rem] flex flex-col justify-center items-center">
            <img src="/images/notLogo.png" class="w-[7.5rem] h-[8.3rem]" />
            <p class="text-[1rem] text-[#ffffffa8] mt-[1.5rem]">There is no LP holders data</p>
          </div>
        </template>
      </div>
      <div class="w-[36.75rem] div-bg rounded-[1.25rem]">
        <div class="flex items-center justify-between bg-[#FFFFFF1C] h-[4rem] w-full px-[1.5rem] rounded-t-[1.25rem]">
          <div class="text-[1.25rem] text-[#4972FFFF] font-bold">{{t('LPPoolInfo')}}</div>
        </div>
        <template v-if="state.goInfo.lp_holders">
          <div class="p-[1.5rem]">
            <div class="flex justify-between items-center">
              <div class="">
                <p class="text-[1.5rem] text-[#fff] font-bold">{{state.goInfo.lp_holder_count}}</p>
                <p class="text-[0.88rem] text-[#FFFFFFA8] font-bold">{{t('LPHolders')}}</p>
              </div>
              <div class="">
                <p class="text-[1.5rem] text-[#fff] font-bold" v-if="state.goInfo.lp_total_supply">{{toShort(state.goInfo.lp_total_supply, 2)}}</p>
                <p class="text-[0.88rem] text-[#FFFFFFA8] font-bold">{{t('totalSupply')}}</p>
              </div>
              <p class="text-[2.56rem] text-[#4D75FFFF] font-bold">{{LPALL()}}</p>
            </div>
            <el-progress v-if="state.goInfo.lp_holders" :percentage="state.LPNow" :show-text="false" :stroke-width="12" color="#4D75FFFF" class="mt-[1rem]"/>
          </div>
          <div class="px-[1.5rem] mt-[1rem]">
            <p class="text-[1rem] text-[#fff] font-bold mb-[1rem]">{{t('percentageOfLP')}}</p>
            <div class="flex justify-between mb-[1rem]" v-for="(item,index) in state.goInfo.lp_holders" :key="item">
              <p class="text-[0.88rem] text-[#FFFFFFA8] leading-[0.88rem] font-medium">{{index}}. {{abbr(item.address)}}</p>
              <p class="text-[0.88rem] text-[#fff] leading-[0.88rem] font-bold">{{toShort(item.balance, 2)}}({{tosix(item.percent)}})</p>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="h-[30rem] w-[36.75rem] flex flex-col justify-center items-center">
            <img src="/images/notLogo.png" class="w-[7.5rem] h-[8.3rem]" />
            <p class="text-[1rem] text-[#ffffffa8] mt-[1.5rem]">There is no Token holders data</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import request from '@/src/utils/request'
import { userStore } from '@/src/stores/user'
import { abbr, toShort } from '@/src/utils/utils'
import { useI18n } from  'vue-i18n'
const { t } = useI18n();
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

const tosix = (item) => {
  return Number(item * 100).toFixed(2) + '%'
}

const holdALL = () => {
  if(state.goInfo.holders != undefined){
      let a = state.goInfo.holders.reduce((sumData,key) => {
        return sumData + Number(key.percent)
      },0);
      state.holdNow = (a * 100).toFixed(2)
      return (a * 100).toFixed(2) + '%'
    } 
}

const holdPer = () =>{
  setTimeout(() => {
    if(state.goInfo.holders != undefined){
      let a = state.goInfo.holders.reduce((sumData,key) => {
        return sumData + Number(key.percent)
      },0);
      state.holdNow = Number((a * 100).toFixed(2))
    } 
  }, 1000);
}

const poolPer = () =>{
  setTimeout(() => {
    if(state.goInfo.lp_holders != undefined){
      let sum = 0;
      state.goInfo.lp_holders.forEach(el => {
        if(el.is_locked == 1){
          sum = sum + el.percent
        }
      });
      state.LPNow = Number((sum * 100).toFixed(2))
    }
  }, 1000);
}

const LPALL = () => {
  if(state.goInfo.lp_holders != undefined){
    let sum = 0;
    state.goInfo.lp_holders.forEach(el => {
      if(el.is_locked == 1){
        sum = sum + el.percent
      }
    });
    state.LPNow = (sum * 100).toFixed(2)
    return (sum * 100).toFixed(2) + '%'
  }
}

onMounted(()=>{
  holdALL();
  LPALL();
  poolPer();
  holdPer();
})

</script>

<style scoped>
.div-bg{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}
</style>