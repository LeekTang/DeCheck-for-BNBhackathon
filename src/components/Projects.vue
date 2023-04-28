<template>
  <div class="w-[75rem] mx-auto mt-[4rem]">
    <div class="text-[1.25rem] text-[#fff] font-extrabold mb-[1.5rem]">{{ t('PROJECTS')}}</div>
    <div class="bg-[#110921] border border-solid border-[#ffffff1c] w-full p-[1.5rem] rounded-[0.75rem]">
      <div class="w-[43rem] h-[3.5rem] bg-[#110921] rounded-[1rem] mb-[2rem]">
        <el-input v-model="state.searchInput" class="inputClass h-[3.5rem] text-[#fff] cursor-pointer" :placeholder="t('searchplace')" :prefix-icon="Search" >
          <template #suffix>
            <div class="h-[2rem] w-[4.13rem] input-bg text-[0.88rem] text-[#fff] rounded-[0.5rem]" @click="searchClick">{{ t('Search') }}</div>
          </template>
        </el-input>
      </div>
      <div class="flex flex-row text-[0.88rem] text-[#FFFFFFA8] h-[3rem]">
        <p class="w-[30rem]">{{ t('Name') }}</p>
        <p class="w-[8rem]">{{ t('Token') }}</p>
        <p class="w-[8rem]">{{ t('Chain') }}</p>
        <p class="w-[8rem]">{{ t('Participant') }}</p>
        <p class="w-[8rem]">{{ t('Reviews') }}</p>
        <p class="w-[8rem]">{{ t('Score') }}</p>
      </div>
      <div v-for="(item, index) in state.projectList" :key="index" class="flex flex-row items-center cursor-pointer text-[1rem] text-[#FFFFFF] h-[4rem] border-b border-[#FFFFFF1C]" @click="goUrl(item.id)">
        <div class="w-[30rem] flex items-center">
          <img :src="item.logo" class="h-[2.5rem] w-[2.5rem] bg-[#fff] rounded-[0.75rem] mr-[0.88rem]" @error="imgError"/>
          <a>{{item.name}}</a>
        </div>
        <p class="w-[8rem]">{{item.tokenName || '--'}}</p>
        <p class="w-[8rem]">{{item.chain || '--'}}</p>
        <p class="w-[8rem]">{{item.partake || '0'}}</p>
        <p class="w-[8rem]">{{item.reviews || '0'}}</p>
        <p class="w-[8rem]"><el-rate disabled size="large" v-model="item.score" /></p>
      </div>
      <div class="flex justify-between items-center h-[4rem]">
        <client-only>
          <el-select v-model="state.pageSize" class="h-[2rem] w-[11.25rem]" size="large" :teleported="false" @change="pageSizeChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="t(item.label)"
              :value="item.value"
            />
          </el-select>
        </client-only>
        <el-pagination
          background
          layout="prev, pager, next"
          :pagerCount="5"
          :total="state.totle"
          :page-size="state.pageSize"
          v-model:current-page="state.page"
          @current-change="pageChange"
          :hide-on-single-page="true"
          class="mt-4"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref, reactive } from 'vue'
import { imgError } from '@/src/utils/utils'
import request from '@/src/utils/request'
import { useI18n } from  'vue-i18n'
const { t } = useI18n();
const router = useRouter()

const options = [
  { value: 20, label: '20items', },
  { value: 50, label: '50items', },
  { value: 100, label: '100items', }
]

const state = reactive({
  projectList: {},
  searchInput: '',
  page: 1,
  pageSize: 20,
  totle: 10,
})

const chainList = [
  { id: "1", label: "Ethereum" },
  { id: "10", label: "Optimism" },
  { id: "25", label: "Cronos" },
  { id: "56", label: "BSC" },
  { id: "66", label: "OKC" },
  { id: "100", label: "Gnosis" },
  { id: "128", label: "Heco" },
  { id: "137", label: "Polygon" },
  { id: "250", label: "Fantom" },
  { id: "321", label: "KCC" },
  { id: "324", label: "zkSync Era" },
  { id: "10001", label: "ETHW" },
  { id: "201022", label: "FON" },
  { id: "42161", label: "Arbitrum" },
  { id: "43114", label: "Avalanche" },
  { id: "59140", label: "Linea" },
  { id: "1666600000", label: "Harmony" },
  { id: "tron", label: "Tron" },
]

const getProject = () => {
  request({ url: `/plugin/decheck/api/project/page?page=${state.page}&pageSize=${state.pageSize}&keyword=${state.searchInput}`,method : 'get'}).then((res) => {
    state.projectList = res.list
    state.projectList.forEach(ele => {
      if(ele.tokenAddr){
        Object.keys(ele.tokenAddr).forEach(chainID => {
          chainList.forEach( chaindItem => {
            if(chainID == chaindItem.id){
              ele.chain = chaindItem.label
            }
          })
        })
      }
    });
    state.totle = res.total
  })
}

const goUrl = (id) => {
  router.push({
    name: "ProjectDetails",
    query: { id: id},
  })
}

const pageSizeChange = (val) => {
  state.pageSize = val;
  state.page = 1;
  getProject();
}

const pageChange = (val) => {
  state.page = val;
  getProject()
}

const searchClick = () => {
  state.page = 1
  getProject()
}

onMounted(()=>{
  getProject()
})

</script>

<style scoped>
.input-bg{
  background-color: #1E50FF;
}

/* 下拉样式 */
:deep(.el-select .el-input__wrapper){
  background: #fff;
  box-shadow: none;
  border-radius: 8px;
  height: 2rem;
}

:deep(.el-select-dropdown__item.hover, .el-select-dropdown__item:hover){
  background-color: #0000001c;
  border-radius: 0.5rem;
}

:deep(.el-select-dropdown__item){
  height: 2rem;
  line-height: 2rem;
  color: #121D43;
  margin: 0 0.5rem;
}

:deep(.el-popper.is-light){
  background: #fff;
  border: none;
}

:deep(.select-trigger .el-input__inner){
  color: #121D43;
}

/* input输入框 */
:deep(.inputClass .el-input__wrapper ){
  height: 3.5rem;
  background-color: #ffffff1c;
  box-shadow: none;
  border-radius: 10px;
}

:deep(.inputClass .el-input__inner){
  color: #fff;
}


/* 分页样式修改 */
:deep(.el-pagination.is-background .el-pager li){
  background-color: transparent;
  color: #ffffff54;
}
:deep(.el-pagination.is-background .el-pager li.is-active){
  color: #fff;
}

</style>