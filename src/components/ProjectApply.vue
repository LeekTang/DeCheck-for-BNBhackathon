<template>
  <div class="w-[75rem] mx-auto mt-[4rem]">
    <div class="text-[1.25rem] text-[#fff] font-extrabold mb-[1.5rem]">{{ t('projectApply') }}</div>
    <div class="h-[26.5rem] bottom-bg flex relative rounded-[1.25rem]">
      <div class="w-[42.31rem] py-[4rem] pl-[4rem] flex flex-col justify-between">
        <div>
          <p class="text-[2.56rem] text-[#121D43] font-extrabold leading-[3rem]">{{ t('applytitle') }}</p>
          <p class="text-[1.44rem] text-[#121D43] leading-[1.75rem] mt-[1.5rem]">{{ t('applytip') }}</p>
        </div>
        <div class="h-[3.5rem] w-[11.25rem] div-bg text-center leading-[3.5rem] text-[1.13rem] text-[#fff] font-black rounded-full mt-[4rem]"><NuxtLink to="/apply">{{ t('DeCheckDAO') }}</NuxtLink></div>
      </div>
      <img src="images/project-apply.svg" class="absolute right-0">
    </div>
  </div>
</template>

<script setup>
import { useI18n } from  'vue-i18n'
const { t,locale } = useI18n();

</script>

<style scoped>

.bottom-bg{
  background: linear-gradient(60deg, #F1FDFF 0%, #ADF0FF 100%);
}
.div-bg{
  background: linear-gradient(180deg, #263B85 0%, #263B85 0%, #121D43 100%);
}

</style>