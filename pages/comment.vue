<template>
  <div class="relative w-full text-gray-700 bg-[#190A43] min-h-screen">
    <HeaderView />
    <div class="w-[75rem] mx-auto mt-[8rem]">
      <div class="h-full w-[4.88rem] text-center leading-[3.5rem] bg-[#322558] cursor-pointer rounded-[0.75rem] mr-[1.5rem]" @click="back">
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
          <el-rate v-model="state.rateValue" size="large"></el-rate>
        </div>
        <div class="text-[1rem] text-[#FFFFFF] leading-[1rem] font-bold mt-[2rem]">Content of review</div>
        <div class="mt-[1rem] w-[48rem] bg-[#FFFFFF1C] rounded-[1.25rem] p-[1.5rem]">
          <el-input v-model="state.textarea" type="textarea" :autosize="{minRows:6,maxRows:20}" resize="none" placeholder="Please input"/>
          <div class="flex">
            <el-upload 
              action="http://192.168.101.12:9998/decheck-apis/plugin/decheck/api/project/apply/upload"
              :file-list="state.elUpList" 
              list-type="picture-card" :limit="state.limit" :show-file-list="false"
              :on-exceed="handleExceed" :before-upload="handleBefore" :on-success="handleVideo"
              :on-progress="uploadVideoProcess" 
              >
              <div class="flex flex-col items-center text-[#abaaaae0] text-[0.75rem]">
                <el-icon><Plus /></el-icon>
                <p class="mt-[0.75rem]">Pictures and videos</p>
              </div>
            </el-upload>
            <div v-if="state.video || state.videoFlag" class="relative bg-[#FFFFFF1C] ml-[1rem]">
              <el-progress v-if="state.videoFlag == true" type="circle" :width="90" :percentage="state.videoUploadPercent"></el-progress>
              <video v-if="state.video" class="h-[6rem] w-[14rem] rounded-[0.75rem]">
                <source :src="state.video" type="video/mp4">
              </video>
              <img src="/images/close.svg" class="h-[1rem] w-[1rem] cursor-pointer absolute top-[0.5rem] right-[0.5rem]" @click="handleRemove" />
            </div>
            <div v-else class="w-[35rem] ml-[1rem]">
              <swiper class="commentSwiper">
                <swiper-slide  class="bg-[#312963FF] relative text-center rounded-[0.75rem]" v-for="(item,index) in state.fileList" :key="index" >
                  <el-progress v-if="state.imgFlag && (index == state.fileList.length - 1)" :style="{position:'absolute' ,bottom:0 , 'z-index': 10}" color="red" :width="96" type="circle" :percentage="state.imgPload"></el-progress>
                  <el-image fit="scale-down" :preview-src-list="state.fileList" preview-teleported :src="item" class="h-[6rem] w-[6rem]" >
                    <template #error>
                      <div class="h-[6rem] w-[6rem] bg-[#312963FF] rounded-[0.75rem]"></div>
                    </template>
                  </el-image>
                  <img src="/images/close.svg" class="h-[1rem] w-[1rem] cursor-pointer absolute top-[0.5rem] right-[0.5rem]" @click="imgDelete(index)" />
                </swiper-slide>
                <div class="swiper-button-next cursor-pointer h-[2rem] w-[2rem] absolute right-0 top-[50%] translate-y-[-50%] z-50">
                  <img src="/images/project-right.svg" class="h-[2rem] w-[2rem]">
                </div>
                <div class="swiper-button-prev cursor-pointer h-[2rem] w-[2rem] absolute left-0 top-[50%] translate-y-[-50%] z-50">
                  <img src="/images/project-left.svg" class="h-[2rem] w-[2rem]">
                </div>
              </swiper>
            </div>
          </div>
        </div>
        <div class="mt-[1.5rem] h-[3rem] w-[11.25rem] cursor-pointer bg-[#1E50FF] leading-[3rem] text-center text-[1rem]
         text-[#fff] font-bold rounded-[0.75rem]" @click="submitClick()">Submit</div>
      </div>
    </div>
    
    <BottomBar />
  </div>
</template>

<script setup>
import HeaderView from '@/src/components/Header.vue';
import BottomBar from '@/src/components/BottomBar.vue';
import { ElMessage, ElImage } from 'element-plus';
import { ref, reactive, onMounted } from 'vue'
import request from '@/src/utils/request'
import { Plus } from '@element-plus/icons-vue'
import SwiperCore, {Autoplay, Navigation} from 'swiper'
import Swipers from 'swiper'
SwiperCore.use([Autoplay,Navigation])
import { userStore } from '@/src/stores/user'
import { useI18n } from  'vue-i18n'
const { t,locale } = useI18n();
const store = userStore();
const route = useRoute();
const router = useRouter()

const checkList = reactive ([
  {name: 'General', state: false},
  {name: 'Contract', state: false},
  {name: 'Tokenomics', state: false},
  {name: 'Team', state: false},
  {name: 'BUG', state: false},
  {name: 'Investment company', state: false},
  {name: 'Other', state: false}
])

const checkClick = (item) => {
  if(checkList.filter(ele => ele.state ).length < 3 || item.state){
    item.state = !item.state
  }else{
    ElMessage.error('标签不能超过3个')
  }
}

const state = reactive({
  rateValue: 0,
  limit: 9,
  textarea: "",
  elUpList: [],
  fileList: [],
  video: "",
  videoFlag: false,
  videoUploadPercent: 0
})

const handleExceed  = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 9, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}
//在上传阶段先判断是图片还是视频
const handleBefore = (files,fileList) => {
  if(state.fileList.length >= 1){
    if(files.type == 'video/mp4'){
      ElMessage.error('视频和图片不能共传')
      return false
    }
  }else{
    if(files.type == 'video/mp4'){
      state.limit = 1
    }else{
      state.limit = 9
    }
  }
}
//在上传成功阶段 将视频转换显示
const handleVideo = (res, file) => {
  state.videoFlag = false
  state.imgFlag = false;
  if(res.data.file.tag == 'mp4'){
    state.video = res.data.file.url
  }
  state.fileList.pop()
  state.fileList.push(res.data.file.url)
  
}

