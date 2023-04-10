<template>
  <div class="w-[75rem] mx-auto mt-[4rem]">
    <div class="text-[1.25rem] text-[#fff]">WHAT'S DeCheck</div>
    <div class="w-[75rem] h-[42.19rem] mt-[2rem] relative video-bg rounded-[1.25rem]">
      <div class="text-[2.56rem] text-[#fff] font-bold absolute bottom-[3.31rem] left-[4rem]">WHAT'S DeCheck</div>
    </div>
    <div class="mt-[4rem] rounded-[1.25rem] p-[1.5rem] super">
      <div class="grid grid-flow-row grid-cols-2 gap-[1.5rem] w-[46.5rem]">
        <div class="h-[11rem] w-[22.5rem] bg-[#fff] rounded-[1rem] px-[2.5rem] py-[1.5rem] relative" v-for="(item,index) in superiList" :key="index">
          <img :src="item.icon" class="h-[3rem] w-[3rem] mb-[2rem]">
          <p class="text-[1.25rem] tetx-[#121D43FF] leading-[1.5rem] font-semibold">{{item.content}}</p>
          <img :src="item.num" class="h-[8rem] w-[2.3rem] absolute bottom-0 right-[1.25rem] max-w-full max-h-full">
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const superiList = [
  {icon: '/images/superi-coin1.svg',content: 'An organization for project reviews', num: '/images/1.svg'},
  {icon: '/images/superi-coin2.svg',content: 'Join DeCheck for project reviews', num: '/images/2.svg'},
  {icon: '/images/superi-coin3.svg',content: 'Complete project reviews for airdrop', num: '/images/3.svg'},
  {icon: '/images/superi-coin4.svg',content: 'More airdrops if you’re a developer', num: '/images/4.svg'},
]
</script>
<style scoped>
.video-bg{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}
.super{
  background: url('/images/superiority.svg') no-repeat,linear-gradient(225deg, #fef6ff 0%, #f7ccff 100%);
}
</style>