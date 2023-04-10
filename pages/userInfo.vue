<template>
  <div class="relative w-full text-gray-700 bg-[#190A43] min-h-screen">
    <HeaderView />

    <UserCommnet />
    <BottomBar />
  </div>
</template>

<script setup lang="ts">
import HeaderView from '@/src/components/Header.vue';
import BottomBar from '@/src/components/BottomBar.vue'
import UserCommnet from '@/src/components/userComment.vue'
</script>