<template>
  <div class="flex flex-col">
    <slot></slot>
    <el-backtop :bottom="180" :right="100">
      <img class="h-[1rem] w-[1rem] bg-[#fff] rounded-full" src="/images/backtop.svg"/>
    </el-backtop>
  </div>
</template>

<script setup>
  import { ElBacktop } from 'element-plus';
</script>