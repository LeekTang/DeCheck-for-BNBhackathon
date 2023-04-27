<template>
  <div class="w-[75rem] mx-auto mt-[6.5rem]">
    <div class="text-[1.25rem] text-[#fff] font-extrabold">DID</div>
    <div class="flex justify-between items-center flex-wrap mt-[1.5rem]">
      <div class="h-[21.62rem] w-[36.75rem] rounded-[1.25rem] bg-[#110921] p-[1.5rem] mb-[1.5rem] border border-solid border-[#ffffff1c]" v-for="(item,index) in state.didList" :key="index">
        <div class="flex justify-between">
          <img src="/images/nft.png" class="h-[14.62rem] w-[14.62rem] rounded-[0.75rem] mr-[1.5rem]">
          <div class="relative">
            <p class="text-[1.25rem] text-[#fff] font-bold">{{item.title}}</p>
            <p class="text-[0.87rem] text-[#ffffffa8] font-normal leading-[1.12rem] mt-[1.5rem]" v-html="item.content"></p>
            <p class="text-[0.87rem] text-[#fff] font-bold leading-[0.87rem] absolute bottom-0">{{item.type}}</p>
          </div>
        </div>
        <div class="flex justify-between mt-[1.5rem]">
          <div class="tip relative h-[2.5rem] w-[14.62rem] text-center leading-[2.5rem] text-[0.87rem] text-[#121D43] bg-[#fff] font-bold rounded-[0.5rem]">{{item.tip}}</div>
          <div :class="`${ index > 1 ? 'bg-[#ffffff38]' : 'bg-[#1E50FF]'} h-[2.5rem] w-[17.62rem] text-center leading-[2.5rem] text-[1rem] text-[#fff] font-bold rounded-[0.5rem]`">{{item.button}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted} from 'vue'

const state = reactive({
  didList: [
    { title: 'Reviewer', content: 'The reviewer is the core identity of decheck DAO and also the foundation of DeCheck DAO DID.<br/><br/>Reviewer NFT is the only role identity token for reviewers in the DeCheck DAO.', type: 'Become a Reviewer by airdrop mission', button: 'GO', img: '', tip: 'Lets make things better!'},
    { title: 'Auditor', content: 'DeCheck DAO welcomes people with coding skills to apply to become our Auditor roles.<br/><br/>Harvest DeCheck Treasury incentives in the DeCheck DAO through your coding abilities.', type: 'Become a Auditor by DID application', button: 'APPLY', img: '', tip: 'Code is law!'},
    { title: 'Researcher', content: 'DeCheck DAO welcomes people with research skills to apply to become our Researcher roles.<br/><br/>Harvest DeCheck Treasury incentives in the DeCheck DAO through your research abilities.', type: 'Become a Researcher by DID application', button: 'COMING SOON', img: '', tip: 'Next big thing!'},
    { title: 'Producer', content: 'DeCheck DAO welcomes people with product design capability to apply to become our Producer roles.<br/><br/>Harvest DeCheck Treasury incentives in the DeCheck DAO through your product design abilities.', type: 'Become a Producer by DID application', button: 'COMING SOON', img: '', tip: 'Craftsmanship!'},
  ]
})
</script>

<style scoped>
.tip:before{
  content: '';
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-bottom: 10px solid #fff;
  border-right: 10px solid transparent;
  position: absolute;
  top: -10px;
  left: 45%;
}
</style>