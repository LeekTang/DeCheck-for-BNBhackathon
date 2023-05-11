<template>
  <div class="w-full bg-[#171025] h-[12.38rem mt-[4rem]">
    <div class="flex py-[3rem] mx-auto w-[75rem] justify-end">
      <img src="/images/twitter.svg" class="h-[2rem] w-[2rem] rounded-[0.5rem] ml-[0.88rem]" @click="goUrl('https://twitter.com/dCheck_io')">
      <img src="/images/discord.svg" class="h-[2rem] w-[2rem] rounded-[0.5rem] ml-[0.88rem]">
      <img src="/images/telegram.svg" class="h-[2rem] w-[2rem] rounded-[0.5rem] ml-[0.88rem]">
      <img src="/images/gitbook.svg" class="h-[2rem] w-[2rem] rounded-[0.5rem] ml-[0.88rem]">
    </div>
    <p class="border border-solid border-[#FFFFFF70] mx-auto w-[75rem]"></p>
    <p class="text-center text-[0.88rem] text-[#FFFFFF70] font-normal leading-[0.88rem] py-[1rem]">© 2022-2023 DeCheck</p>
  </div>
</template>

<script setup>

const goUrl = (url) => {
  if(url){
    window.open(url,'_blank')
  }
}
</script>