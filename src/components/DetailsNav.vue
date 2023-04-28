<template>
  <div class="relative w-[75rem] mx-auto mt-[6.5rem]">
    <div class="flex items-start w-[75rem] mx-auto mt-[6.5rem]">
      <client-only>
        <el-select v-model="state.chain" class="h-[3.5rem] w-[17.62rem] mr-[1.5rem]" :teleported="false">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </client-only>

      <div class="w-[55.87rem] h-[3.5rem] rounded-[1rem]">
        <el-input v-model="state.searchInput" class="inputClass h-[3.5rem] rounded-[1rem] text-[#fff]" @keyup.enter="getHotProject" :placeholder="t('searchplace')" :prefix-icon="Search" >
          <template #suffix>
            <div ref="buttonRef" class="h-[2rem] w-[4.13rem] input-bg text-[0.88rem] text-[#fff] rounded-[0.5rem] cursor-pointer" @click="getHotProject">{{t('Search')}}</div>
          </template>
        </el-input>
  
      </div>
    </div>
    <div class="w-[55.87rem] max-h-[30rem] scroll p-[0.5rem] mt-[0.5rem] bg-[#252033] rounded-[0.75rem] absolute right-0 z-2100" v-if="state.isShowAll">
      <div class="h-[3rem] text-[#fff] flex justify-between items-center px-[1rem] rounded-[0.75rem] hover:bg-[#FFFFFF1C]" 
        v-for="(item,index) in state.allList" :key="index" @click="showProject(item)">
        <p class="text-[0.88rem]">{{item.name}}</p>
        <p class="text-[0.75rem]">{{item.tokenAddr[state.chain]}}</p>
      </div>
    </div>
    <div class="w-[75rem] scroll min-h-screen p-[0.5rem] mt-[0.5rem]" v-if="state.hotShow">
      <div class="text-[1rem] text-[#ffffffa8] font-normal my-[1rem]">Most Searches</div>
      <div class="flex flex-wrap justify-between">
        <div class="h-[3rem] w-[36rem] text-[#fff] flex items-center justify-between cursor-pointer border border-solid border-[#ffffff1c] px-[1.5rem] mb-[1rem] rounded-full hover:bg-[#FFFFFF1C]" 
          v-for="(item,index) in hot" :key="index" @click="hotJump(item)">
          <div class="flex">
            <p class="text-[0.88rem] text-[#ffffffa8] font-medium mr-[1rem] w-[4rem]">{{item.name}}</p>
            <p class="text-[0.88rem] text-[#fff] font-medium mr-[1rem] w-[6rem]:">{{item.chainName}}</p>
          </div>
          <div class="flex items-center">
            <p class="text-[0.88rem] text-[#fff] font-medium">{{item.address}}</p>
            <img src="/images/right-icon.svg" class="h-[1rem] w-[0.8rem] ml-[0.8rem]"/>
          </div>
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
  isShowAll: false,
  hotShow: true,
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


const hot = [
  {name: "PEPE", chain: '1', chainName: 'Ethereum',address: "0x6982508145454ce325ddbe47a25d4ec3d2311933"},
  {name: "AIDOGE", chain: '42161',chainName: 'Arbitrum', address: "0x09e18590e8f76b6cf471b3cd75fe1a1a9d2b2c2b"},
  {name: "DOGE", chain: '56',chainName: 'BSC', address: "0xba2ae424d960c26247dd6c32edc70b295c744c43"},
  {name: "LINK", chain: '1',chainName: 'Ethereum', address: "0x514910771af9ca656af840dff83e8264ecf986ca"},
  {name: "UNI", chain: '1',chainName: 'Ethereum', address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"},
  {name: "ARB", chain: '42161',chainName: 'Arbitrum', address: "0x912CE59144191C1204E64559FE8253a0e49E6548"},
  {name: "GMX", chain: '1',chainName: 'Ethereum', address: "0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a"},
  {name: "OP", chain: '10',chainName: 'Optimism', address: "0x4200000000000000000000000000000000000042"},
  {name: "BLUR", chain: '1',chainName: 'Ethereum', address: "0x5283d291dbcf85356a21ba090e6db59121208b44"},
  {name: "LOOKS", chain: '1',chainName: 'Ethereum', address: "0xf4d2888d29d722226fafa5d9b24f9164c092421e"},
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
  state.hotShow = false
}


const hotJump = (item) => {
  state.hotShow = false 
  store.chain = item.chain;
  store.tokenAddr = item.address;
  state.isShowAll = false
}

onMounted(()=>{
  store.chain = state.chain = route.query.chain ? route.query.chain : "1";
  state.searchInput = route.query.searchInput ? route.query.searchInput : '';
  store.searchInfo = ''
  store.searchProjectInfo = ''
  store.tokenAddr = ""
  store.tokenID = ""
  state.hotShow = true
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
  box-shadow: none;
  border-radius: 20px;
}

:deep(.inputClass .el-input__inner){
  color: #fff;
}

/* 下拉选择样式 */
:deep(.el-input__wrapper){
  height: 3.5rem;
  background-color: #ffffff1c;
  box-shadow: none;
  border-radius: 20px;
  padding-left: 24px;
  padding-right: 24px;
}

:deep(.el-input__inner){
  color: #fff;
}

:deep(.el-select-dropdown__item.hover, .el-select-dropdown__item:hover){
  background-color: #ffffff1c;
  border-radius: 0.25rem;
}

:deep(.el-select-dropdown__item){
  height: 3rem;
  line-height: 3rem;
  color: #fff;
  margin: 0 0.5rem;
}

:deep(.el-popper.is-light){
  background-color: #110921;
  border: none;
}
</style>