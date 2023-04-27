<template>
  <div class="w-[75rem] mx-auto mt-[6.5rem]">
    <div class="h-full w-[4.88rem] text-center leading-[3.5rem] bg-[#322558] rounded-[0.75rem] mr-[1.5rem]" @click="back">
      <img src="/images/back.svg" class="inline-block"/>
    </div>
    <div class="w-[75rem] p-[1.5rem] from-bg rounded-[1.25rem] mt-[1.5rem]">
      <el-form ref="applyForm" :model="Form" label-width="auto" label-position="top">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="What do you want to apply for">
              <el-input v-model="Form.type" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Project Name">
              <el-input v-model="Form.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="Your E-mail">
              <el-input v-model="Form.email" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Token address">
              <el-input v-model="Form.tokenAddress" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="Your Telegram link">
              <el-input v-model="Form.telegram" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Website">
              <el-input v-model="Form.website" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="18">
            <el-form-item label="Leave a message">
              <el-input v-model="Form.message" type="textarea" :rows="9"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Attachment">
              <div class="h-[12.4rem] w-[16.25rem] bg-[#FFFFFF1C] text-[#fff] flex items-center 
                justify-center flex-col relative" v-if="Form.imageUrl || Form.progress">
                <el-progress v-if="Form.progress" type="circle" :width="90" :percentage="Form.uploadPercent"></el-progress>
                <img v-else  src="/images/file.svg" class="h-[3.5rem] w-[4rem]" />
                <img src="/images/close.svg" class="h-[1rem] w-[1rem] cursor-pointer absolute top-[0.5rem] right-[0.5rem]" @click="deleteClick" />
                <span>{{Form.fileName}}</span>
              </div>
              <el-upload
                v-else
                class="h-[12.4rem] w-[16.25rem] bg-[#FFFFFF1C] flex items-center justify-center"
                action="https://test.decheck.io/decheck-apis/plugin/decheck/api/project/apply/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-progress="uploadVideoProcess" 
              >
                <img src="/images/plus.svg" class="h-[5rem] w-[5rem]">
              </el-upload>
              
            </el-form-item>
          </el-col>
        </el-row>
        <div class="h-[3rem] w-[11.25rem] bg-[#1E50FF] text-[1rem] text-[#fff] text-center leading-[3rem] rounded-[0.75rem]">Submit</div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const router = useRouter()
const Form = reactive({
  type: '',
  name: '',
  email: '',
  tokenAddress: '',
  telegram: '',
  website: '',
  message: '',
  imageUrl: '',
  fileName: '',
  progress: false,
  uploadPercent: 0,
})


const handleAvatarSuccess = (res,file) => {
  Form.progress = false;
  Form.imageUrl = res.data.file.url
  Form.fileName = res.data.file.name
}

const uploadVideoProcess = (event, file, fileList) => {
  Form.progress = true;
  Form.uploadPercent = parseInt(file.percentage.toFixed(0))
}

const deleteClick = () => {
  Form.imageUrl = ''
  Form.fileName = ''
}

const back = () => {
  router.back()
}

</script>

<style scoped>
.from-bg{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}

:deep(.el-form-item__label){
  font-size: 1rem;
  color: #FFFFFFA8;
  line-height: 1rem;
}

:deep(.el-input__wrapper){
  height: 3rem;
  background: #FFFFFF1C;
  box-shadow: none;
}
:deep(.el-input__inner){
  color: #fff;
}
:deep(.el-textarea__inner){
  background: #FFFFFF1C;
  box-shadow: none;
  color: #fff;
}
</style>