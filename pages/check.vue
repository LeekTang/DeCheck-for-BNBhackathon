<template>
  <div class="relative w-full text-gray-700 bg-[#0a041a] min-h-screen">
    <HeaderView />
    <DetailsNav />
    <DetailsInfo />
    <CheckReport />
    <CheckBottom />
    <DecheckReview v-if="store.tokenID" :projectID="store.tokenID" :isCheck="true"/>
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
import DecheckReview from '@/src/components/DecheckReview.vue'
import {  onMounted, onBeforeUnmount} from 'vue'
import { userStore } from '@/src/stores/user'
const store = userStore()
import { projectStore } from '@/src/stores/project'
const proStore = projectStore();

onBeforeUnmount(()=>{
  store.searchInfo = ''
  store.chain = 1
  store.search = ''
  store.tokenAddr = ""
  store.tokenID = ""
  proStore.chain = 0
})
</script>