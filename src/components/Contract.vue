<template>
  <div class="w-[75rem] mx-auto mt-[4rem]">
    <div class="text-[1.25rem] text-[#fff] font-extrabold mb-[1.5rem]">{{ t('contractcheck')}}</div>
    <div class="h-[20.94rem] bg-[#F6F5FF] rounded-[1.25rem] relative">
      <div class="w-[42.31rem] h-full py-[4rem] pl-[4rem] z-10 relative flex flex-col justify-between">
        <p class="text-[2.56rem] text-[#121D43] font-extrabold leading-[3rem]">{{ t('selfservice') }}</p>
        <div class="h-[3.5rem] w-[11.25rem] cursor-pointer div-bg text-center leading-[3.5rem] text-[1.13rem] text-[#fff] font-black rounded-full mt-[4rem]">{{t('start')}}</div>
      </div>
      <img src="/images/contract-bg.svg" class="absolute right-0 top-0">
    </div>
  </div>
</template>

<script setup>
import { useI18n } from  'vue-i18n'
const { t,locale } = useI18n();
</script>

<style scoped>
.div-bg{
  background: linear-gradient(180deg, #263B85 0%, #263B85 0%, #121D43 100%);
}
</style>