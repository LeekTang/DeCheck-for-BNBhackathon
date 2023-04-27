<template>
  <div class="relative w-full text-gray-700 bg-[#000] min-h-screen">
    <HeaderView />
    <DID />
    <GENESIS />
    <BottomBar />
  </div>
</template>

<script setup>
import HeaderView from '@/src/components/Header.vue';
import BottomBar from '@/src/components/BottomBar.vue'
import DID from '@/src/components/did.vue'
import GENESIS from '@/src/components/genesis.vue'
</script>