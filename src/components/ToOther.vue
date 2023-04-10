<template>
  <div class="w-[75rem] mx-auto mt-[4rem] flex justify-between">
    <div class="h-[29.25rem] w-[36.75rem] bg-[#fff] rounded-[1.25rem]">
      <div class="w-full h-[15rem] audit-bg rounded-[1.25rem]">
        <p class="text-[2.56rem] text-[#fff] font-bold pt-[4rem] pl-[4rem] leading-[2.5rem]">
          Audit
        </p>
        <p class="text-[3.5rem] text-bg font-extrabold pl-[4rem] leading-[3.5rem] mt-[1rem]">
          10,000
        </p>
      </div>
      <p class="text-[1.25rem] text-[#121D43FF] leading-[1.63rem] font-normal px-[4rem] pt-[1.5rem]">
        Professional community developers help you understand the project from all perspectives
      </p>
      <div
        class="h-[3.5rem] w-[11.25rem] button-bg leading-[3.5rem] text-center text-[1.13rem] text-[#fff] 
        font-black rounded-full mt-[3rem] ml-[4rem]"
      >
        GO
      </div>
    </div>
    <div class="h-[29.25rem] w-[36.75rem] bg-[#fff] rounded-[1.25rem]">
      <div class="w-full h-[15rem] reviewed-bg rounded-[1.25rem]">
        <p class="text-[2.56rem] text-[#fff] font-bold pt-[4rem] pl-[4rem] leading-[2.5rem]">
          Reviewed
        </p>
        <p class="text-[3.5rem] text-bg font-extrabold pl-[4rem] leading-[3.5rem] mt-[1rem]">
          100,000
        </p>
      </div>
      <p class="text-[1.25rem] text-[#121D43FF] leading-[1.63rem] font-normal px-[4rem] pt-[1.5rem]">
        Professional community developers help you understand the project from all perspectives
      </p>
      <div
        class="h-[3.5rem] w-[11.25rem] button-bg leading-[3.5rem] text-center text-[1.13rem] text-[#fff] 
        font-black rounded-full mt-[3rem] ml-[4rem]"
      >
        GO
      </div>
    </div>
  </div>
</template>

<style scoped>
.audit-bg {
  background: url("/images/other1.svg") right no-repeat,
    linear-gradient(225deg, #35329f 0%, #604c9a 100%);
}
.reviewed-bg {
  background: url("/images/other2.svg") right no-repeat,
    linear-gradient(225deg, #32519F 0%, #4C749A 100%);
}
.text-bg {
  background: linear-gradient(233deg, #a297ff 0%, #e6e2ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.button-bg {
  background: linear-gradient(180deg, #263b85 0%, #263b85 0%, #121d43 100%);
}
</style>