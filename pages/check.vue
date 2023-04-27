<template>
  <div class="relative w-full text-gray-700 bg-[#000] min-h-screen">
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

<style scoped>
:deep(.el-dialog){
  border-radius: 20px;
  background: url('/images/diabg.png') no-repeat;
  background-size: 100% 100%;
}

:deep(.el-dialog__header){
  margin: 0;
  padding-top: 10px;
}
</style>