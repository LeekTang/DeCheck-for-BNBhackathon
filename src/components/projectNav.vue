<template>
  <div class="flex items-center h-[3.5rem] w-[75rem] mx-auto mt-[8rem]">
    <div class="h-full w-[4.88rem] text-center leading-[3.5rem] bg-[#322558] rounded-[0.75rem] mr-[1.5rem]" @click="back" :teleported="false">
      <img src="/images/back.svg" class="inline-block"/>
    </div>
    <client-only>
      <el-select v-model="state.chain" class="h-[3.5rem] w-[11.25rem] mr-[1.5rem]" size="large" :teleported="false">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </client-only>
    <div class="w-[55.81rem] h-[3.5rem] bg-[#474174] rounded-[1rem]">
      <el-input v-model="state.searchInput" class="h-[3.5rem] bg-[#474174] rounded-[1rem] text-[#fff]" :placeholder="t('searchplace')" :prefix-icon="Search" >
        <template #suffix>
          <div class="h-[2rem] w-[4.13rem] input-bg text-[0.88rem] text-[#fff] rounded-[0.5rem]" @click="getHotProject">{{ t('Search') }}</div>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted,reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import request from '@/src/utils/request'
import { userStore } from '@/src/stores/user' 
import { useI18n } from  'vue-i18n'
const { t,locale } = useI18n();
const router = useRouter()
const store = userStore()

const state = reactive({
  chain: 1,
  searchInput: ''
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

const back = () => {
  router.back()
}

const getHotProject = () => {
  router.push({
    name: 'check',
    query: {
      chain : state.chain,
      searchInput: state.searchInput
    }
  })
  request.get(`/plugin/decheck/api/security/token/${state.chain}/${state.searchInput}`).then((res) => {
    store.searchInfo = res
  })
}



onMounted(()=>{

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
  border-radius: 20px;
}

:deep(.select-trigger .el-input__wrapper){
  height: 3.5rem;
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
  background: #322559;
  border: none;
}
</style>