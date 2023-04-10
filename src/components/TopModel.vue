<template>
  <div class="top-bg h-[43.75rem] w-full px-[12.5rem] flex items-center justify-between">
    <div class="">
      <p class="text-[#fff] text-[1.25rem] font-black mb-[1rem]">DeCheck</p>
      <div class="ground w-[38.25rem] px-6 py-4 text-[#ffffffa8]">
        <img src="images/top-left.svg" class="h-[9.38rem] w-[35.25rem]">
        <p class="text-[1.13rem] font-semibold mt-[1.5rem]">HIGHLY - VEtTTED BLOCKCHAIN PROJECTS YOU CAN TRUST.</p>
      </div>
    </div>
    <div class="h-[28.56rem] w-[30.38rem] border-dashed">
      <img src="images/top-right.svg" class="">
    </div>
  </div>
</template>

<style scoped>
.top-bg{
  background: url('/images/top-bg.svg');
}
.ground{
  background: 
    linear-gradient(to left, #00FFFF, #00FFFF) right top no-repeat,
    linear-gradient(to bottom, #00FFFF,#00FFFF) right top no-repeat,
    linear-gradient(to left, #00FFFF, #00FFFF) left bottom no-repeat,
    linear-gradient(to bottom, #00FFFF, #00FFFF) left bottom no-repeat;
  background-size: 12px 24px, 24px 12px, 12px 24px, 24px 12px;
  background-color: #00ffff14;
}
</style>