<template>
  <div class="relative w-full text-gray-700 bg-[#190A43] min-h-screen">
    <HeaderView />
    <DetailsNav />
    <DetailsInfo />
    <CheckReport />
    <CheckBottom />
    <BottomBar/>
  </div>
</template>
<script setup>
import HeaderView from '@/src/components/Header.vue';
import BottomBar from '@/src/components/BottomBar.vue'
import DetailsNav from '@/src/components/DetailsNav.vue'
import DetailsInfo from '@/src/components/DetailstInfo.vue'
import CheckReport from '@/src/components/CheckReport.vue'
import CheckBottom from '@/src/components/checkBottom.vue'

import {  onMounted, onBeforeUnmount} from 'vue'
import { userStore } from '@/src/stores/user'
const store = userStore()

onBeforeUnmount(()=>{
  store.searchInfo = ''
  store.chain = 1
  store.search = ''
  store.tokenAddr = ""
  store.tokenID = ""
  console.log('页面销毁')
})


</script>