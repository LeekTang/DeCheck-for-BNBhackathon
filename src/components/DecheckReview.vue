<template>
  <div class="w-[75rem] mx-auto mt-[4rem] mb-[14rem]" v-if="state.comments">
    <div class="text-[1.25rem] text-[#fff] font-extrabold">
      {{ t("decheckReview") }}
    </div>
    <div class="h-[208px] w-[792px] rounded-[20px] border border-[#ffffff1c] bg-[#110921] mt-[24px] p-[24px]">
      <p class="text-[32px] text-[#fff] leading-[32px]" style="font-family: Hezaedrus-Bold">
        RATE THIS ITEM
      </p>
      <p class="text-[14px] text-[#fff] leading-[14px] mt-[10px]" style="font-family: Hezaedrus-Medium">
        Share your idea
      </p>
      <div class="flex items-center justify-between mt-[40px] surface">
        <el-rate size="large" @click="reviewClick()"/>
        <p class="h-[48px] w-[180px] text-center bg-[#1E50FF] text-[#fff] text-[16px] leading-[48px] rounded-[12px] cursor-pointer"
          style="font-family: Hezaedrus-Bold" @click="reviewClick()">
          WRITE A REVIEW
        </p>
      </div>
    </div>
    <client-only>
      <el-dialog v-model="state.reviewShow" width="782px" align-center :show-close="false" :close-on-click-modal="false"
        class="bg-[#110921] rounded-[20px]">
        <template #header>
          <div class="flex justify-between items-start">
            <div class="flex">
              <img :src="state.project.logo" @error="imgError" class="h-[56px] w-[56px] rounded-[10px] mr-[16px]" />
              <div>
                <p class="text-[20px] text-[#fff]" style="font-family: Hezaedrus-Bold">
                  {{state.project.name}}
                </p>
                <p class="text-[14px] text-[#ffffffa8]" style="font-family: Hezaedrus-Regular">
                  Rate this item
                </p>
              </div>
            </div>
            <img src="/images/close.svg" class="h-[16px] w-[16px] cursor-pointer" @click="state.reviewShow = false" />
          </div>
        </template>

        <div class="surface text-center">
          <el-rate v-model="state.rateValue" size="large" />
        </div>
        <div class="surface mt-[40px]">
          <el-input v-model="state.textarea" type="textarea" maxlength="1500" :autosize="{ minRows: 2, maxRows: 6 }"
            resize="none" :placeholder="t('pleaseInput')" />
        </div>
        <div class="mt-[32px]">
          <div class="text-[1rem] text-[#FFFFFF] leading-[1rem]" style="font-family: Hezaedrus-Bold">
            {{ t("selectTags") }}
          </div>
          <div class="mt-[1rem]">
            <el-check-tag class="mr-[0.8rem]" v-for="(item, index) in checkList" :key="index" :checked="item.state"
              @click="checkClick(item)">{{ item.name }}</el-check-tag>
          </div>
        </div>
        <div class="text-[1rem] text-[#FFFFFF] leading-[1rem] mt-[32px] mb-[16px]" style="font-family: Hezaedrus-Bold">
          Add Attachment
        </div>
        <div class="flex">
          <el-upload action="https://test.decheck.io/decheck-apis/plugin/decheck/api/project/apply/upload"
            :file-list="state.elUpList" list-type="picture-card" :limit="state.limit" :show-file-list="false"
            :on-exceed="handleExceed" :before-upload="handleBefore" :on-success="handleVideo"
            :on-progress="uploadVideoProcess">
            <div class="flex flex-col items-center text-[#abaaaae0] text-[0.75rem]">
              <el-icon>
                <Plus />
              </el-icon>
            </div>
          </el-upload>
          <div v-if="state.video || state.videoFlag" class="relative bg-[#FFFFFF1C] ml-[1rem]">
            <el-progress v-if="state.videoFlag == true" type="circle" :width="64"
              :percentage="state.videoUploadPercent"></el-progress>
            <video v-if="state.video" class="h-[64px] w-[64px] rounded-[0.75rem]">
              <source :src="state.video" type="video/mp4" />
            </video>
            <img src="/images/close.svg" class="h-[1rem] w-[1rem] cursor-pointer absolute top-[0.5rem] right-[0.5rem]"
              @click="handleRemove" />
          </div>
          <div v-else class="w-[35rem] ml-[1rem] relative flex">
            <div v-for="(item, index) in state.fileList" :key="index"
              class="bg-[#ffffff1c] h-[64px] w-[64px] mr-[10px] relative text-center rounded-[0.75rem]">
              <el-progress v-if="state.imgFlag && index == state.fileList.length - 1"
                :style="{ position: 'absolute', bottom: 0, 'z-index': 10 }" color="red" :width="64" type="circle"
                :percentage="state.imgPload"></el-progress>
              <el-image fit="scale-down" :preview-src-list="state.fileList" preview-teleported :src="item"
                class="h-[64px] w-[64px]">
                <template #error>
                  <div class="h-[6rem] w-[6rem] bg-[#312963FF] rounded-[0.75rem]"></div>
                </template>
              </el-image>
              <img src="/images/close.svg" class="h-[1rem] w-[1rem] cursor-pointer absolute top-[0.5rem] right-[0.5rem]"
                @click="imgDelete(index)" />
            </div>
          </div>
        </div>
        <div class="mt-[32px] flex justify-end">
          <p :class="`${state.textarea ? 'bg-[#1E50FF] text-[#fff]' : 'bg-[#ffffff1c] text-[#ffffff54]'} h-[48px] w-[180px] cursor-pointer rounded-[12px] text-center leading-[48px] text-[16px]`"
            style="font-family: Hezaedrus-Bold" @click="submitClick">Write a review</p>
        </div>
      </el-dialog>
    </client-only>
    <client-only>
      <el-select v-model="state.selectValue" class="h-[3.5rem] w-[17.62rem] my-[1.5rem] mr-[1.5rem]" size="large" :teleported="false"
        @change="sortClick">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="state.selectType" class="h-[3.5rem] w-[17.62rem] my-[1.5rem]" size="large" :teleported="false"
        @change="sortClick">
        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </client-only>
    <div class="flex">
      <div class="w-[49.5rem]">
        <div v-for="(item, index) in state.comments" :key="index"
          class="w-full bg-[#110921] p-[1.5rem] rounded-[1.25rem] mb-[1.75rem] border border-solid border-[#ffffff1c]">
          <div class="flex justify-between items-start">
            <div class="flex items-center">
              <div :class="`${item.type == 1 ? 'avatar' : ''
                } h-[2.5rem] w-[2.5rem] rounded-full mr-[0.63rem] relative `">
                <img src="/images/avatar.png" class="h-[2.5rem] w-[2.5rem] rounded-full" />
              </div>
              <div class="mr-[0.63rem] text-[0.75rem] text-[#FFFFFFA8] font-bold">
                {{ abbr(item.userId) }}
              </div>
              <div
                :class="`${item.type == 1 ? 'reviewed' : 'bg-[#11B466]'
                  } flex items-center h-[1.2rem] px-[0.5rem] rounded-[1.25rem] text-[#fff] text-[0.63rem] font-semibold`">
                Reviewed: {{ item.reviewed }}
              </div>
            </div>
            <el-rate disabled size="large" v-model="item.score" />
          </div>
          <div :class="`${item.type == 1 ? 'content-wrap' : ''
            } relative  bg-[#FFFFFF1C] rounded-[0.75rem]`">
            <div class="mt-[1.5rem] rounded-[0.75rem] overflow-hidden p-[1rem] relative">
              <div class="flex justify-between mb-[1rem]">
                <div class="flex flex-wrap">
                  <p v-for="(com, index) in item.tags" :key="index"
                    class="h-[1rem] max-w-[5rem] overflow-hidden leading-[1rem] rounded-[0.25rem] text-[0.63rem] text-[#fff] bg-[#FFFFFF1C] mr-[0.5rem] px-[0.5rem]">
                    {{ com }}
                  </p>
                </div>
                <div class="text-[0.75rem] text-[#FFFFFFA8]">
                  {{ timestampToTime(item.createAt) }}
                </div>
              </div>
              <p class="text-[0.88rem] text-[#fff] leading-[1.25rem] whitespace-pre-wrap" v-html="item.content"></p>
            </div>
            <div v-if="item.video"
              class="h-[11.63rem] w-[46.5rem] rounded-[0.75rem] mt-[1.5rem] flex justify-center items-center">
              <video class="h-[8.63rem] w-[43.44rem] rounded-[0.75rem]" v-for="(video, index) in item.attachment"
                :key="index" controls>
                <source :src="video" type="video/mp4" />
              </video>
            </div>
            <div v-if="item.image" class="mt-[1.5rem] relative py-[1.5rem] rounded-[0.75rem] mx-[1rem]">
              <swiper :class="`swiperc${index}`" class="swiper-no-swiping"
                :style="`${item.attachment.length > 4 ? 'margin: 0 5rem' : ''}`">
                <swiper-slide v-for="(icon, index) in item.attachment" :key="index">
                  <el-image :hide-on-click-modal="true" fit="cover" :preview-src-list="item.attachment"
                    :initial-index="index" preview-teleported :src="icon"
                    class="w-[110px] h-[110px] bg-[#312963FF] rounded-[0.75rem] ml-[0.75rem]" />
                </swiper-slide>
              </swiper>
              <div v-if="item.attachment.length > 4"
                class="swiper-button-next h-[4rem] w-[4rem] absolute right-0 top-[50%] translate-y-[-50%] z-50">
                <img src="/images/swiper_right.svg" class="h-[4rem] w-[4rem] cursor-pointer" />
              </div>
              <div v-if="item.attachment.length > 4"
                class="swiper-button-prev h-[4rem] w-[4rem] absolute left-0 top-[50%] translate-y-[-50%] z-50">
                <img src="/images/swiper_left.svg" class="h-[4rem] w-[4rem] cursor-pointer" />
              </div>
            </div>
          </div>
          <div :class="`${item.liked ? 'bg-[#fff] text-[#121D43FF]' : 'text-[#FFFFFFA8]'
            } h-[2rem] w-[4.88rem] mt-[1.5rem] 
            flex items-center justify-center border-2 border-[#FFFFFFA8] rounded-[0.75rem] cursor-pointer`"
            @click="likeClick(item.liked, item.id)">
            <img :src="item.liked ? '/images/like.svg' : '/images/notlike.svg'" class="h-[1rem] w-[1rem] mr-[0.5rem]" />
            <p>{{ item.helpful }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue";
import { ElRate, ElImage, ElMessage } from "element-plus";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import Swipers from "swiper";
import { onMounted, ref, reactive, defineProps } from "vue";
import request from "@/src/utils/request";
import web3js from "@/src/utils/link";
import { abbr,imgError, timestampToTime, matchType } from "@/src/utils/utils";
SwiperCore.use([Autoplay, Navigation]);
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { userStore } from "@/src/stores/user";
const store = userStore();
const runConfig = useRuntimeConfig();
import { projectStore } from '@/src/stores/project'
const proStore = projectStore();

const options = [
  { value: 1, label: t("latest") },
  { value: 2, label: t("hottest") },
];

const options2 = [
  { value: 0, label: t('all') },
  { value: 1, label: t('reviewer') },
  { value: 2, label: t('auditor') },
  { value: 3, label: t('researcher') },
  { value: 4, label: t('producer') },
]

const props = defineProps({
  projectID: {
    type: String,
  },
  isCheck: {
    type: Boolean
  }
});

const checkList = reactive([
  { name: "General", state: false },
  { name: "Contract", state: false },
  { name: "Tokenomics", state: false },
  { name: "Team", state: false },
  { name: "BUG", state: false },
  { name: "Investment", state: false },
  { name: "Other", state: false },
]);

const checkClick = (item) => {
  if (checkList.filter((ele) => ele.state).length < 3 || item.state) {
    item.state = !item.state;
  } else {
    ElMessage({
      message: t('tagLimit'),
      type: 'error',
      offset: 120
    })
  }
};

const state = reactive({
  selectValue: 2,
  selectType: 0,
  comments: [],
  isSign: computed(() => store.getIsSign),
  reviewShow: false,
  project: {},

  rateValue: 3,
  limit: 9,
  textarea: "",
  elUpList: [],
  fileList: [],
  video: "",
  videoFlag: false,
  videoUploadPercent: 0,
});

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning({
    dangerouslyUseHTMLString: true,
    message: `${t("limit", {
      limit: state.limit,
      files: files.length,
      all: files.length + uploadFiles.length,
    })}`,
    offset: 120
  });
};
//在上传阶段先判断是图片还是视频
const handleBefore = (files, fileList) => {
  if (state.fileList.length >= 1) {
    if (files.type == "video/mp4") {
    ElMessage({
      message: t('videoAndImg'),
      type: 'error',
      offset: 120
    })
      return false;
    } else {
      state.fileList.push("..");
    }
  } else {
    if (files.type == "video/mp4") {
      state.limit = 1;
    } else {
      state.limit = 9;
    }
  }
};
//在上传成功阶段 将视频转换显示
const handleVideo = (res, file) => {
  state.videoFlag = false;
  state.imgFlag = false;
  if (res.data.file.tag == "mp4") {
    state.video = res.data.file.url;
  } else {
    state.fileList.pop();
  }
  state.fileList.push(res.data.file.url);
};

//上传视频时，进度条
const uploadVideoProcess = (event, file, fileList) => {
  if (file.raw.type == "video/mp4") {
    state.videoFlag = true;
    state.videoUploadPercent = parseInt(file.percentage.toFixed(0));
  } else {
    state.imgFlag = true;
    state.imgPload = parseInt(file.percentage.toFixed(0));
  }
  state.elUpList = fileList;
};

//视频删除
const handleRemove = (file) => {
  (state.videoFlag = false), (state.video = ""), (state.videoUploadPercent = 0);
  state.fileList = [];
  state.elUpList = [];
  state.limit = 9;
};

const imgDelete = (index) => {
  state.fileList.splice(index, 1);
  state.elUpList.splice(index, 1);
};

const submitClick = () => {
    let tagList = []
    checkList.forEach(item => {
      if (item.state == true) {
        tagList.push(item.name)
      }
    })
    if (state.textarea.length == 0) {
      ElMessage({
        message: t('reviewNull'),
        type: 'error',
        offset: 120
      })
      return false
    } else if (state.videoFlag) {
      ElMessage({
        message: t('uploadNow'),
        type: 'error',
        offset: 120
      })
      return false
    } else {
      let data = {
        content: state.textarea,
        projectId: props.projectID,
        projectName: state.project.name,
        chainId:  props.isCheck ? store.chain : proStore.chainID,
        tokenAddr:  props.isCheck ? store.tokenAddr : proStore.tokenAddr,
        score: state.rateValue,
        tags: tagList,
        type: 0,
        userId: store.userInfo.account,
        visible: true,
        attachment: state.fileList
      }
      request({ url: '/plugin/decheck/api/project/review/add', data, method: 'post' }).then(res => {
        if (res != null) {
          ElMessage({
            message: t('submitSuccess'),
            type: 'success',
            offset: 120
          })
          checkList.forEach(el => {
            el.state = false
          })
          state.rateValue = 0
          state.textarea = ""
          state.reviewShow = false;
          state.fileList = [];
          state.elUpList = [];
          projectInfo();
        }
      })
    }
}

const reviewClick = () => {
  if (state.isSign) {
    state.reviewShow = true;
  }else{
    login()
  }
};

const projectInfo = () => {
  request
    .get(
      `/plugin/decheck/api/project/detail/review/page/${props.projectID}?page=1&pageSize=50&sort=${state.selectValue}&type=${state.selectType}`
    )
    .then((res) => {
      if (res.list) {
        state.comments = res.list;
        state.comments.forEach((el, index) => {
          if (el.attachment) {
            if (
              matchType(el.attachment[0]) == "video" &&
              el.attachment.length == 1
            ) {
              el.video = true;
            } else if (
              matchType(el.attachment[0]) == "image" &&
              el.attachment.length >= 1
            ) {
              el.image = true;
              setTimeout(() => {
                new Swipers(`.swiperc${index}`, {
                  slidesPerView: 4,
                  navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  },
                });
              }, 1000);
            }
          }
        });
      }
    });
};

