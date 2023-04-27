<template>
  <div class="relative w-full text-gray-700 bg-[#000] min-h-screen">
    <HeaderView />
    <UserCommnet />
    <BottomBar class="bottom-0 absolute"/>
  </div>
</template>

<script setup>
import HeaderView from '@/src/components/Header.vue';
import BottomBar from '@/src/components/BottomBar.vue'
import UserCommnet from '@/src/components/userComment.vue'
</script>