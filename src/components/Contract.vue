<template>
  <div class="keep-px">
    <div class="w-[75rem] mx-auto mt-[4rem]">
      <div class="text-[1.25rem] text-[#fff] font-extrabold mb-[1.5rem] text-center">{{ t('contractcheck') }}</div>
      <div class="self flex items-center justify-center">
        <img class="w-[40px] h-[40px]" src="../../public/images/home/line_star.png" alt="">
        <div class="mx-[34px]" v-html="t('selfservice')">
        </div>
        <img class="w-[40px] h-[40px]" src="../../public/images/home/line_star.png" alt="">
      </div>
      <img class="mt-[80px] h-[340px]" src="../../public/images/home/self_check.png" alt="">
      <NuxtLink to="/check">
        <button class="mb-[200px]">
          {{ t('start') }}</button>
      </NuxtLink>
      <div class="feel_free">
        <img class="w-[100px] h-[100px]" src="../../public/images/home/feel_icon.png" alt="">
        <div class="mt-[40px] text-center text-[20px] text-[#fff] font-[700]">
          {{ t('DeCheckDAO') }}
        </div>
        <div class="mt-[28px] flex items-center justify-center">
          <img class="w-[40px] h-[40px]" src="../../public/images/home/star.png" alt="">
          <div class="mx-[50px] text-[60px] font-[700] text-center feel_text leading-[60px]" v-html="t('check')">
          </div>
          <img class="w-[40px] h-[40px]" src="../../public/images/home/star.png" alt="">
        </div>
        <div class="feel_tips">
          {{t(t('check_tips'))}}
        </div>
        <NuxtLink to="/dao">
          <button class="mt-[32px]">
            {{ t('join') }}</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();
</script>

<style scoped>
.self {
  font-weight: 700;
  font-size: 60px;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
}

button {
  margin-top: 32px;
  position: relative;
  left: 50%;
  width: 180px;
  height: 56px;
  background: linear-gradient(180deg, #F1F5FF 0%, #8B96AF 100%);
  border: 1px solid #E6E9EE;
  border-radius: 100px;
  font-weight: 500;
  font-size: 20px;
  color: #151515;
  transform: translateX(-50%);
}

.feel_free {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 68px;
  background: url('../../public/images/home/feel_free_bg.png') no-repeat;
  background-size: 100% 100%;
}

.feel_text {
  color: rgba(255, 255, 255, 0.88);
}

.feel_tips {
  margin-top: 32px;
  font-weight: 500;
  font-size: 23px;
  text-align: center;
  color: #FFFFFF;
  opacity: 0.44;
}
</style>