const likeClick = (type, id) => {
  if (state.isSign) {
    state.comments.forEach((el, index) => {
      if (el.id == id) {
        el.liked = !type;
        if (el.liked) {
          el.helpful = el.helpful + 1;
        } else {
          el.helpful = el.helpful - 1;
        }
      }
    });
    request.get(`/plugin/decheck/api/user/review/like/${id}`).then((res) => {
      projectInfo();
    });
  } else {
    login()
  }
};

const login = () => {
  web3js.connect().then((res) => {
    if (res == undefined) {
      return;
    }
    web3js.change().then((chanres) => {
      if (chanres == true) {
        store.isSign = false;
        store.userInfo = {};
        localStorage.language = "";
        localStorage.token = "";
      }
    });
    web3js.getSign().then((signres) => {
      if (signres.signMessage) {
        let data = {
          aggregateType: 7,
          appId: runConfig.public.VITE_LOGIN_ID,
          authId: signres.account,
          strSign: signres.signMessage,
          type: 4,
          data: runConfig.public.VITE_SIGN_TEXT,
        };
        request({
          url: `/center/apis/user/user-login/login`,
          method: "post",
          data: data,
          baseURL: runConfig.public.VITE_LOGIN_URL,
        }).then((loginres) => {
          localStorage.setItem("token", loginres.tokenValue);
          store.userInfo = { account: signres.account };
          store.isSign = true;
        });
      }
    });
  });
}

