<template>
  <div class="flex items-center h-[3.5rem] w-[75rem] mx-auto mt-[8rem]">
    <div class="h-full w-[4.88rem] text-center leading-[3.5rem] bg-[#322558] rounded-[0.75rem] mr-[1.5rem]" @click="back">
      <img src="/images/back.svg" class="inline-block"/>
    </div>
    <client-only>
      <el-select v-model="value" class="h-[3.5rem] w-[11.25rem] mr-[1.5rem]" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </client-only>
    <div class="w-[55.81rem] h-[3.5rem] bg-[#474174] rounded-[1rem]">
      <el-input v-model="searchInput" class="h-[3.5rem] bg-[#474174] rounded-[1rem] text-[#fff]" placeholder="Search by project name, token contract address and token symbol " :prefix-icon="Search" >
        <template #suffix>
          <div class="h-[2rem] w-[4.13rem] input-bg text-[0.88rem] text-[#fff] rounded-[0.5rem]">Search</div>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const router = useRouter()
const back = () => {
  router.back()
}

const searchInput = ref('')

const value = ref(1)
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

:deep(.select-trigger .el-input__wrapper){
  height: 3.5rem;
}
:deep(.el-input__inner){
  color: #fff;
}
</style>