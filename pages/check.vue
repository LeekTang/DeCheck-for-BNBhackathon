<template>
  <div class="relative w-full text-gray-700 bg-[#190A43] min-h-screen">
    <HeaderView />
    <DetailsNav />
    <DetailsInfo />
    <CheckReport />
    <CheckBottom />
    <BottomBar class="bottom-0 absolute"/>
  </div>
</template>
<script setup>
import HeaderView from '@/src/components/Header.vue';
import BottomBar from '@/src/components/BottomBar.vue'
import DetailsNav from '@/src/components/DetailsNav.vue'
import DetailsInfo from '@/src/components/DetailstInfo.vue'
import CheckReport from '@/src/components/CheckReport.vue'
import CheckBottom from '@/src/components/checkBottom.vue'
import { storeToRefs } from 'pinia'

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


const { searchProjectInfo } = storeToRefs( store )
watch(searchProjectInfo,(old,nwo)=>{
  console.log(searchProjectInfo.value)
})


</script>