//上传视频时，进度条
const uploadVideoProcess = (event, file, fileList) => {
  if(file.raw.type == 'video/mp4'){
    state.videoFlag = true;
    state.videoUploadPercent = parseInt(file.percentage.toFixed(0))
  }
  state.imgFlag = true;
  state.imgPload = parseInt(file.percentage.toFixed(0))
  state.elUpList = fileList
  state.fileList.push('..')
}

//视频删除
const handleRemove = (file) => {
  state.videoFlag = false,
  state.video = "",
  state.videoUploadPercent = 0
  state.fileList = []
  state.elUpList = []
  state.limit = 9
}

const imgDelete = (index) => {
  state.fileList.splice(index,1)
  state.elUpList.splice(index,1)
}

const back = () => {
  router.back()
}

const submitClick = () => {
  let tagList = []
  checkList.forEach(item => {
    if(item.state == true){
      tagList.push(item.name)
    }
  })
  if(state.textarea.length == 0) {
    ElMessage.error('请输入点评')
    return false
  }else if(state.videoFlag){
    ElMessage.error('请等待上传成功')
    return false
  }else {
    let data = {
      content: state.textarea,
      projectId: route.query.id,
      projectName: route.query.name,
      score: state.rateValue,
      tags: tagList,
      type: 0,
      userId: store.userInfo.account,
      visible: true,
      attachment: state.fileList
    }
    request({url: '/plugin/decheck/api/project/review/add' , data , method: 'post'}).then(res=>{
      if(res != null){
        checkList.forEach(el => {
          el.state = false
        })
        state.rateValue = 0
        state.textarea = ""
        router.back()
      }
    })
  }
}

onMounted(()=>{
  new Swipers('.commentSwiper',{
      slidesPerView: 5,
      spaceBetween: 16,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  })
})
</script>

<style scoped>

.swiper-slide{
  width: 96px !important;
  margin-right: 16px;
}

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

:deep(.el-upload--picture-card){
  height: 6rem;
  width: 9rem;
  background-color: #FFFFFF1C;
  border: none;
}

:deep(.el-upload-list__item){
  height: 6rem;
  width: 6rem;
}

</style>