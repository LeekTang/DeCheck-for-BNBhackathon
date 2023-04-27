<template>
  <div class="keep-px">
    <div class="w-[75rem] mx-auto mt-[110px]">
    
      <div class="top_line">
      </div>
      <div class="grid grid-cols-4 my-[64px] space-x-[10px] px-[40px]">
        <img class="w-[260px] h-[204px]" v-for="item, index in superiList" :src="item.num" alt="">
      </div>
      <div class="bottom_line"></div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();
const superiList = [
  { icon: '/images/superi-coin1.svg', content: 'advantage1', num: '/images/home/1.png' },
  { icon: '/images/superi-coin2.svg', content: 'advantage2', num: '/images/home/2.png' },
  { icon: '/images/superi-coin3.svg', content: 'advantage3', num: '/images/home/3.png' },
  { icon: '/images/superi-coin4.svg', content: 'advantage4', num: '/images/home/4.png' },
]
</script>
<style scoped>
.video-bg {
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}

.super {
  background: url('/images/superiority.svg') no-repeat, linear-gradient(225deg, #fef6ff 0%, #f7ccff 100%);
}

.top_line {
  height: 143px;
  background: url('../../public/images/home/about_top_line.png') no-repeat;
  background-size: 100% 100%;
}

.bottom_line {
  height: 143px;
  background: url('../../public/images/home/about_bottom_line.png') no-repeat;
  background-size: 100% 100%;
}
</style>