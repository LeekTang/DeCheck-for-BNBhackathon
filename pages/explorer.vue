<template>
  <div class="relative w-full text-gray-700 bg-[#0a041a]">
    <HeaderView />
    <HotProject />
    <Projects />
    <ProjectApply />
    <BottomBar />
  </div>
</template>

<script setup>
import HeaderView from '@/src/components/Header.vue';
import HotProject from '@/src/components/HotProject.vue'
import Projects from '@/src/components/Projects.vue'
import ProjectApply from '@/src/components/ProjectApply.vue'
import BottomBar from '@/src/components/BottomBar.vue'
</script>