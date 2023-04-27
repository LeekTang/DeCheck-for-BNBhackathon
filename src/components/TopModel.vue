<template>
  <div class="w-full top-bg relative">
    <div class="hero-background">
      <div class='hero-background-top'>
        <div
          class="mask-bg lazy-background-image lazy-background-image-maskImage hero-background-top-animation lazy-background-image-loaded">
          <div></div>
        </div>
      </div>
    </div>
    <div class="w-[75rem] mx-auto pt-[13.69rem]">
      <div class="top_text">
        A DAO for Project Review
      </div>
      <div class="bottom_text" v-html="t('highly')">
      </div>
      <img class="translate-y-8 mx-auto mt-[32px] w-[40px] h-[40px]" src="../../public/images/home/star.png" alt="">
      <div class="keep-px-hero-bottom"></div>
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
  transform: translateX(-50%);
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
  -webkit-mask-size: 75rem 100%;
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
  font-size: 70px;
  font-weight: 700;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
}

.bottom_text {
  font-size: 22px;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
}

.keep-px-hero-bottom {
  margin: 0 auto;
  width: 75rem;
  height: 198px;
  background: url('../../public/images/home/hero_bottom.png') no-repeat;
  background-size: 100% 100%;
}
</style>