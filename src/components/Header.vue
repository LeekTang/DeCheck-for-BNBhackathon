<template>
  <div class="w-full flex items-center justify-between fixed top-0 px-[12.5rem] bg-[#190A43] z-[100]">
    <div class="flex items-center w-[38.2rem] justify-between text-[1rem] text-[#fff]">
      <div class="logo h-[4rem] w-[11.25rem] leading-[4rem] text-center text-[1.25rem] text-[#fff] font-extrabold cursor-pointer">LOGO</div>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/explorer">Explorer</NuxtLink>
      <NuxtLink to="/dao">DeCheck DAO</NuxtLink>
      <NuxtLink to="/comment">Check</NuxtLink>
    </div>
    <div class="flex">
      <client-only>
        <el-popover :ref="(ref) => {state.languagePop = ref}" placement="bottom" :teleported="false"  trigger="click">
          <template #reference>
            <div class="h-[2rem] w-[4.88rem] flex justify-center items-center bg-[#ffffff1c] font-semibold rounded-[0.25rem] mr-[1.5rem] border-2 border-white cursor-pointer">
              <img src="/images/web.svg" class="h-[1rem] w-[1rem]">
              <span class="text-[1rem] text-[#ffffff] ml-[0.44rem]">{{state.language}}</span>
            </div>
          </template>
          <div class="flex flex-col cursor-pointer bg-[#322558FF]">
						<div v-for="(item, index) in languageList" :key="index" @click="onSetLanguage(item.key)"
							class="h-[3rem] text-center leading-[3rem] text-[#fff] hover:bg-[#493d6a] ">
							{{ item.label }}
						</div>
					</div>
        </el-popover>
      </client-only>
      <div class="h-[2rem] leading-[2rem] w-[11.25rem] bg-white text-[#121D43] text-[1rem] text-center font-semibold rounded-[0.25rem] cursor-pointer"><NuxtLink to="/userInfo">Connect Wallet</NuxtLink></div>
    </div>
  </div>
</template>
<script setup >
import { useI18n } from  'vue-i18n'
const { t,locale } = useI18n();

const state = reactive ({
  language: computed(() => {
    return locale.value
  })
})

const languageList = [
	{ key: 'zh', label: '简体中文', value: 'zh' },
	{ key: 'en', label: 'English', value: 'en' },
];

const onSetLanguage = (value) => {
	localStorage.language = value;
  locale.value = value
  state.languagePop.hide();
};
</script>

<style scoped>
.logo{
  background: linear-gradient(225deg, #26fff270 0%, #7350ff70 100%);
}
:deep(.el-popover){
  padding: 0;
  border: none;
}
</style>