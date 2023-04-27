<template>
  <div class="h-[220rem] w-full bg-black">
    <div class="bg-black h-[4000px]">
      <div class="content">
        <div class="text-[#fff] w-[500px]" :style="`transform: translate3d(0px, ${state.text3d}, 0px) scale3d( ${state.textscaleX}, ${state.textscaleY}, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);transform-style: preserve-3d; opacity: ${state.textopacity}; will-change: transform, opacity;`">
          <p>I’m Roman - Product designer building his ideas. This is my little corner on the internet, where you can learn about me and my work. Have a project in mind you’re excited about? Let’s </p>
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
    <div class="bg-[#fff] h-[100rem]"></div>
  </div>  
</template>

<script setup>
import { onMounted, reactive } from 'vue'

const state = reactive({
  text3d: 0,
  textscaleX: 1,
  textscaleY: 1,
  textopacity: 1,
  div1opacity: "0.5",
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

  if(0<=scrollHeight && scrollHeight < 500){
    state.text3d = 0;
    state.textscaleX = scrollHeight == 0 ? 1 : 0.8
    state.textscaleY = scrollHeight == 0 ? 1 : 0.8
    state.textopacity = (500 - scrollHeight) / scrollHeight  
  }else{
    state.text3d = '-100vh'
  }

  if(0<=scrollHeight && scrollHeight < 500){
    state.div1opacity = "0.5",
    state.div1filter = "3px",
    state.div1scaleY = (scrollHeight * ( -1 / 125 ) - 2) + 'vw'
    state.div1scaleZ = (scrollHeight * ( 7 / 100 ) - 40) + 'vw'
  }else if(500 <= scrollHeight && scrollHeight < 800){
    state.div1opacity =  scrollHeight / 1000
    state.div1filter = "0px"
    state.div1scaleY = (scrollHeight * ( -1 / 125 ) - 2) + 'vw'        // -2 -> -10
    state.div1scaleZ = (scrollHeight * ( 7 / 100 ) - 40) + 'vw'          // -40 -> 30  500 - 1000
  }else if(800 <= scrollHeight && scrollHeight < 1000){
    state.div1opacity =  scrollHeight / 1000
    state.div1filter = "0px"
    state.div1scaleY = (scrollHeight * ( -1 / 125 ) - 2) + 'vw'   
    state.div1scaleZ = (scrollHeight * ( 7 / 100 ) - 40) + 'vw'
  }

  if(0<=scrollHeight && scrollHeight < 500){
    state.div2opacity = "0.3",
    state.div2filter = "7px",
    state.div2scaleX = (scrollHeight * ( -1 / 150 ) + 20) + 'vw'
    state.div2scaleY = (scrollHeight * ( -1 / 150 ) + 5) + 'vw'
    state.div2scaleZ = (scrollHeight * ( 11 / 150 ) - 80) + 'vw'
  }else if(500 <= scrollHeight && scrollHeight < 800){
    state.div2opacity = "0.8",
    state.div2filter = "4px"
    state.div2scaleX = (scrollHeight * ( -1 / 150 ) + 20) + 'vw'
    state.div2scaleY = (scrollHeight * ( -1 / 150 ) + 5) + 'vw'        // -2 -> -10
    state.div2scaleZ = (scrollHeight * ( 11 / 150 ) - 80) + 'vw'          // -40 -> 30  500 - 1000
  }else if(800 <= scrollHeight && scrollHeight < 1500){
    state.div2opacity = "1",
    state.div2filter = "0px"
    state.div2scaleX = (scrollHeight * ( -1 / 150 ) + 20) + 'vw'
    state.div2scaleY = (scrollHeight * ( -1 / 150 ) + 5) + 'vw'   
    state.div2scaleZ = (scrollHeight * ( 11 / 150 ) - 80) + 'vw'
  }

  if(0<=scrollHeight && scrollHeight < 500){
    state.div3opacity = "0",
    state.div3filter = "7px",
    state.div3scaleX = (scrollHeight * ( -1 / 200 ) - 5) + 'vw'
    state.div3scaleY = (scrollHeight * ( -3 / 150 ) + 15) + 'vw'
    state.div3scaleZ = (scrollHeight * ( 17 / 200 ) - 140) + 'vw'
  }else if(500 <= scrollHeight && scrollHeight < 1000){
    state.div3opacity = "0.25",
    state.div3filter = "5px"
    state.div3scaleX = (scrollHeight * ( -1 / 200 ) - 5) + 'vw'
    state.div3scaleY = (scrollHeight * ( -3 / 150 ) + 15) + 'vw'
    state.div3scaleZ = (scrollHeight * ( 17 / 200 ) - 140) + 'vw'
  }else if(1000 <= scrollHeight && scrollHeight < 1500){
    state.div3opacity = "0.5",
    state.div3filter = "3px"
    state.div3scaleX = (scrollHeight * ( -1 / 200 ) - 5) + 'vw'
    state.div3scaleY = (scrollHeight * ( -3 / 150 ) + 15) + 'vw'
    state.div3scaleZ = (scrollHeight * ( 17 / 200 ) - 140) + 'vw'
  }else if(1500 <= scrollHeight && scrollHeight < 2000){
    state.div3opacity = "1",
    state.div3filter = "0px"
    state.div3scaleX = (scrollHeight * ( -1 / 200 ) - 5) + 'vw'
    state.div3scaleY = (scrollHeight * ( -3 / 150 ) + 15) + 'vw'
    state.div3scaleZ = (scrollHeight * ( 17 / 200 ) - 140) + 'vw'
  }

  if(0<=scrollHeight && scrollHeight < 600){
    state.div4opacity = "0",
    state.div4filter = "7px",
    state.div4scaleY = (scrollHeight * ( -1 / 500 )) + 'vw'
    state.div4scaleZ = (scrollHeight * ( 117 / 2500 ) - 120) + 'vw'
  }else if(600 <= scrollHeight && scrollHeight < 1200){
    state.div4opacity = "0.25",
    state.div4filter = "5px"
    state.div4scaleY = (scrollHeight * ( -1 / 500 )) + 'vw'
    state.div4scaleZ = (scrollHeight * ( 117 / 2500 ) - 120) + 'vw'
  }else if(1200 <= scrollHeight && scrollHeight < 1800){
    state.div4opacity = "0.5",
    state.div4filter = "3px"
    state.div4scaleY = (scrollHeight * ( -1 / 500 )) + 'vw'
    state.div4scaleZ = (scrollHeight * ( 117 / 2500 ) - 120) + 'vw'
  }else if(1800 <= scrollHeight && scrollHeight < 2500){
    state.div4opacity = "1",
    state.div4filter = "0px"
    state.div4scaleY = (scrollHeight * ( -1 / 500 )) + 'vw'
    state.div4scaleZ = (scrollHeight * ( 117 / 2500 ) - 120) + 'vw'
  }else{
    state.div4scaleY = '-5vw'
    state.div4scaleZ = '-3vw'
  }
  console.log(scrollHeight)
  if(0<=scrollHeight && scrollHeight < 800){
    state.div5opacity = "0",
    state.div5filter = "7px",
    state.div5scaleY = (scrollHeight * ( -1 / 600 )) + 'vw'
    state.div5scaleZ = (scrollHeight * ( 113 / 3000 ) - 120) + 'vw'
  }else if(800 <= scrollHeight && scrollHeight < 1600){
    state.div5opacity = "0.25",
    state.div5filter = "5px"
    state.div5scaleY = (scrollHeight * ( -1 / 600 )) + 'vw'
    state.div5scaleZ = (scrollHeight * ( 113 / 3000 ) - 120) + 'vw'
  }else if(1600 <= scrollHeight && scrollHeight < 2400){
    state.div5opacity = "0.5",
    state.div5filter = "3px"
    state.div5scaleY = (scrollHeight * ( -1 / 600 )) + 'vw'
    state.div5scaleZ = (scrollHeight * ( 113 / 3000 ) - 120) + 'vw'
  }else if(2400 <= scrollHeight && scrollHeight < 3000){
    state.div5opacity = "1",
    state.div5filter = "0px"
    state.div5scaleY = (scrollHeight * ( -1 / 600 )) + 'vw'
    state.div5scaleZ = (scrollHeight * ( 113 / 3000 ) - 120) + 'vw'
  }else{
    state.div5scaleY = '-5vw'
    state.div5scaleZ = '-7vw'
  }
}
</script>

<style>
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
.div1{
  position: absolute;
  margin-right: 50%;
  width: 30vw;
  height: 40vw;
  background: url('/images/bithot.png') no-repeat;
  background-size: 100% 100%;
}
.div2{
  position: absolute;
  width: 30vw;
  height: 40vw;
  margin-top: 10%;
  margin-left: 50%;
  background: url('/images/ethhot.png') no-repeat;
  background-size: 100% 100%;
}
.div3{
  position: absolute;
  margin-right: 50%;
  width: 30vw;
  height: 40vw;
  background: url('/images/bnbhot.png') no-repeat;
  background-size: 100% 100%;
}
.div4{
  position: absolute;
  width: 30vw;
  height: 40vw;
  margin-top: 0;
  margin-left: 45%;
  background: url('/images/doghot.png') no-repeat;
  background-size: 100% 100%;
}
.div5{
  position: absolute;
  width: 30vw;
  height: 40vw;
  margin-right: 40%;
  background: url('/images/arbhot.png') no-repeat;
  background-size: 100% 100%;
}
</style>