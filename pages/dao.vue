<template>
  <div class="relative w-full text-gray-700 bg-[#190A43] min-h-screen">
    <HeaderView />
    <Soon />
    <BottomBar />
  </div>
</template>

<script setup>
import HeaderView from '@/src/components/Header.vue';
import Soon from '@/src/components/Soon.vue'
import BottomBar from '@/src/components/BottomBar.vue'
</script>