<template>
  <div class="relative w-full text-gray-700 bg-[#000] min-h-screen">
    <HeaderView />
    <ApplyPro />
    <BottomBar />
  </div>
</template>

<script setup>
import HeaderView from '@/src/components/Header.vue';
import BottomBar from '@/src/components/BottomBar.vue';
import ApplyPro from '@/src/components/applyPro.vue'
</script>