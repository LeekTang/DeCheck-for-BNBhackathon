<template>
  <div class="keep-px">
    <div class="w-full top-bg relative">
      <div class="hero-background flex flex-col justify-between">
        <div class='hero-background-top'>
          <div class="mask-bg lazy-background-image lazy-background-image-maskImage hero-background-top-animation">
            <div></div>
          </div>
        </div>
        <div class="hero-background-bottom h-[198px] relative">
          <img class="-translate-y-16 mx-auto mt-[32px] w-[40px] h-[40px]" src="../../public/images/home/star.png" alt="">
          <div class="hero-background-bottom-background h-[198px]">
            <picture>
              <img class="h-[198px]" src="../../public/images/home/bottom_bg.png" alt="">
            </picture>
            <div
              class="hero-background-bottom-line-1 h-[198px] lazy-background-image lazy-background-image-maskImage-line-1 hero-background-top-animation hero-background-bottom-line-animation">
              <div></div>
            </div>
            <div
              class="hero-background-bottom-line-2 h-[198px] lazy-background-image lazy-background-image-maskImage-line-2 hero-background-top-animation hero-background-bottom-line-animation hero-background-bottom-line-animation2">
              <div></div>
            </div>
            <div
              class="hero-background-bottom-line-3 h-[198px] lazy-background-image lazy-background-image-maskImage-line-3 hero-background-top-animation hero-background-bottom-line-animation hero-background-bottom-line-animation3">
              <div></div>
            </div>
          </div>
          <div class="hero-background-lights w-[1400px] h-[250px]"></div>
        </div>
      </div>
      <div class="w-[75rem] mx-auto pt-[13.69rem]">
        <div class="top_text text-[70px]">
          A DAO for Project Review
        </div>
        <div class="bottom_text text-[22px]" v-html="t('highly')">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();
</script>

<style scoped>
.hero-background {
  left: 50%;
  position: absolute;
  margin-top: 88px;
  width: 75rem;
  height: 35rem;
  transform: translateX(-50%);
}

.hero-background-bottom-background {
  height: 100%;
  left: 0;
  bottom: 0;
  mix-blend-mode: overlay;
  position: absolute;
  width: 100%;
  z-index: 12;
}

.hero-background-top {
  margin: 0 auto;
  background-image: url('../../public/images/home/top_bg.png');
  background-size: 75rem 100%;
  height: 150px;
  width: 75rem;
}

.mask-bg {
  width: 75rem;
  height: 150px;
}

.ground {
  color: rgba(255, 255, 255, 0.88);

}

.lazy-background-image-maskImage {
  -webkit-mask-image: url('../../public/images/home/mask_bg.png');
  mask-image: url('../../public/images/home/mask_bg.png');
}

.lazy-background-image {
  transition: 1s cubic-bezier(.6, .6, 0, 1) opacity;
}

.hero-background-top-animation {
  left: 0;
  -webkit-mask-size: 75rem 100% !important;
  mask-size: cover;
  top: 0;
  width: 100%;
  height: 100%;
  -webkit-mask-repeat: no-repeat;
  z-index: 9;
}

.hero-background-top-animation div {
  animation: topAnimation 6s infinite cubic-bezier(.62, .62, .28, .67);
  background: linear-gradient(180deg, rgba(183, 164, 251, 0) 0, #b7a4fb 100%, #8562ff 100%, rgba(133, 98, 255, 0) 0%);
  height: 87px;
  position: relative;
  top: 0;
  transform: translateY(-89px);
}

.hero-background-bottom-line-animation {
  height: 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  position: absolute;
  top: 0;
}

.hero-background-bottom-line-animation div {
  animation: topAnimation 1s infinite cubic-bezier(.62, .62, .28, .67);
  background: #fff;
  height: 87px;
  position: relative;
  top: 0;
  transform: translateY(-89px);
}

.hero-background-bottom-line-animation2 div {
  animation: topAnimation 1s infinite cubic-bezier(.62, .62, .28, .67);
  animation-delay: 3500ms;
  background: #fff;
  height: 87px;
  position: relative;
  top: 0;
  transform: translateY(-89px);
}
.hero-background-bottom-line-animation3 div {
  animation: topAnimation 1s infinite cubic-bezier(.62, .62, .28, .67);
  animation-delay: 6500ms;
  background: #fff;
  height: 87px;
  position: relative;
  top: 0;
  transform: translateY(-89px);
}

@keyframes topAnimation {

  /* 开始 */
  from {
    transform: translateY(-150px)
  }

  to {
    transform: translateY(150px)
  }
}

.hero-background-bottom {
  background: url('../../public/images/home/bottom_bg.png');
  background-size: 75rem 100%;
}

.top_text {
  font-weight: 700;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
}

.bottom_text {
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
}

.hero-background-lights {
  left: 50%;
  position: absolute;
  bottom: 0;
  transform: translate(-50%, 10%);
  background: url('../../public/images/home/background_light.png') no-repeat;
  background-size: 100% 100%;
}


.hero-background-bottom-line-1 {
  background: url('../../public/images/home/hero-background-bottom-line-1.png') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}

.lazy-background-image-maskImage-line-1 {
  -webkit-mask-image: url('../../public/images/home/hero-background-bottom-line-1.png');
  mask-image: url('../../public/images/home/hero-background-bottom-line-1.png');
}

.hero-background-bottom-line-2 {
  background: url('../../public/images/home/hero-background-bottom-line-2.png') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}

.lazy-background-image-maskImage-line-2 {
  -webkit-mask-image: url('../../public/images/home/hero-background-bottom-line-2.png');
  mask-image: url('../../public/images/home/hero-background-bottom-line-2.png');
}

.hero-background-bottom-line-3 {
  background: url('../../public/images/home/hero-background-bottom-line-3.png') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}

.lazy-background-image-maskImage-line-3 {
  -webkit-mask-image: url('../../public/images/home/hero-background-bottom-line-3.png');
  mask-image: url('../../public/images/home/hero-background-bottom-line-3.png');
}
</style>