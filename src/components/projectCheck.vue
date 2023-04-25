<template>
  <div class="w-[75rem] mx-auto mt-[4rem]" v-if="Object.keys(state.goInfo).length > 0">
    <div class="text-[1.25rem] text-[#fff] font-extrabold">{{ t('checkReport') }}</div>
    <client-only>
      <el-select v-model="proStore.chain" class="h-[3.5rem] w-[17.62rem] mt-[1.5rem]" size="large" @change="chainChange" :teleported="false">
        <el-option v-for="(item,index) in state.tokenList" :key="item[0]" :label="item.chain" :value="index"/>
      </el-select>
    </client-only>
    <div class="w-full basic-bg rounded-[1.25rem] mt-[1.5rem]">
      <div class="w-full h-[4rem] leading-[4rem] bg-[#FFFFFF1C] rounded-t-[1.25rem] flex justify-between items-center px-[1.5rem]">
        <p class="text-[1.25rem] font-bold text-gradient">{{ t('riskCheck') }}</p>
        <div class="text-[#FFFFFF] font-bold w-[16.13rem] h-[2rem] px-[1rem] rounded-[0.75rem] bg-[#1E50FFFF] flex items-center justify-between" @click="jumpClick">
          <p class="h-[1rem] leading-[14px]">{{ t('viewDetails') }}</p>
          <img src="/images/jump.svg" class="h-[1rem] w-[1rem]">
        </div>
      </div>
      <div class="p-[1.5rem]" v-loading="state.load" element-loading-background="rgba(122, 122, 122, 0.8)" element-loading-text="Loading...">
        <div class="flex justify-between flex-wrap">
          <template v-for="(item, index) in listOrder" :key="index">
            <div v-if="state.goInfo.hasOwnProperty(item.key)" class="h-[3.5rem] w-[33.75rem] flex items-center border-b-2 border-b-[#FFFFFF1C]">
              <template v-if="item.grade == 1">
                <img :src="state.goInfo[item.key] == 1 ? '/images/danger.svg' : (state.goInfo[item.key] == 0 ? '/images/success.svg' : '/images/warning.svg')" class="h-[1.5rem] w-[1.5rem] mr-[1.5rem]">
              </template>
              <template v-else-if="item.grade == 2">
                <img :src="state.goInfo[item.key] == 1 ? '/images/warning.svg' : (state.goInfo[item.key] == 0 ? '/images/success.svg' : '/images/danger.svg')" class="h-[1.5rem] w-[1.5rem] mr-[1.5rem]">
              </template>
              <template v-else-if="item.grade == 3">
                <img :src="state.goInfo[item.key] == 1 ? '/images/success.svg' : (state.goInfo[item.key] == 0 ? '/images/danger.svg' : '/images/warning.svg')" class="h-[1.5rem] w-[1.5rem] mr-[1.5rem]">
              </template>
              <template v-else-if="item.grade == 4">
                <img :src="state.goInfo[item.key] == 1 ? '/images/success.svg' : (state.goInfo[item.key] == 0 ? '/images/warning.svg' : '/images/danger.svg')" class="h-[1.5rem] w-[1.5rem] mr-[1.5rem]">
              </template>
              <template v-else>
                <img :src="state.goInfo[item.key] == 1 ? '/images/danger.svg' : (state.goInfo[item.key] == 0 ? '/images/warning.svg' : '/images/success.svg')" class="h-[1.5rem] w-[1.5rem] mr-[1.5rem]">
              </template>
              <p class="text-[1rem]" :style="{color: state.goInfo[item.key] == 0 ? item.color0 : item.color1}">{{t(item.key + state.goInfo[item.key])}}</p>
            </div>
          </template>
        </div>
        <p class="text-[1rem] text-[#fff] font-bold mt-[1.5rem]">{{t('goTitle')}}</p>
        <div class="text-[0.88rem] text-[#FFFFFFA8] leading-[1.38rem] mt-[1rem]">
          <p>{{t('goTips1')}}</p>
          <p>{{t('goTips2')}}</p>
        </div>
        <a href="https://gopluslabs.io/" target="_blank"><img src="/images/goplus.png" class="h-[1.5rem] w-[10.5rem] mt-[1.5rem] cursor-pointer"/></a>
      </div>
    </div>
    <div class="flex justify-between mt-[1.5rem]">
      <div class="w-[36.75rem] h-[31.5rem] rounded-[1.25rem] basic-bg">
        <div class="w-full h-[4rem] leading-[4rem] bg-[#FFFFFF1C] rounded-t-[1.25rem]">
          <p class="text-[1.25rem] font-bold text-gradient pl-[1.5rem] ">{{ t('basicInfo') }}</p>
        </div>
        <div class="p-[1.5rem] text-[0.88rem]">
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">{{ t('tokenName') }}</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-if="state.goInfo.token_symbol">{{state.goInfo.token_symbol}} ({{state.goInfo.token_name}})</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-else> -- </p>
          </div>
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">{{ t('tokenContractAddress') }}</p>
            <div class="flex items-center text-[#FFFFFF] font-bold w-[18rem] cursor-pointer" v-if="state.tokenList">
              <p @click="goToUrl(state.tokenList[proStore.chain][1])">{{abbr(state.tokenList[proStore.chain][1])}}</p>
              <img src="/images/copy.svg" class="h-[1rem] w-[1rem] ml-[0.5rem]" @click="copyClick(state.tokenList[proStore.chain][1])"/>
            </div>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-else> -- </p>
          </div>
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">{{ t('contractCreator') }}</p>
            <div class="flex items-center text-[#FFFFFF] font-bold w-[18rem] cursor-pointer" v-if="state.goInfo.creator_address">
              <p @click="goToUrl(state.goInfo.creator_address)">{{abbr(state.goInfo.creator_address)}}</p>
              <img src="/images/copy.svg" class="h-[1rem] w-[1rem] ml-[0.5rem]" @click="copyClick(state.goInfo.creator_address)"/>
            </div>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-else> -- </p>
          </div>
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">{{ t('contractOwner') }}</p>
            <div class="flex items-center text-[#FFFFFF] font-bold w-[18rem] cursor-pointer" v-if="state.goInfo.owner_address">
              <p @click="goToUrl(state.goInfo.owner_address)">{{abbr(state.goInfo.owner_address)}}</p>
              <img src="/images/copy.svg" class="h-[1rem] w-[1rem] ml-[0.5rem]" @click="copyClick(state.goInfo.owner_address)"/>
            </div>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-else> -- </p>
          </div>
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">{{ t('totalSupply') }}</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-if="state.goInfo.total_supply">{{toShort( state.goInfo.total_supply, 2) || '--'}}</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-else> -- </p>
          </div>
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">{{ t('launchTime') }}</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]">{{state.goInfo.time || '-'}}</p>
          </div>
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">{{ t('Website') }}</p>
            <a :href="state.projectInfo.website" target="_blank">
              <div class="text-[#FFFFFF] font-bold w-[18rem] h-[2rem] px-[1rem] rounded-[0.75rem] bg-[#1E50FFFF] flex items-center justify-between">
                <p class="overflow-hidden whitespace-nowrap text-ellipsis">{{state.projectInfo.website}}</p>
                <img src="/images/out.svg" class="h-[1rem] w-[1rem]">
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="w-[36.75rem] h-[31.5rem] rounded-[1.25rem] basic-bg">
        <div class="w-full h-[4rem] leading-[4rem] bg-[#FFFFFF1C] rounded-t-[1.25rem]">
          <p class="text-[1.25rem] font-bold text-gradient pl-[1.5rem] ">{{ t('transactionInfo') }}</p>
        </div>
        <div class="p-[1.5rem] text-[0.88rem]">
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">{{ t('price') }}</p>
            <p class="text-[#FFFFFF] text-[1.5rem] font-bold">{{state.goInfo.price || '-'}}</p>
          </div>
          <div class="h-[3.5rem] flex justify-between items-center">
            <p class="text-[#FFFFFFA8]">DEX</p>
            <div class="text-[#FFFFFF] text-[0.75rem] font-bold w-[16.13rem] h-[2rem] px-[1rem] rounded-[0.75rem] bg-[#1E50FFFF] flex items-center justify-between">
              <p v-if="state.goInfo.dex">{{state.goInfo.dex[0].name}}</p>
              <p v-else>--</p>
              <div class="flex items-center">
                Tread
                <img src="/images/out.svg" class="h-[1rem] w-[1rem] ml-[1rem]">
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="h-[17.5rem] w-[16.13rem] bg-[#ffffff1c] rounded-[0.75rem] p-[1rem]">
              <div class="flex justify-between leading-[1rem]">
                <p class="text-[1rem] text-[#fff] font-medium">{{ t('buyTax') }}</p>
                <p class="text-[1rem] text-[#11B466] font-bold">{{state.goInfo.buy_tax || '-'}}</p>
              </div>
              <div class="flex justify-center items-center flex-col h-[11.5rem] w-[14.12rem] bg-[#ffffff14] rounded-[0.5rem] my-[1rem]">
                <img src="/images/notLogo.png" class="w-[2.93] h-[3.25rem]"/>
                <p class="text-[1rem] text-[#ffffff54] mt-[1rem]">Tax details not found</p>
              </div>
              <div class="flex justify-between leading-[1rem]">
                <p class="text-[1rem] text-[#fff] font-medium">{{t('buyGas')}}</p>
                <p class="text-[1rem] text-[#11B466] font-bold">{{state.goInfo.buyGas || '-'}}</p>
              </div>
            </div>
            <div class="h-[17.5rem] w-[16.13rem] bg-[#ffffff1c] rounded-[0.75rem] p-[1rem]">
              <div class="flex justify-between leading-[1rem]">
                <p class="text-[1rem] text-[#fff] font-medium">{{ t('sellTax') }}</p>
                <p class="text-[1rem] text-[#FF5353FF] font-bold">{{state.goInfo.sell_tax || '-'}}</p>
              </div>
              <div class="flex justify-center items-center flex-col h-[11.5rem] w-[14.12rem] bg-[#ffffff14] rounded-[0.5rem] my-[1rem]">
                <img src="/images/notLogo.png" class="w-[2.93] h-[3.25rem]"/>
                <p class="text-[1rem] text-[#ffffff54] mt-[1rem]">Tax details not found</p>
              </div>
              <div class="flex justify-between leading-[1rem]">
                <p class="text-[1rem] text-[#fff] font-medium">{{t('sellGax')}}</p>
                <p class="text-[1rem] text-[#FF5353FF] font-bold">{{state.goInfo.sellGas || '-'}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import request from '@/src/utils/request'
import { abbr,toShort, copyToClipBoard,webList } from '@/src/utils/utils'
import { useI18n } from  'vue-i18n'
const { t,locale } = useI18n();
import { userStore } from '@/src/stores/user'
const store = userStore();
import { projectStore } from '@/src/stores/project'
const proStore = projectStore();
const router = useRouter()

const listOrder = [
  { key: 'is_honeypot', grade: 1, color1: '#FF5353', color0: '#1cb071'},
  { key: 'is_open_source',grade: 3,  color1: '#1cb071', color0: '#FF5353'},
  { key: 'is_proxy', grade: 2, color1: '#FFB524', color0: '#1cb071'},
  { key: 'owner_change_balance', grade: 1, color1: '#FF5353', color0: '#1cb071'},
  { key: 'slippage_modifiable', grade: 1, color1: '#FF5353', color0: '#1cb071'},
  { key: 'is_whitelisted', grade: 2, color1: '#FFB524', color0: '#1cb071'},
  { key: 'is_blacklisted', grade: 2, color1: '#FFB524', color0: '#1cb071'},
  { key: 'is_mintable', grade: 2, color1: '#FFB524', color0: '#1cb071'},
  { key: 'can_take_back_ownership', grade: 1, color1: '#FF5353', color0: '#1cb071'},
  { key: 'hidden_owner', grade: 1, color1: '#FF5353', color0: '#1cb071'},
  { key: 'selfdestruct', grade: 1, color1: '#FF5353', color0: '#1cb071'},
  { key: 'external_call', grade: 2, color1: '#FFB524', color0: '#1cb071'},
  { key: 'cannot_buy', grade: 2, color1: '#FFB524', color0: '#1cb071'},
  { key: 'transfer_pausable', grade: 1, color1: '#FF5353', color0: '#1cb071'},
  { key: 'is_in_dex', grade: 4, color1: '#1cb071', color0: '#FFB524'},
  { key: 'cannot_sell_all', grade: 2, color1: '#FFB524', color0: '#1cb071'},
  { key: 'is_anti_whale', grade: 2, color1: '#FFB524', color0: '#1cb071'},
  { key: 'trading_cooldown', grade: 2, color1: '#FFB524', color0: '#1cb071'},
  { key: 'personal_slippage_modifiable', grade: 2, color1: '#FFB524', color0: '#1cb071'}
]

const props = defineProps({
  projectID: {
    type: String
  }
})

const state = reactive({
  goInfo: {},
  tokenList: [],
  projectInfo: {},
  load: false
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

const projectInfo = () => {
  request.get(`/plugin/decheck/api/project/detail/${props.projectID}`).then((res) => {
    state.projectInfo = res
    if(res.tokenAddr){
      state.tokenList = res.tokenList = Object.entries(res.tokenAddr)
      state.tokenList.forEach(ele => {
        chainList.forEach(chainItem => {
          if(ele[0] == chainItem.id){
            ele.chain = chainItem.label
          }
        })
      })
      getCheck()
    }
  })
}

const getCheck = () => {
  state.load = true
  request.get(`/plugin/decheck/api/security/token/${state.tokenList[proStore.chain][0]}/${state.tokenList[proStore.chain][1]}`).then((res) => {
    if(res != null){
      state.goInfo = res
    }else{
      state.goInfo = {}
    }
    state.load = false
  })
}

const chainChange = (val) => {
  proStore.chain = val
  getCheck()
}

const copyClick = (val) => {
  if(val){
    copyToClipBoard(val);
    ElMessage.success(t('copySuccess'))
  }
}

const jumpClick = () => {
  router.push({
    name: 'check',
    query: {
      chain : state.tokenList[proStore.chain][0],
      searchInput: state.tokenList[proStore.chain][1]
    }
  })
  request.get(`/plugin/decheck/api/security/token/${state.tokenList[proStore.chain][0]}/${state.tokenList[proStore.chain][1]}`).then((res) => {
    store.searchInfo = res
  })
}

const goToUrl = (val) => {
  let url = '';
  webList.forEach(el => {
    if(el.chain == state.tokenList[proStore.chain][0]){
      url = el.web
    }
  })
  if(url){
    window.open(url + 'address/' + val,'_blank')
  }
}

onMounted(() => {
  projectInfo()
})

</script>

<style scoped>
.basic-bg{
  background: linear-gradient(225deg, #363574 0%, #2A1C52 100%);
}
.text-gradient{
  background: linear-gradient(69deg, #4972FF 0%, #1E93FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* 下拉选择样式 */
:deep(.el-input__wrapper){
  height: 3.5rem;
  background-color: #474174;
  box-shadow: none;
  border-radius: 20px;
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
  background-color: #322559;
  border: none;
}
</style>