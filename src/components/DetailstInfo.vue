<template>
  <div v-if="Object.keys(state.project).length > 0" class="w-[75rem] mx-auto mt-[1.5rem] flex">
    <div class="info-bg rounded-[0.75rem] mr-[1.5rem]">
      <img :src="state.project.logo" @error="imgError" class="h-[16rem] w-[16rem] rounded-[0.75rem] pt-[1.5rem] pb-1 mx-auto"/>
      <div class="p-[1.5rem]">
        <div class="flex justify-between text-[1rem] mb-[1.5rem]">
          <p class="text-[#FFFFFFA8]">Contracts</p>
          <p class="text-[#fff] font-bold" v-if="state.project.tokenAddr">{{state.project.tokenList ? abbr(state.project.tokenList[0][1]) : '--'}}</p>
        </div>
        <div class="flex justify-between text-[1rem] mb-[1.5rem]">
          <p class="text-[#FFFFFFA8]">Autids</p>
          <p class="text-[#fff] font-bold">
            {{state.project.auditor}}
          </p>
        </div>
        <p class="border border-[#FFFFFF1C]"></p>
        <p class="my-[1.5rem] text-[0.88rem] text-[#fff] ">I know something about this project!</p>
        <div class="w-[21rem] h-[3.5rem] bg-[#1E50FF] rounded-[0.75rem] text-[1rem] text-[#fff] font-bold text-center leading-[3.5rem]">REVIEW NOW</div>
      </div>
    </div>
    <div class="w-[49.5rem]">
      <p class="text-[2.56rem] text-[#fff] font-bold leading-[3rem]">{{state.project.name}}</p>
      <div class="flex justify-between items-center">
        <el-rate disabled size="large" v-model="state.project.score" />
        <div class="flex">
          <client-only>
            <el-tooltip v-for="(item,index) in iconList" :key="index" :content="item.tip" placement="top">
              <div v-if="item.webSrc" class="p-[0.69rem] hover:bg-[#4C406C] rounded-full" @click.stop="goUrl(item.webSrc)">
                <img :src="item.icon" class="h-[1.5rem] w-[1.5rem]"/>
              </div>
            </el-tooltip>
          </client-only>
        </div>
      </div>
      <p class="text-[1rem] text-[#ffffffa8] leading-[1rem] my-[1rem]">Investment Agency</p>
      <p class="text-[1rem] text-[#fff] font-bold leading-[1rem] my-[1rem]">{{state.project.invest}}</p>
      <div class="mt-[3.5rem]">
        <div :class="`${state.isEllipsis ? 'text-ellipsis' : 'more-ellipsis'} text-[1rem] text-[#ffffffa8] leading-[2rem]`">
            {{state.project.intro}}
        </div>
        <!-- <img v-if="state.isEllipsis" src="images/down.svg" class="h-[1.5rem] w-[1.5rem] mx-auto" @click="state.isEllipsis = !state.isEllipsis"/>
        <img v-else src="images/up.svg" class="h-[1.5rem] w-[1.5rem] mx-auto"  @click="state.isEllipsis = !state.isEllipsis"/> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElRate } from 'element-plus'
import { onMounted,reactive } from 'vue'
import request from '@/src/utils/request'
import { abbr, imgError } from '@/src/utils/utils'
import { userStore } from '@/src/stores/user' 
import { storeToRefs } from 'pinia'
const store = userStore()

const iconList = [
  {name: 'web', icon: '/images/web-icon.svg', tip: 'Official website', webSrc: ''},
  {name: 'twitter', icon: '/images/twitter-icon.svg', tip: 'twitter', webSrc: ''},
  {name: 'telegram', icon: '/images/telegram-icon.svg', tip: 'telegram', webSrc: ''},
  {name: 'discord', icon: '/images/discord-icon.svg', tip: 'discord', webSrc: ''},
  {name: 'cand', icon: '/images/cand-icon.svg', tip: 'cand', webSrc: ''},
  {name: 'github', icon: '/images/github-icon.svg', tip: 'github', webSrc: ''},
  {name: 'gitbook', icon: '/images/gitbook-icon.svg', tip: 'gitbook', webSrc: ''},
]

const goUrl = (url) => {
  if(url){
    window.open(url,'_blank')
  }
}

const { tokenID } = storeToRefs( store )

const state = reactive({
  isEllipsis: true,
  project: {}
})

watch(tokenID,() => {
  projectInfo()
})

const projectInfo = () => {
  if(tokenID.value){
    request.get(`/plugin/decheck/api/project/detail/${tokenID.value}`).then((res) => {
      if(res.tokenAddr){
        res.tokenList = Object.entries(res.tokenAddr)
      }
      if(res.website){
        iconList[0].webSrc = res.website
      }
      store.searchProjectInfo = state.project = res
      state.project.auditor = state.project.auditor.join()
      state.project.invest = state.project.invest.join()
      iconList.forEach((el,index) => {
        if(state.project.socialMedia[index + 1] != undefined){
          el.webSrc = state.project.socialMedia[index + 1]
        }
      })
    })
  }else{
    store.searchProjectInfo = state.project = ''
  }
}

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