<template>
  <div class="relative min-w-[1200px] w-full text-gray-700 bg-[#000]">
    <HeaderView />
    <TopView/>
    <Introduce/>
    <HotReviews/>
    <Superiority/>
    <Contract/>
    <!-- <Decheck/> -->
    <!-- <ToOther/> -->
    <BottomBar/>
  </div>
</template>
<script setup>
import HeaderView from '@/src/components/Header.vue';
import TopView from '@/src/components/TopModel.vue'
import Introduce from '@/src/components/Introduce.vue'
import HotReviews from '@/src/components/HotReviews.vue'
import Superiority from '@/src/components/Superiority.vue'
import Contract from '@/src/components/Contract.vue'
import Decheck from '@/src/components/DecheckDao.vue'
import ToOther from '@/src/components/ToOther.vue'
import BottomBar from '@/src/components/BottomBar.vue'
import { useI18n } from 'vue-i18n'

const { t, locale} = useI18n();
</script>