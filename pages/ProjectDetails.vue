<template>
  <div class="relative w-full text-gray-700 bg-[#190A43] min-h-screen">
    <HeaderView />
    <DetailsNav />
    <DetailsInfo />
    <CheckReport />
    <DecheckReview />
    <BottomBar />
  </div>
</template>

<script setup lang="ts">
import HeaderView from '@/src/components/Header.vue';
import BottomBar from '@/src/components/BottomBar.vue'
import DetailsNav from '@/src/components/DetailsNav.vue'
import DetailsInfo from '@/src/components/DetailstInfo.vue'
import CheckReport from '@/src/components/CheckReport.vue'
import DecheckReview from '@/src/components/DecheckReview.vue'
</script>