<template>
  <div class="keep-px bg-[#0a0118]">
    <div class="w-[75rem] mx-auto">
      <div class="top_line h-[108px]"></div>
      <div class="magical-borders w-full">
        <div class="magical-borders-content flex justify-between my-[64px] px-[40px]">
          <div class="w-[272px] h-[204px] myhoverbox" v-for="item,index in superiList" :key="item.id">
            <div class="magical-borders-inner relative" style="user-select: none;">
                <img class="mx-auto w-[260px] h-[156px]" alt="" src="/images/home/card-gridline.png">
                <img v-if="index==0" class="absolute top-[24px] left-[24px]" :src="item.num" alt="">
                <img v-else class="absolute top-[24px] left-[24px] w-[48px] h-[48px]" :src="item.num" alt="">
                <div class="content text-[18px]" style="font-family: Hezaedrus-Medium">{{t(item.content)}}</div>
            </div>
            <div class="light"></div>
          </div>
        </div>
      </div>
      <div class="bottom_line h-[108px]"></div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from  'vue-i18n'
const { t } = useI18n();
const superiList = [
  { icon: '/images/superi-coin1.svg', content: 'card_one', num: '/images/home/1.png' },
  { icon: '/images/superi-coin2.svg', content: 'card_two', num: '/images/home/2.png' },
  { icon: '/images/superi-coin3.svg', content: 'card_three', num: '/images/home/3.png' },
  { icon: '/images/superi-coin4.svg', content: 'card_four', num: '/images/home/4.png' },
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
  background: url('/images/home/about_top_line.png') no-repeat;
  background-size: 100% 100%;
}

.bottom_line {
  background: url('/images/home/about_bottom_line.png') no-repeat;
  background-size: 100% 100%;
}

.content {
  position: absolute;
  left: 20px;
  bottom: 20px;
  font-weight: 500;
  color: #FFFFFF;
}
</style>