<template>
  <div class="w-[75rem] mx-auto mt-[4rem]">
    <div class="text-[1.25rem] text-[#fff] font-extrabold mb-[1.5rem]">PROJECTS</div>
    <div class="project-bg w-full p-[1.5rem] rounded-[0.75rem]">
      <div class="w-[43rem] h-[3.5rem] bg-[#474174] rounded-[1rem] mb-[2rem]">
        <el-input v-model="searchInput" class="h-[3.5rem] bg-[#474174] rounded-[1rem] text-[#fff]" placeholder="Search by project name, token contract address and token symbol " :prefix-icon="Search" >
          <template #suffix>
            <div class="h-[2rem] w-[4.13rem] input-bg text-[0.88rem] text-[#fff] rounded-[0.5rem]">Search</div>
          </template>
        </el-input>
      </div>
      <div class="flex flex-row text-[0.88rem] text-[#FFFFFFA8] h-[3rem]">
        <p class="w-[30rem]">name</p>
        <p class="w-[8rem]">Token</p>
        <p class="w-[8rem]">Chain</p>
        <p class="w-[8rem]">Participant</p>
        <p class="w-[8rem]">Reviews</p>
        <p class="w-[8rem]">Score</p>
      </div>
      <div v-for="(item, index) in list" :key="index" class="flex flex-row items-center text-[0.88rem] text-[#FFFFFF] h-[4rem] border-b border-[#FFFFFF1C]">
        <div class="w-[30rem] flex items-center"><p class="h-[2.5rem] w-[2.5rem] bg-[#fff] rounded-[0.75rem] mr-[0.88rem]"></p>{{item.name}}</div>
        <p class="w-[8rem]">{{item.token}}</p>
        <p class="w-[8rem]">{{item.chain}}</p>
        <p class="w-[8rem]">{{item.participant}}</p>
        <p class="w-[8rem]">{{item.reviews}}</p>
        <p class="w-[8rem]"><el-rate disabled size="large" v-model="item.rate" /></p>
      </div>
      <div class="flex justify-between items-center h-[4rem]">
        <client-only>
          <el-select v-model="value" class="h-[2rem] w-[11.25rem] m-0" effect="dark" size="large">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </client-only>
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="list.length"
          :page-size="value"
          class="mt-4"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const searchInput = ref('')

const list = [
  {name: "Happy April Fool's Day - 100 $fvSOLV giveaway", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 5},
  {name: "Make you DID on Arbitrum—SpaceID X Multichain", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 5},
  {name: "Tearing Spaces Game Review", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 5},
  {name: "The First Ever Avalanche OAT", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 3},
  {name: "St. Patrick's Day 2023 Celebration with LEND and TEN ...", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 2},
  {name: "Happy April Fool's Day - 100 $fvSOLV giveaway", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 1},
  {name: "Make you DID on Arbitrum—SpaceID X Multichain", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 4},
  {name: "Tearing Spaces Game Review", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 5},
  {name: "The First Ever Avalanche OAT", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 2},
  {name: "St. Patrick's Day 2023 Celebration with LEND and TEN ...", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 3},
  {name: "Happy April Fool's Day - 100 $fvSOLV giveaway", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 4},
  {name: "Make you DID on Arbitrum—SpaceID X Multichain", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 1},
  {name: "Tearing Spaces Game Review", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 4},
  {name: "The First Ever Avalanche OAT", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 5},
  {name: "St. Patrick's Day 2023 Celebration with LEND and TEN ...", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 5},
  {name: "Happy April Fool's Day - 100 $fvSOLV giveaway", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 3},
  {name: "Make you DID on Arbitrum—SpaceID X Multichain", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 2},
  {name: "Tearing Spaces Game Review", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 1},
  {name: "The First Ever Avalanche OAT", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 4},
  {name: "St. Patrick's Day 2023 Celebration with LEND and TEN ...", token: 'HEX', chain: 'Ethereum', participant: '10,000', reviews: '6,000', rate: 5},
]

const value = ref(10)
const options = [
  { value: 10, label: 'Show 10 items', },
  { value: 20, label: 'Show 20 items', },
  { value: 50, label: 'Show 50 items', }
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
:deep(.el-input__inner){
  color: #fff;
}
</style>