const projectDelite = () => {
  request.get(`/plugin/decheck/api/project/detail/${props.projectID}`).then((res) => {
    if(res.tokenAddr){
      res.tokenList = Object.entries(res.tokenAddr)
    }
    state.project = res
    if(state.project.auditor){
      state.project.auditor = state.project.auditor.join()
    }
    if(state.project.invest){
      state.project.invest = state.project.invest.join()
    }
  })
}

const sortClick = (val) => {
  projectInfo();
};

onMounted(() => {
  projectInfo();
  projectDelite()
});
</script>

<style scoped>
.content-wrap:before {
  content: "";
  position: absolute;
  inset: 0px;
  height: 100%;
  width: 100%;
  background: radial-gradient(#c42d01 0%,
      #c42d01 10%,
      #fcf26e 40%,
      #00e754 60%,
      #00eef4 70%,
      #0070f3 100%);
  background-size: 300% 300%;
  padding: 2px;
  border-radius: 0.75rem;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: shining-gradient-svg_translateGradient 10s linear infinite;
  will-change: background-position;
}

.avatar:before {
  content: "";
  position: absolute;
  inset: -2px;
  height: 110%;
  width: 110%;
  background: radial-gradient(#c42d01 0%,
      #c42d01 10%,
      #fcf26e 40%,
      #00e754 60%,
      #00eef4 70%,
      #0070f3 100%);
  background-size: 300% 300%;
  padding: 2px;
  border-radius: 30rem;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: shining-gradient-svg_translateGradient 10s linear infinite;
  will-change: background-position;
}

.reviewed {
  background: radial-gradient(#11b466 0%, #1e50ff 100%);
  background-size: 300% 300%;
  animation: shining-gradient-svg_translateGradient 10s linear infinite;
  will-change: background-position;
  -webkit-mask: none;
  mask: none;
  -webkit-mask-composite: none;
  mask-composite: none;
}

@keyframes shining-gradient-svg_translateGradient {
  0% {
    background-position: -20% -20%;
  }

  25% {
    background-position: 30% 80%;
  }

  50% {
    background-position: 110% 110%;
  }

  75% {
    background-position: 80% 30%;
  }

  to {
    background-position: -20% -20%;
  }
}

.surface :deep(.el-rate__icon) {
  font-size: 48px !important;
}

:deep(.el-dialog) {
  background: #110921;
  border-radius: 20px !important;
}

.surface :deep(.el-textarea__inner) {
  background: #ffffff1c;
  line-height: 27px;
  color: #fff;
}

:deep(.el-check-tag) {
  background-color: #ffffff1c;
  color: #fff;
  font-weight: 400;
  border-radius: 30px;
}

:deep(.el-check-tag.is-checked) {
  background-color: #ffffff;
  color: #121d43;
}

:deep(.el-upload--picture-card) {
  height: 64px;
  width: 64px;
  background-color: #ffffff1c;
  border: none;
}

:deep(.el-upload-list__item) {
  height: 6rem;
  width: 6rem;
}

/* 下拉选择样式 */
:deep(.el-input__wrapper) {
  height: 3.5rem;
  background-color: #ffffff1c;
  box-shadow: none;
  border-radius: 20px;
}

:deep(.el-input__inner) {
  color: #fff;
}

:deep(.el-select-dropdown__item.hover, .el-select-dropdown__item:hover) {
  background-color: #493d6a;
  border-radius: 0.25rem;
}

:deep(.el-select-dropdown__item) {
  height: 3rem;
  line-height: 3rem;
  color: #fff;
  margin: 0 0.5rem;
}

:deep(.el-popper.is-light) {
  background-color: #252033;
  border: none;
}

:deep(.el-rate__icon) {
  font-size: 20px !important;
}
</style>