<template>
  <div class="relative w-full text-gray-700 bg-[#190A43] min-h-screen">
    <HeaderView />
    <div class="w-[75rem] mx-auto mt-[8rem]">
      <div class="h-full w-[4.88rem] text-center leading-[3.5rem] bg-[#322558] rounded-[0.75rem] mr-[1.5rem]" @click="back">
        <img src="/images/back.svg" class="inline-block"/>
      </div>
      <div class="mt-[1.5rem] w-[51rem] p-[1.5rem] com-bg rounded-[1.25rem]">
        <div class="text-[1rem] text-[#FFFFFF] leading-[1rem] font-bold">Select Tags</div>
        <div class="text-[0.88rem] text-[#FFFFFFA8] leading-[0.88rem] mt-[1rem]">You can choose up to three tags</div>
        <div class="mt-[1rem]">
          <el-check-tag class="mr-[1rem]" v-for="(item, index) in checkList" :key="index" :checked="item.state" @click="checkClick(item)">{{item.name}}</el-check-tag>
        </div>
        <div class="text-[1rem] text-[#FFFFFF] leading-[1rem] font-bold mt-[2rem]">Score</div>
        <div class="mt-[1rem]">
          <el-rate v-model="rateValue" size="large"></el-rate>
        </div>
        <div class="text-[1rem] text-[#FFFFFF] leading-[1rem] font-bold mt-[2rem]">Content of review</div>
        <div class="mt-[1rem] w-[48rem] bg-[#FFFFFF1C] rounded-[1.25rem] p-[1.5rem]">
          <el-input v-model="textarea" type="textarea" :rows="6" placeholder="Please input"/>
          <el-upload action="#" multiple :limit="9" :file-list="uploadFiles" list-type="picture-card" :show-file-list="true" :auto-upload="false" :on-exceed="handleExceed">
            <div class="flex flex-col items-center text-[#abaaaae0] text-[0.75rem]">
              <el-icon><Plus /></el-icon>
              <p class="mt-[0.75rem]">Pictures and videos</p>
            </div>
          </el-upload>
          <div v-for="(item,index) in uploadFiles" :key="index">111 {{item}}</div>
        </div>
        <div class="mt-[1.5rem] h-[3rem] w-[11.25rem] bg-[#1E50FF] leading-[3rem] text-center text-[1rem] text-[#fff] font-bold rounded-[0.75rem]">Submit</div>
      </div>
    </div>
    
    <BottomBar />
  </div>
</template>

<script setup lang="ts">
import HeaderView from '@/src/components/Header.vue';
import BottomBar from '@/src/components/BottomBar.vue';
import { ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const checkList = reactive ([
  {name: 'General', state: false},
  {name: 'Contract', state: false},
  {name: 'Tokenomics', state: false},
  {name: 'Team', state: false},
  {name: 'BUG', state: false},
  {name: 'Investment company', state: false},
  {name: 'Other', state: false}
])

const checkClick = (item:any) => {
  if(checkList.filter(ele => ele.state ).length < 3 || item.state){
    item.state = !item.state
  }else{
    ElMessage.error('标签不能超过3个')
  }
}

const rateValue = ref(null)
const uploadFiles = reactive([])
const textarea = ref('')
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}
</script>

<style scoped>
.com-bg{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}

:deep(.el-check-tag){
  background-color: #FFFFFF1C;
}
:deep(.el-check-tag.is-checked){
  background-color: #FFFFFF;
  color: #121D43FF;
}

:deep(.el-textarea__inner){
  background-color: transparent;
  box-shadow: none;
  color: #FFFFFF;
}

</style>