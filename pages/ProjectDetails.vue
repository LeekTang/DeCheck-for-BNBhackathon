<template>
  <div class="relative w-full text-gray-700 bg-[#190A43] min-h-screen">
    <HeaderView />
    <projectNav />
    <projectInfo :projectID="state.projectID"/>
    <projectCheck :projectID="state.projectID"/>
    <DecheckReview :projectID="state.projectID"/>
    <BottomBar />
  </div>
</template>

<script setup>
import HeaderView from '@/src/components/Header.vue';
import BottomBar from '@/src/components/BottomBar.vue'
import projectNav from '@/src/components/projectNav.vue'
import projectInfo from '@/src/components/projectDet.vue'
import projectCheck from '@/src/components/projectCheck.vue'
import DecheckReview from '@/src/components/DecheckReview.vue'
import { reactive } from 'vue'
const route = useRoute();

const state = reactive({
  projectID: route.query.id
})

</script>