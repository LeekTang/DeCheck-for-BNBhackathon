<template>
  <div class="w-full bg-[#0a0118]">
    <div class="bg-[#0a0118] h-[4500px] relative">
      <div class="content">
        <div class=" r-intro-wrapper text-center" :style="`transform: translate3d(0px, ${state.text3d}, 0px) scale3d( ${state.textscaleX}, ${state.textscaleY}, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);transform-style: preserve-3d; opacity: ${state.textopacity}; will-change: transform, opacity;`">
          <img src="/images/introtext.svg" />
        </div>
        <div class="bg-[#fff] div1" :style="`will-change: opacity, filter, transform; opacity: ${state.div1opacity}; filter: blur(${state.div1filter}); transform: translate3d(-10vw, ${state.div1scaleY}, ${state.div1scaleZ}) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;`">
        </div>
        <div class="bg-[#fff] div2" :style="`will-change: opacity, filter, transform; opacity: ${state.div2opacity}; filter: blur(${state.div2filter}); transform: translate3d(${state.div2scaleX}, ${state.div2scaleY}, ${state.div2scaleZ}) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;`">
        </div>
        <div class="bg-[#fff] div3" :style="`will-change: opacity, filter, transform; opacity: ${state.div3opacity}; filter: blur(${state.div3filter}); transform: translate3d(${state.div3scaleX}, ${state.div3scaleY}, ${state.div3scaleZ}) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;`">
        </div>
        <div class="bg-[#fff] div4" :style="`will-change: opacity, filter, transform; opacity: ${state.div4opacity}; filter: blur(${state.div4filter}); transform: translate3d(0vw, ${state.div4scaleY}, ${state.div4scaleZ}) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;`">
        </div>
        <div class="bg-[#fff] div5" :style="`will-change: opacity, filter, transform; opacity: ${state.div5opacity}; filter: blur(${state.div5filter}); transform: translate3d(-5vw, ${state.div5scaleY}, ${state.div5scaleZ}) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;`">
        </div>
      </div>
    </div>
  </div>  
</template>

<script setup>
import { onMounted, reactive } from 'vue'

const state = reactive({

  heightscroll: '',

  text3d: 0,
  textscaleX: 1,
  textscaleY: 1,
  textopacity: 1,

  div1opacity: "0.2",
  div1filter: "3px",
  div1scaleY: "-2vw",
  div1scaleZ: "-40VW",

  div2opacity: "0.3",
  div2filter: "7px",
  div2scaleX: "20vw",
  div2scaleY: "5vw",
  div2scaleZ: "-80VW",
  div3opacity: "0",
  div3filter: "7px",
  div3scaleX: "5vw",
  div3scaleY: "15vw",
  div3scaleZ: "-140VW",
  div4opacity: "0",
  div4filter: "7px",
  div4scaleY: "0vw",
  div4scaleZ: "-120VW",

  div5opacity: "0",
  div5filter: "7px",
  div5scaleY: "0vw",
  div5scaleZ: "-120VW"
})

onMounted(()=>{
  window.addEventListener('scroll', onScroll)
})

