<template>
  <div class="w-full px-[12.5rem]">
    <p class="text-[#FFFFFF70] text-[1rem] text-center">RAISE CAPITAL ACROSS ALL MAIN BLOCKCHAIN NETWORKS</p>
    <div class="mt-[1rem] flex">
      <div v-for="item in originList" :key="item.id" class="flex items-center h-[3rem] w-[10.63rem]">
        <img :src="item.icon" class="h-[2rem] w-[2rem]">
        <p class="ml-[0.5rem] text-[0.88rem] text-[#FFFFFF70]">{{item.name}}</p>
      </div>
    </div>
    <div class="mt-[4rem] flex justify-between">
      <div class="flex flex-col justify-center items-center list-bg h-[8rem] w-[17.63rem] rounded-[1.25rem]" v-for="item in list" :key="item.id">
        <p class="text-gradient text-[2rem] font-extrabold">{{item.number}}</p>
        <p class="text-[1rem] text-[#fff] font-semibold mt-[1rem]">{{item.name}}</p>
      </div>
    </div>
    <div class="mt-[4rem] h-[26.5rem] bottom-bg flex relative rounded-[1.25rem]">
      <div class="w-[42.31rem] py-[4rem] pl-[4rem]">
        <p class="text-[2.56rem] text-[#121D43] font-bold leading-[3rem]">Most of the mainstream projects are included</p>
        <p class="text-[1.44rem] text-[#121D43] leading-[1.75rem] mt-[1.5rem]">Professional community developers help you understand the project from all perspectives</p>
        <div class="h-[3.5rem] w-[11.25rem] div-bg text-center leading-[3.5rem] text-[1.13rem] text-[#fff] font-black rounded-full mt-[4rem]">Explorer</div>
      </div>
      <img src="images/intro-bg.svg" class="absolute right-0">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, reactive, computed, onUnmounted } from 'vue';

const originList = [
    {id: 1, name: 'ethereum', icon: 'images/eth.svg'},
    {id: 2, name: 'BNB CHAIN', icon: 'images/bnb.svg'},
    {id: 3, name: 'SOLANA', icon: 'images/solana.svg'},
    {id: 4, name: 'POLKADOT', icon: 'images/polkadot.svg'},
    {id: 5, name: 'polygon', icon: 'images/polygon.svg'},
    {id: 6, name: 'AVALANCHE', icon: 'images/avalanche.svg'},
    {id: 7, name: 'celo', icon: 'images/celo.svg'},
];

const list = [
  {id: 1, name: 'REVIEWED COUNT', number: '30,000'},
  {id: 2, name: 'AUDIT EXPERT', number: '800'},
  {id: 3, name: 'AUDITED PROJECTS', number: '1,100'},
  {id: 4, name: 'UNIQUE PARTICIPANTS', number: '20,000'},
]

</script>
<style scoped>
.list-bg{
  background: linear-gradient(180deg, #363574 0%, #2A1C52 100%);
}
.text-gradient{
  background-image: linear-gradient(229deg, #14CFE9 0%, #416BFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.bottom-bg{
  background: linear-gradient(60deg, #F1F4FF 0%, #ADC4FF 100%);
}
.div-bg{
  background: linear-gradient(180deg, #263B85 0%, #263B85 0%, #121D43 100%);
}
</style>