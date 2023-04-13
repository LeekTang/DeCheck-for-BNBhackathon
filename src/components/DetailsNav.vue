<template>
  <div :class="`${Object.keys(store.searchInfo).length > 0 || Object.keys(store.searchProjectInfo).length > 0 ? '' : 'li'}  flex items-start w-[75rem] mx-auto mt-[8rem]`">
    <client-only>
      <el-select v-model="state.chain" class="h-[3.5rem] w-[11.25rem] mr-[1.5rem]" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </client-only>

    <div class="w-[62.25rem] h-[3.5rem] bg-[#474174] rounded-[1rem] ">
      <el-input v-model="state.searchInput" class="h-[3.5rem] bg-[#474174] rounded-[1rem] text-[#fff]" placeholder="Search by project name, token contract address and token symbol " :prefix-icon="Search" >
        <template #suffix>
          <div ref="buttonRef" class="h-[2rem] w-[4.13rem] input-bg text-[0.88rem] text-[#fff] rounded-[0.5rem]" @click="getHotProject">Search</div>
        </template>
      </el-input>

      <div class="w-[62.25rem] h-[30rem] scroll p-[0.5rem] mt-[0.5rem] bg-[#322558FF] rounded-[0.75rem]" v-if="state.isShowAll">
        <div class="h-[3rem] text-[#fff] flex justify-between items-center px-[1rem] rounded-[0.75rem] hover:bg-[#FFFFFF1C]" 
          v-for="(item,index) in state.allList" :key="index" @click="showProject(item)">
          <p class="text-[0.88rem]">{{item.name}}</p>
          <p class="text-[0.75rem]">{{item.tokenAddr}}</p>
        </div>
      </div>  
    </div>

          
  </div>
  
</template>

<script setup >
import { onMounted,reactive,ref,unref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import request from '@/src/utils/request'
import { userStore } from '@/src/stores/user' 
const router = useRouter()
const route = useRoute();
const store = userStore()

const state = reactive({
  chain: 1,
  searchInput: '',
  allList: {},
  isShowAll: false
})

const options = [
  { value: 1, label: 'ETH', },
  { value: 10, label: 'Optimism', },
  { value: 25, label: 'Cronos', },
  { value: 56, label: 'BSC', },
  { value: 66, label: 'OKC', },
  { value: 100, label: 'Gnosis', },
  { value: 128, label: 'HECO', },
  { value: 137, label: 'Polygon', },
  { value: 250, label: 'Fantom', },
]


const getHotProject = () => {
  request.get(`/plugin/decheck/api/project/page?page=1&pageSize=50&keyword=${state.searchInput}`).then((res) => {
    state.allList = res.list
    state.isShowAll = true
  })
}

const showProject = (item) => {
  store.chain = state.chain;
  store.tokenID = item.id;
  store.tokenAddr = item.tokenAddr;
  state.isShowAll = false
}

onMounted(()=>{
  store.chain = state.chain = route.query.chain ? route.query.chain : 1;
  state.searchInput = route.query.searchInput ? route.query.searchInput : '';
  store.searchInfo = ''
  store.searchProjectInfo = ''
  store.tokenAddr = ""
  store.tokenID = ""
})
</script>

<style scoped>
.li{
  height: calc( 100vh - 23.38rem );
}

.scroll{
  overflow-x: auto;
}

.scroll::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.project-bg{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}

.input-bg{
  background-color: #1E50FF;
}

:deep(.el-input__wrapper){
  background: #474174;
  box-shadow: none;
}

:deep(.select-trigger .el-input__wrapper){
  height: 3.5rem;
}
:deep(.el-input__inner){
  color: #fff;
}
</style>