const onScroll = () =>{
  let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
  state.heightscroll = document.documentElement.scrollTop || document.body.scrollTop;
  if(1845>scrollHeight){
    state.textopacity = 1
    state.text3d = 0
    state.textscaleX = 1
    state.textscaleY = 1
  }else if(1845<scrollHeight && scrollHeight < 2345){
    state.textscaleX = ( scrollHeight * ( -1 /2500) + 1.738 )
    state.textscaleY = ( scrollHeight * ( -1 /2500) + 1.738 )
    state.textopacity = ( scrollHeight * ( -1 /500) + 4.69 )
  }else if (scrollHeight >= 2345){
    state.text3d = '-100vh'
    state.textopacity = 0
  }

  if(1845 > scrollHeight){
    state.div1opacity = "0.2"
  }else if(1845<=scrollHeight && scrollHeight < 2045){
    state.div1opacity = "0.5",
    state.div1filter = "3px",
    state.div1scaleY = (scrollHeight * ( -1 / 125 ) + 12.76) + 'vw'
    state.div1scaleZ = (scrollHeight * ( 7 / 100 ) -169.15) + 'vw'
  }else if(2045 <= scrollHeight && scrollHeight < 2645){
    state.div1opacity =  1
    state.div1filter = "0px"
    state.div1scaleY = (scrollHeight * ( -1 / 125 ) + 12.76) + 'vw'
    state.div1scaleZ = (scrollHeight * ( 7 / 100 ) -169.15) + 'vw'
  }else if(2645 <= scrollHeight && scrollHeight < 2845){
    state.div1opacity =  1
    state.div1filter = "0px"
    state.div1scaleY = (scrollHeight * ( -1 / 125 ) + 12.76) + 'vw'   
    state.div1scaleZ = (scrollHeight * ( 7 / 100 ) -169.15) + 'vw'
  }else if(scrollHeight >= 2845){
    state.div1scaleY = '-10vw'   
    state.div1scaleZ = '30vw'
  }

  if(1845<=scrollHeight && scrollHeight < 2345){
    state.div2opacity = "0.6",
    state.div2filter = "7px",
    state.div2scaleX = (scrollHeight * ( -1 / 100 ) + 38.45) + 'vw'
    state.div2scaleY = (scrollHeight * ( -1 / 100 ) + 23.45) + 'vw'
    state.div2scaleZ = (scrollHeight * ( 11 / 100 ) -282.95) + 'vw'
  }else if(2345 <= scrollHeight && scrollHeight < 2645){
    state.div2opacity = "1",
    state.div2filter = "0px"
    state.div2scaleX = (scrollHeight * ( -1 / 100 ) + 38.45) + 'vw'
    state.div2scaleY = (scrollHeight * ( -1 / 100 ) + 23.45) + 'vw'
    state.div2scaleZ = (scrollHeight * ( 11 / 100 ) -282.95) + 'vw'
  }else if(2645 <= scrollHeight && scrollHeight < 2845){
    state.div2opacity = "1",
    state.div2filter = "0px"
    state.div2scaleX = (scrollHeight * ( -1 / 100 ) + 38.45) + 'vw'
    state.div2scaleY = (scrollHeight * ( -1 / 100 ) + 23.45) + 'vw'   
    state.div2scaleZ = (scrollHeight * ( 11 / 100 ) -282.95) + 'vw'
  }else if(scrollHeight >= 2845){
    state.div2scaleX = '10vw'
    state.div2scaleY = '-5vw'   
    state.div2scaleZ = '30vw'
  }

  if(1845<=scrollHeight && scrollHeight < 2345){
    state.div3opacity = "0",
    state.div3filter = "7px",
    state.div3scaleX = (scrollHeight * ( -1 / 100 ) + 23.45) + 'vw'
    state.div3scaleY = (scrollHeight * ( -3 / 200 ) + 42.675) + 'vw'
    state.div3scaleZ = (scrollHeight * ( 17 / 200 ) - 296.825) + 'vw'
  }else if(2345 <= scrollHeight && scrollHeight < 2845){
    state.div3opacity = "1",
    state.div3filter = "2px"
    state.div3scaleX = (scrollHeight * ( -1 / 100 ) + 23.45) + 'vw'
    state.div3scaleY = (scrollHeight * ( -3 / 200 ) + 42.675) + 'vw'
    state.div3scaleZ = (scrollHeight * ( 17 / 200 ) - 296.825) + 'vw'
  }else if(2845 <= scrollHeight && scrollHeight < 3345){
    state.div3opacity = "1",
    state.div3filter = "0px"
    state.div3scaleX = (scrollHeight * ( -1 / 100 ) + 23.45) + 'vw'
    state.div3scaleY = (scrollHeight * ( -3 / 200 ) + 42.675) + 'vw'
    state.div3scaleZ = (scrollHeight * ( 17 / 200 ) - 296.825) + 'vw'
  }else if(3345 <= scrollHeight && scrollHeight < 3845){
    state.div3opacity = "1",
    state.div3filter = "0px"
    state.div3scaleX = (scrollHeight * ( -1 / 100 ) + 23.45) + 'vw'
    state.div3scaleY = (scrollHeight * ( -3 / 200 ) + 42.675) + 'vw'
    state.div3scaleZ = (scrollHeight * ( 17 / 200 ) - 296.825) + 'vw'
  }else if(scrollHeight >= 3845){
    state.div3scaleX = '-15vw'
    state.div3scaleY = '-15vw'   
    state.div3scaleZ = '30vw'
  }

  if(1845<=scrollHeight && scrollHeight < 2445){
    state.div4opacity = "0",
    state.div4filter = "7px",
    state.div4scaleY = (scrollHeight * ( -1 / 500 ) + 3.69) + 'vw'
    state.div4scaleZ = (scrollHeight * ( 117 / 2500 ) + 206.346) + 'vw'
  }else if(2445 <= scrollHeight && scrollHeight < 3045){
    state.div4opacity = "1",
    state.div4filter = "2px"
    state.div4scaleY = (scrollHeight * ( -1 / 500 ) + 3.69) + 'vw'
    state.div4scaleZ = (scrollHeight * ( 117 / 2500 ) -206.346) + 'vw'
  }else if(3045 <= scrollHeight && scrollHeight < 3645){
    state.div4opacity = "1",
    state.div4filter = "0px"
    state.div4scaleY = (scrollHeight * ( -1 / 500 ) + 3.69) + 'vw'
    state.div4scaleZ = (scrollHeight * ( 117 / 2500 ) -206.346) + 'vw'
  }else if(3645 <= scrollHeight && scrollHeight < 4345){
    state.div4opacity = "1",
    state.div4filter = "0px"
    state.div4scaleY = (scrollHeight * ( -1 / 500 ) + 3.69) + 'vw'
    state.div4scaleZ = (scrollHeight * ( 117 / 2500 ) -206.346) + 'vw'
  }else if (scrollHeight >= 4345){
    state.div4scaleY = '-5vw'
    state.div4scaleZ = '-3vw'
  }

  if(1845<=scrollHeight && scrollHeight < 2645){
    state.div5opacity = "0",
    state.div5filter = "7px",
    state.div5scaleY = (scrollHeight * ( -1 / 600 ) + 3.075) + 'vw'
    state.div5scaleZ = (scrollHeight * ( 113 / 3000 ) - 189.495) + 'vw'
  }else if(2645 <= scrollHeight && scrollHeight < 3445){
    state.div5opacity = "0.1",
    state.div5filter = "5px"
    state.div5scaleY = (scrollHeight * ( -1 / 600 ) + 3.075) + 'vw'
    state.div5scaleZ = (scrollHeight * ( 113 / 3000 ) - 189.495) + 'vw'
  }else if(3445 <= scrollHeight && scrollHeight < 4245){
    state.div5opacity = "0.3",
    state.div5filter = "3px"
    state.div5scaleY = (scrollHeight * ( -1 / 600 ) + 3.075) + 'vw'
    state.div5scaleZ = (scrollHeight * ( 113 / 3000 ) - 189.495) + 'vw'
  }else if(4245 <= scrollHeight && scrollHeight < 4845){
    state.div5opacity = "1",
    state.div5filter = "0px"
    state.div5scaleY = (scrollHeight * ( -1 / 600 ) + 3.075) + 'vw'
    state.div5scaleZ = (scrollHeight * ( 113 / 3000 ) - 189.495) + 'vw'
  }else{
    state.div5scaleY = '-5vw'
    state.div5scaleZ = '-7vw'
  }
}
</script>

<style scoped>
.content{
    position: sticky;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 500px;
}

.r-intro-wrapper{
  position: relative;
  z-index: 50;
}
.div1{
  position: absolute;
  margin-right: 30%;
  width: 25vw;
  height: 30vw;
  background: url('/images/bithot.svg') no-repeat;
  background-size: 100% 100%;
}
.div2{
  position: absolute;
  width: 25vw;
  height: 30vw;
  margin-top: 10%;
  margin-left: 20%;
  background: url('/images/ethhot.svg') no-repeat;
  background-size: 100% 100%;
}
.div3{
  position: absolute;
  margin-right: 30%;
  width: 25vw;
  height: 30vw;
  background: url('/images/bnbhot.svg') no-repeat;
  background-size: 100% 100%;
}
.div4{
  position: absolute;
  width: 25vw;
  height: 30vw;
  margin-left: 40%;
  background: url('/images/doghot.svg') no-repeat;
  background-size: 100% 100%;
}
.div5{
  position: absolute;
  width: 25vw;
  height: 30vw;
  margin-right: 40%;
  background: url('/images/arbhot.svg') no-repeat;
  background-size: 100% 100%;
}
</style>