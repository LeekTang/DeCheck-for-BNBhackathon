<template>
  <div class="w-[75rem] mx-auto mt-[19rem]">
    <p class="text-[#FFFFFF60] text-[1rem] text-center">{{ t('introtitle') }}</p>
    <div class="mt-[1rem] flex justify-between">
      <div v-for="item in originList" :key="item.id" class="flex items-center h-[3rem] w-[10.63rem]">
        <img :src="item.icon" class="h-[2rem] w-[2rem]">
        <p class="ml-[0.5rem] text-[0.88rem] text-[#FFFFFF60]">{{ item.name }}</p>
      </div>
    </div>



    <div class="mt-[4.5rem] flex justify-between">


      <div class="magical-borders w-full">
        <div class="magical-borders-content flex justify-between">
          <div class="w-[282px] h-[128px] myhoverbox" v-for="item in list"
            :key="item.id">
            <div class="mx-auto magical-borders-inner">
              <div class="flex flex-col justify-center items-center h-[8rem] w-[17.63rem] rounded-[1.25rem]">
                <p class="text-gradient text-[2rem] font-extrabold">{{ item.number }}</p>
                <p class="text-[1rem] text-[#ffffffa8] font-semibold">{{ item.name }}</p>
              </div>
            </div>
            <div class="light"></div>
          </div>
        </div>
      </div>


    </div>
    <div class="mt-[98px] pt-[129px] h-[360px] bottom_bg relative rounded-[1.25rem] mb-[405px]">
      <img class="mx-auto w-[40px] h-[40px]" src="/images/home/star.png" alt="">
      <div class="keep-px-tips" v-html="t('publicitytitle')">
      </div>
      <div class="keep-px-intruduce" v-html="t('publicitytip')">
      </div>
      <NuxtLink to="/explorer">
        <button class="keep-px-Explorer">
          {{ t('Explorer') }}
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();
const originList = [
  { id: 1, name: 'ethereum', icon: '/images/eth.svg' },
  { id: 2, name: 'BNB CHAIN', icon: '/images/bnb.svg' },
  { id: 3, name: 'SOLANA', icon: '/images/solana.svg' },
  { id: 4, name: 'POLKADOT', icon: '/images/polkadot.svg' },
  { id: 5, name: 'polygon', icon: '/images/polygon.svg' },
  { id: 6, name: 'AVALANCHE', icon: '/images/avalanche.svg' },
  { id: 7, name: 'celo', icon: '/images/celo.svg' },
];

const list = [
  { id: 1, name: 'REVIEWED COUNT', number: '30,000' },
  { id: 2, name: 'AUDIT EXPERT', number: '800' },
  { id: 3, name: 'AUDITED PROJECTS', number: '1,100' },
  { id: 4, name: 'UNIQUE PARTICIPANTS', number: '20,000' },
]

</script>
<style scoped>
.text-gradient {
  background: linear-gradient(91.04deg, #9246FF 7.27%, #63B6DE 96.39%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.div-bg {
  background: linear-gradient(180deg, #263B85 0%, #263B85 0%, #121D43 100%);
}

.bottom_bg {
  background: url('/images/home/top_light_line.png') no-repeat;
  background-size: 100% 100%;
}

.keep-px-tips {
  margin-top: 100px;
  font-weight: 700;
  font-size: 60px;
  line-height: 60px;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
}

.keep-px-intruduce {
  margin-top: 32px;
  font-weight: 500;
  font-size: 23px;
  line-height: 28px;
  text-align: center;
  color: #FFFFFF;
  opacity: 0.44;
}

.keep-px-Explorer {
  margin-top: 32px;
  position: relative;
  left: 50%;
  width: 180px;
  height: 56px;
  background: linear-gradient(180deg, #F1F5FF 0%, #8B96AF 100%);
  border: 1px solid #E6E9EE;
  border-radius: 100px;
  font-weight: 500;
  font-size: 20px;
  color: #151515;
  transform: translateX(-50%);
}
</style>