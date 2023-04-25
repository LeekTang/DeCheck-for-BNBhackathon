<template>
  <div class="flex items-start w-[75rem] mx-auto mt-[6.5rem]">
    <client-only>
      <el-select v-model="state.chain" class="h-[3.5rem] w-[17.62rem] mr-[1.5rem]" :teleported="false">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </client-only>

    <div class="w-[55.87rem] h-[3.5rem] bg-[#474174] rounded-[1rem] ">
      <el-input v-model="state.searchInput" class="inputClass h-[3.5rem] bg-[#474174] rounded-[1rem] text-[#fff]" @keyup.enter="getHotProject" :placeholder="t('searchplace')" :prefix-icon="Search" >
        <template #suffix>
          <div ref="buttonRef" class="h-[2rem] w-[4.13rem] input-bg text-[0.88rem] text-[#fff] rounded-[0.5rem] cursor-pointer" @click="getHotProject">{{t('Search')}}</div>
        </template>
      </el-input>

      <div class="w-[62.25rem] max-h-[30rem] scroll p-[0.5rem] mt-[0.5rem] bg-[#322558FF] rounded-[0.75rem] z-40" v-if="state.isShowAll">
        <div class="h-[3rem] text-[#fff] flex justify-between items-center px-[1rem] rounded-[0.75rem] hover:bg-[#FFFFFF1C]" 
          v-for="(item,index) in state.allList" :key="index" @click="showProject(item)">
          <p class="text-[0.88rem]">{{item.name}}</p>
          <p class="text-[0.75rem]">{{item.tokenAddr[state.chain]}}</p>
        </div>
      </div>  
    </div>

          
  </div>
  
</template>

<script setup >
import { onMounted,reactive,ref,unref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import request from '@/src/utils/request'
import { useI18n } from  'vue-i18n'
const { t,locale } = useI18n();
import { userStore } from '@/src/stores/user' 
const router = useRouter()
const route = useRoute();
const store = userStore()

const state = reactive({
  chain: "1",
  searchInput: '',
  allList: {},
  isShowAll: false
})

const options = [
  { value: "1", label: "Ethereum" },
  { value: "10", label: "Optimism" },
  { value: "25", label: "Cronos" },
  { value: "56", label: "BSC" },
  { value: "66", label: "OKC" },
  { value: "100", label: "Gnosis" },
  { value: "128", label: "Heco" },
  { value: "137", label: "Polygon" },
  { value: "250", label: "Fantom" },
  { value: "321", label: "KCC" },
  { value: "324", label: "zkSync Era" },
  { value: "10001", label: "ETHW" },
  { value: "201022", label: "FON" },
  { value: "42161", label: "Arbitrum" },
  { value: "43114", label: "Avalanche" },
  { value: "59140", label: "Linea" },
  { value: "1666600000", label: "Harmony" },
  { value: "tron", label: "Tron" },
]


const getHotProject = () => {
  store.searchInfo = ''
  store.searchProjectInfo = ''
  store.tokenAddr = ""
  store.tokenID = ""
  request.get(`/plugin/decheck/api/project/page?page=1&pageSize=50&keyword=${state.searchInput}&chainId=${state.chain}`).then((res) => {
    if(res.list){
      if(res.list.length <= 1){
        showProject(res.list[0])
      }else {
        state.allList = res.list
        state.isShowAll = true
      }
    }else{
      state.allList = ''
      state.isShowAll = false
      store.tokenAddr = state.searchInput
      store.chain = state.chain;
    }
  })
}

const showProject = (item) => {  
  store.chain = state.chain;
  store.tokenID = item.id;
  store.tokenAddr = item.tokenAddr[state.chain];
  state.isShowAll = false
}

onMounted(()=>{
  store.chain = state.chain = route.query.chain ? route.query.chain : "1";
  state.searchInput = route.query.searchInput ? route.query.searchInput : '';
  store.searchInfo = ''
  store.searchProjectInfo = ''
  store.tokenAddr = ""
  store.tokenID = ""
  if(route.query.searchInput != null){
    getHotProject()
  }
})
</script>

<style scoped>

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

/* 选择框下拉标识隐藏 */
:deep(.el-popper__arrow::before){
  height: 0px;
  width: 0px;
  border: none;
}

/* 评分大小 */
:deep(.el-rate__icon){
  font-size: 19px;
  margin-right: 3px;
}

/* input输入框 */
:deep(.inputClass .el-input__wrapper ){
  height: 3.5rem;
  background-color: #474174;
  box-shadow: none;
  border-radius: 20px;
}

:deep(.inputClass .el-input__inner){
  color: #fff;
}

/* 下拉选择样式 */
:deep(.el-input__wrapper){
  height: 3.5rem;
  background-color: #474174;
  box-shadow: none;
  border-radius: 20px;
}

:deep(.el-input__inner){
  color: #fff;
}

:deep(.el-select-dropdown__item.hover, .el-select-dropdown__item:hover){
  background-color: #493d6a;
  border-radius: 0.25rem;
}

:deep(.el-select-dropdown__item){
  height: 3rem;
  line-height: 3rem;
  color: #fff;
  margin: 0 0.5rem;
}

:deep(.el-popper.is-light){
  background-color: #322559;
  border: none;
}
</style>