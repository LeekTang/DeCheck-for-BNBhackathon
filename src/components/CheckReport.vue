<template>
  <div class="w-[75rem] mx-auto mt-[4rem]" v-if="Object.keys(state.goInfo).length > 0">
    <div class="text-[1.25rem] text-[#fff] font-extrabold">CHECK REPORT</div>
    <div class="flex justify-between mt-[1.5rem]">
      <div class="w-[36.75rem] h-[31.5rem] rounded-[1.25rem] basic-bg">
        <div class="w-full h-[4rem] leading-[4rem] bg-[#FFFFFF1C] rounded-t-[1.25rem]">
          <p class="text-[1.25rem] font-bold text-gradient pl-[1.5rem] ">Basic Info</p>
        </div>
        <div class="p-[1.5rem] text-[0.88rem]">
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">Token Name</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-if="state.goInfo.token_symbol">{{state.goInfo.token_symbol}} ({{state.goInfo.token_name}})</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-else> -- </p>
          </div>
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">Token Contract Address</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-if="state.goInfo.owner_address">{{abbr(state.goInfo.owner_address)}}</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-else> -- </p>
          </div>
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">Contract Creator</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-if="state.goInfo.creator_address">{{abbr(state.goInfo.creator_address)}}</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-else> -- </p>
          </div>
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">Contract Owner</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-if="state.goInfo.owner_address">{{abbr(state.goInfo.owner_address)}}</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]" v-else> -- </p>
          </div>
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">Total Supply</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]">{{state.goInfo.total_supply || '--'}}</p>
          </div>
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">Launch Time</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem]">{{state.goInfo.time || '-'}}</p>
          </div>
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">Website</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem] h-[2rem] px-[1rem] rounded-[0.75rem] bg-[#1E50FFFF] flex items-center justify-between">
              Hexarhong.com
              <img src="/images/out.svg" class="h-[1rem] w-[1rem]">
            </p>
          </div>
        </div>
      </div>
      <div class="w-[36.75rem] h-[31.5rem] rounded-[1.25rem] basic-bg">
        <div class="w-full h-[4rem] leading-[4rem] bg-[#FFFFFF1C] rounded-t-[1.25rem]">
          <p class="text-[1.25rem] font-bold text-gradient pl-[1.5rem] ">Transaction Info</p>
        </div>
        <div class="p-[1.5rem] text-[0.88rem]">
          <div class="h-[3.5rem] flex justify-between items-center border-b-2 border-b-[#FFFFFF1C]">
            <p class="text-[#FFFFFFA8]">Price</p>
            <p class="text-[#FFFFFF] text-[1.5rem] font-bold">{{state.goInfo.price || '-'}}</p>
          </div>
          <div class="h-[3.5rem] flex justify-between items-center">
            <p class="text-[#FFFFFFA8]">Uniswap</p>
            <p class="text-[#FFFFFF] font-bold w-[18rem] h-[2rem] px-[1rem] rounded-[0.75rem] bg-[#1E50FFFF] flex items-center justify-between">
              Tread
              <img src="/images/out.svg" class="h-[1rem] w-[1rem]">
            </p>
          </div>
          <div class="flex justify-between">
            <div class="h-[17.5rem] w-[16.13rem] bg-[#ffffff1c] rounded-[0.75rem] p-[1rem] flex flex-col justify-around">
              <div class="flex justify-between">
                <p class="text-[1.25rem] text-[#fff] font-medium">Buy Tax</p>
                <p class="text-[1.5rem] text-[#11B466] font-bold">{{state.goInfo.buy_tax}}</p>
              </div>
              <!-- <div class="flex justify-between text-[0.88rem]">
                <p class="text-[#FFFFFFA8]">Marketing Fee</p>
                <p class="text-[#fff] font-bold">3%</p>
              </div>
              <div class="flex justify-between text-[0.88rem]">
                <p class="text-[#FFFFFFA8]">LP Holders Reward Fee</p>
                <p class="text-[#fff] font-bold">3%</p>
              </div>
              <div class="flex justify-between text-[0.88rem]">
                <p class="text-[#FFFFFFA8]">Marketing Fee</p>
                <p class="text-[#fff] font-bold">3%</p>
              </div> -->
              <div class="flex justify-between">
                <p class="text-[1.25rem] text-[#fff] font-medium">Buy Gas</p>
                <p class="text-[1.5rem] text-[#11B466] font-bold">{{state.goInfo.buyGas || '-'}}</p>
              </div>
            </div>
            <div class="h-[17.5rem] w-[16.13rem] bg-[#ffffff1c] rounded-[0.75rem] p-[1rem] flex flex-col justify-around">
              <div class="flex justify-between">
                <p class="text-[1.25rem] text-[#fff] font-medium">Sell Tax</p>
                <p class="text-[1.5rem] text-[#FF5353FF] font-bold">{{state.goInfo.sell_tax}}</p>
              </div>
              <!-- <div class="flex justify-between text-[0.88rem]">
                <p class="text-[#FFFFFFA8]">Liquidity Fee</p>
                <p class="text-[#fff] font-bold">3%</p>
              </div>
              <div class="flex justify-between text-[0.88rem]">
                <p class="text-[#FFFFFFA8]">Marketing Fee</p>
                <p class="text-[#fff] font-bold">3%</p>
              </div>
              <div class="flex justify-between text-[0.88rem]">
                <p class="text-[#FFFFFFA8]">LP Holders Reward Fee</p>
                <p class="text-[#fff] font-bold">3%</p>
              </div>
              <div class="flex justify-between text-[0.88rem]">
                <p class="text-[#FFFFFFA8]">LP Holders Reward Fee</p>
                <p class="text-[#fff] font-bold">3%</p>
              </div>
              <div class="flex justify-between text-[0.88rem]">
                <p class="text-[#FFFFFFA8]">LP Holders Reward Fee</p>
                <p class="text-[#fff] font-bold">3%</p>
              </div> -->
              <div class="flex justify-between">
                <p class="text-[1.25rem] text-[#fff] font-medium">Sell Gas</p>
                <p class="text-[1.5rem] text-[#FF5353FF] font-bold">{{state.goInfo.sellGas || '-'}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full basic-bg rounded-[1.25rem] mt-[1.5rem]">
      <div class="w-full h-[4rem] leading-[4rem] bg-[#FFFFFF1C] rounded-t-[1.25rem] flex justify-between items-center px-[1.5rem]">
        <p class="text-[1.25rem] font-bold text-gradient">Risk Check</p>
        <p class="text-[#FFFFFF] font-bold w-[16.13rem] h-[2rem] px-[1rem] rounded-[0.75rem] bg-[#1E50FFFF] flex items-center justify-between">
          View Details
          <img src="/images/out.svg" class="h-[1rem] w-[1rem]">
        </p>
      </div>
      <div class="p-[1.5rem]">
        <div class="flex justify-between flex-wrap">
          <div v-for="(item, index) in listOrder" :key="index" >
            <div v-if="state.goInfo.hasOwnProperty(item.key)" class="w-[33.75rem] flex flex-col border-b-2 border-b-[#FFFFFF1C]">
              <div class="flex items-center my-[1rem]">
                <img :src="state.goInfo[item.key] == 0 ? '/images/success.svg' : (state.goInfo[item.key] == 1 ? '/images/warning.svg' : '/images/danger.svg')" class="h-[1rem] w-[1rem] mr-[0.5rem]">
                <p :class="`${state.goInfo[item.key] == 0 ? 'text-[#fff]' : (state.goInfo[item.key] == 1 ? 'text-[#FFB524FF]' : 'text-[#FF5353FF]')} text-[0.88rem] `">{{state.goInfo[item.key] == 0 ? item.state1 : (state.goInfo[item.key] == 1 ? item.state2 : item.state3)}}</p>
              </div>
              <p class="text-[0.88rem] text-[#FFFFFFA8] h-[4.13rem] mb-[1rem]">{{item.info}}</p>
            </div>
          </div>
        </div>
        <p class="text-[1rem] text-[#fff] font-bold mt-[1.5rem]">Always do you own research</p>
        <div class="text-[0.88rem] text-[#FFFFFFA8] leading-[1.38rem] mt-[1rem]" v-html="`<p>Shilling is a common practice in cryptocurrency where people tend to advertise the coins that they own in hopes of positively affecting the price. Quite often, it can be difficult to distinguish the difference between a shill or an unbiased post. </p>
          <p>When purchasing any cryptocurrency, it is advised to make the decision on your own before investing, and not just because someone else has said it is worth it.</p>`">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import request from '@/src/utils/request'
import { userStore } from '@/src/stores/user'
import { abbr } from '@/src/utils/utils'
import { storeToRefs } from 'pinia'
const store = userStore();

const listOrder = [
  { key: 'is_honeypot', state1: "It's a honeypot", state2: "This does not appear to be a honeypot", state3: "unknown", info: "If the contract is a honeypot, it will contain malicious code"},
  { key: 'is_open_source', state1: "Contract is open source", state2: "Contract not open source", state3: "unknown", info: "If this token contract is open source. You can check the contract code for details. Unsourced token contracts are likely to have malicious functions to defraud their users of their assets"},
  { key: 'is_proxy', state1: "It's a proxy contract", state2: "Doesn't look like a proxy contract", state3: "unknown", info: "The proxy contract means contract owner can modifiy the function of the token and possibly effect the price"},
  { key: 'owner_change_balance', state1: "Owner can tamper with balance", state2: "Owner can not tamper with balance", state3: "unknown", info: "In some contracts, the contract owner have the authority to modify the balance of tokens at other addresses"},
  { key: 'slippage_modifiable', state1: "Tax can be modified", state2: "Tax cannot be modified", state3: "unknown", info: "If the tax can be modified, when the transaction tax is increased to more than 49%, the tokens will not be able to be traded (honeypot risk)"},
  { key: 'is_whitelisted', state1: "Has whitelist", state2: "No whitelist", state3: "unknown", info: "If there is a whitelist, some addresses may not be able to trade normally (honeypot risk)"},
  { key: 'is_blacklisted', state1: "Has blacklist", state2: "No blacklist", state3: "unknown", info: "If the blacklist function is included. Some addresses may not be able to trade normally (honeypot risk)"},
  { key: 'is_mintable', state1: "Can Mint", state2: "Can not Mint", state3: "unknown", info: "The contract may contain additional issuance functions, which could maybe generate a large number of tokens, resulting in significant fluctuations in token prices. It is recommended to confirm with the project team whether it complies with the token issuance instructions"},
  { key: 'can_take_back_ownership', state1: "Can not take back ownership", state2: "Can take back ownership", state3: "unknown", info: "If this function exists, it is possible for the project owner to regain ownership even after relinquishing it"},
  { key: 'hidden_owner', state1: "The contract has hidden owner", state2: "There doesn't appear to be a hidden owner", state3: "unknown", info: "For contract with a hidden owner, developer can still manipulate the contract even if the ownership has been abandoned"},
  { key: 'selfdestruct', state1: "Selfdestruct mechanism exists", state2: "There is no selfdestruct mechanism", state3: "unknown", info: "It describes whether this contract can self destruct"},
  { key: 'external_call', state1: "External call exists", state2: "There is no external call", state3: "unknown", info: "It describes whether the contract would call functions of other contracts when primary methods are executed"},
  { key: 'cannot_buy', state1: "Available for bought", state2: "Not available for bought", state3: "unknown", info: "It deiscribes whether the Token can be bought"},
  { key: 'transfer_pausable', state1: "It could be suspend trading", state2: "No codes found to suspend trading", state3: "unknown", info: "If a suspendable code is included, the token maybe neither be bought nor sold (honeypot risk)"},
  { key: 'is_in_dex', state1: "This token can be traded on the main Dex.", state2: "This token can not be traded on the main Dex.", state3: "unknown", info: "It describes whether the token can be traded on the main Dex"},
  { key: 'cannot_sell_all', state1: "You can't sell all the tokens", state2: "All the tokens can be sold", state3: "unknown", info: "It describes whether the contract has the function restricting token holder selling all the token"},
  { key: 'is_anti_whale', state1: "No anti whale", state2: "Has anti whale", state3: "unknown", info: "It describes whether the contract has the function to modify the maximum amount of transactions or the maximum token position"},
  { key: 'trading_cooldown', state1: "Has trading cooldown function.", state2: "No trading cooldown function.", state3: "unknown", info: "If there is a trading cooldown function, the user will not be able to sell the token within a certain time or block after buying"},
  { key: 'personal_slippage_modifiable', state1: "Has tax changes found for personal addresses", state2: "No tax changes found for personal addresses", state3: "unknown", info: "No tax changes were found for every assigned address. If it exists, the contract owner may set a very outrageous tax rate for assigned address to block it from trading"}
]

const { chain, tokenAddr,searchInfo } = storeToRefs( store )

const state = reactive({
  goInfo: searchInfo.value,
})

watch(tokenAddr,() => {
  console.log('tokenAddr',tokenAddr)
  getGoPlus()
})

const getGoPlus = () => {
    request.get(`/plugin/decheck/api/security/token/${chain.value}/${tokenAddr.value}`).then((res) => {
      store.searchInfo = res
      state.goInfo = searchInfo.value
      if(res == null){
        store.searchInfo = ''
      }
    })
}

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
</style>