<template>
  <div class="w-[75rem] mx-auto mt-[4rem]">
    <div class="text-[1.25rem] text-[#fff] font-extrabold mb-[1.5rem]">{{ t('PROJECTS')}}</div>
    <div class="project-bg w-full p-[1.5rem] rounded-[0.75rem]">
      <div class="w-[43rem] h-[3.5rem] bg-[#474174] rounded-[1rem] mb-[2rem]">
        <el-input v-model="state.searchInput" class="h-[3.5rem] bg-[#474174] rounded-[1rem] text-[#fff]" :placeholder="t('searchplace')" :prefix-icon="Search" >
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
      <div v-for="(item, index) in state.projectList" :key="index" class="flex flex-row items-center text-[0.88rem] text-[#FFFFFF] h-[4rem] border-b border-[#FFFFFF1C]">
        <div class="w-[30rem] flex items-center cursor-pointer" @click="goUrl(item.id)">
          <p class="h-[2.5rem] w-[2.5rem] bg-[#fff] rounded-[0.75rem] mr-[0.88rem]"></p>
          <a>{{item.name}}</a>
        </div>
        <p class="w-[8rem]">{{item.tokenName || '--'}}</p>
        <p class="w-[8rem]">{{item.mainChain || '--'}}</p>
        <p class="w-[8rem]">{{item.Participant || '--'}}</p>
        <p class="w-[8rem]">{{item.Reviews || '--'}}</p>
        <p class="w-[8rem]"><el-rate disabled size="large" v-model="item.score" /></p>
      </div>
      <div class="flex justify-between items-center h-[4rem]">
        <client-only>
          <el-select v-model="state.pageSize" class="h-[2rem] w-[11.25rem] m-0" effect="dark" size="large" @change="pageSizeChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="t(item.label)"
              :value="item.value"
            />
          </el-select>
        </client-only>
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :pagerCount="5"
          :total="state.totle"
          :page-size="state.pageSize"
          v-model:current-page="state.page"
          @current-change="pageChange"
          class="mt-4"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref, reactive } from 'vue'
import { abbr } from '@/src/utils/utils'
import request from '@/src/utils/request'
import { useI18n } from  'vue-i18n'
const { t,locale } = useI18n();
const router = useRouter()

const options = [
  { value: 10, label: '10items', },
  { value: 20, label: '20items', },
  { value: 50, label: '50items', }
]

const state = reactive({
  projectList: {},
  searchInput: '',
  page: 1,
  pageSize: 10,
  totle: 10,
})

const getProject = () => {
  request({ url: `/plugin/decheck/api/project/page?page=${state.page}&pageSize=${state.pageSize}&keyword=${state.searchInput}`,method : 'get'}).then((res) => {
    state.projectList = res.list
    state.projectList.forEach(element => {
      if(element.mainChain){
        element.mainChain = element.mainChain.join()
      }
    });
    state.totle = res.total
  })
}

const goUrl = (id) => {
  router.push({
    name: "ProjectDetails",
    query: { id: id}
  })
}

const pageSizeChange = (val) => {
  state.pageSize = val;
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
:deep(.el-input__inner){
  color: #fff;
}
</style>