<template>
  <div class="w-[75rem] mx-auto mt-[1.5rem] flex">
    <div class="info-bg rounded-[0.75rem] mr-[1.5rem]">
      <img class="h-[18rem] w-[24rem] rounded-[0.75rem]"/>
      <div class="p-[1.5rem]">
        <div class="flex justify-between text-[1rem] mb-[1.5rem]">
          <p class="text-[#FFFFFFA8]">Contracts</p>
          <p class="text-[#fff] font-bold">0xe04...1B2c</p>
        </div>
        <div class="flex justify-between text-[1rem] mb-[1.5rem]">
          <p class="text-[#FFFFFFA8]">Autids</p>
          <p class="text-[#fff] font-bold">Certik,xxxname</p>
        </div>
        <p class="border border-[#FFFFFF1C]"></p>
        <p class="my-[1.5rem] text-[0.88rem] text-[#fff] ">I know something about this project!</p>
        <div class="w-[21rem] h-[3.5rem] bg-[#1E50FF] rounded-[0.75rem] text-[1rem] text-[#fff] font-bold text-center leading-[3.5rem]">REVIEW NOW</div>
      </div>
    </div>
    <div>
      <p class="text-[2.56rem] text-[#fff] font-bold leading-[3rem]">Make you DID on Arbitrum—SpaceID X Multichain</p>
      <div class="flex justify-between items-center">
        <el-rate disabled size="large" v-model="value" />
        <div class="flex">
          <client-only>
            <el-tooltip v-for="(item,index) in iconList" :key="index" :content="item.tip" placement="top">
              <div class="p-[0.69rem] hover:bg-[#4C406C] rounded-full">
                <img :src="item.icon" class="h-[1.5rem] w-[1.5rem]"/>
              </div>
            </el-tooltip>
          </client-only>
        </div>
      </div>
      <p class="text-[1rem] text-[#ffffffa8] leading-[1rem] my-[1rem]">Investment Agency</p>
      <p class="text-[1rem] text-[#fff] font-bold leading-[1rem] my-[1rem]">a16z,sequoiacap</p>
      <div class="mt-[3.5rem]">
        <div :class="`${isEllipsis ? 'text-ellipsis' : 'more-ellipsis'} text-[1rem] text-[#ffffffa8] leading-[2rem]`"
            v-html="`<p>😻Cross-chain and Build your Identity😻</p>
            <p>Following SPACE ID .eth, .bnb web3 domains, Multichain finally supports .arb.</p>
            <p>🙌To commemorate this occasion, we are starting a campaign with 20 Space ID gift cards to be delivered and $1000 in incentives in MULTI.</p>
            <p>Duration:29th March-13th April 18:00(UTC+8)</p>
            <p>Simply by doing two tasks to forge the fragmented NFTs, you are able to share the prize pool with the Magic Cube Box NFTNote:The Magic Cube Box NFT will be live several days later,buy you can check first,so stay tuned!</p>
            <p>☝️Task1 (Mystery box)Bridge at least 20 USD worth of tokens to Arbitrum via MultichainFollow Multichain Socials</p>
            <p>✌️Task2 (Mystery box)Register a domain on Space ID on ArbitrumFollow Space ID Socials</p>
            <p>🚀Rewards🚀</p>
            <p>😋$1000 and 20 Gift cards to be sent to 20 NFT holders randomly</p>`">
        </div>
        <img v-if="isEllipsis" src="images/down.svg" class="h-[1.5rem] w-[1.5rem] mx-auto" @click="isEllipsis = !isEllipsis"/>
        <img v-else src="images/up.svg" class="h-[1.5rem] w-[1.5rem] mx-auto"  @click="isEllipsis = !isEllipsis"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElRate } from 'element-plus'
import { onMounted,ref } from 'vue'
const value = ref(4)
const iconList = [
  {name: 'web', icon: 'images/web-icon.svg', tip: 'Official website',},
  {name: 'twitter', icon: 'images/twitter-icon.svg', tip: 'twitter'},
  {name: 'telegram', icon: 'images/telegram-icon.svg', tip: 'telegram'},
  {name: 'discord', icon: 'images/discord-icon.svg', tip: 'discord'},
  {name: 'cand', icon: 'images/cand-icon.svg', tip: 'cand'},
  {name: 'github', icon: 'images/github-icon.svg', tip: 'github'},
  {name: 'gitbook', icon: 'images/gitbook-icon.svg', tip: 'gitbook'},
]
const isEllipsis = ref(true)
</script>
<style scoped>
.info-bg{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}
.text-ellipsis{
  overflow:hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 7;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.more-ellipsis{
  overflow:hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>