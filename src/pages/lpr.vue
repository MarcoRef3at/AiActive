<template>
  <div class="bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 15vh">
        lpr page
      </div>

      <q-card class="text-white q-mt-md q-mb-md lpr-card">
        <!-- @mouseover="hoverUp"
        @mouseout="hoverDown" -->
        <!-- Background B&W Blurred Image -->
        <!-- <q-parallax :src="imgSrc" class="bg-img q-mt-xl" /> -->
        <q-img :src="imgSrc" class="bg-img" />

        <!-- Plate No. -->
        <div class="text-h6 absolute-top">ط ر ا 2576</div>

        <div class="text-subtitle2 absolute-top">
          <!-- Speed -->
          <span class="absolute-left q-pl-md q-pt-xl">120 km/h</span>
          <q-tooltip anchor="bottom middle" self="top middle">Speed</q-tooltip>
          <!-- Confidence -->
          <span class="absolute-right q-pr-md q-pt-xl">90%</span>
          <q-tooltip>Confidence</q-tooltip>
        </div>

        <!-- Card Image -->
        <q-card-section class="absolute-center">
          <q-avatar size="200px">
            <img :src="imgSrc" />
          </q-avatar>
        </q-card-section>
      </q-card>
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
      <button @mouseover="show = true" @mouseout="show = false">
        Toggle render
      </button>
      <transition name="example">
        <p v-if="show">hello</p>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
  data() {
    return {
      imgSrc:
        "http://196.219.234.3:3000/ftp/10477/2020-11-28/10477_%E2%80%AD%D9%A1%D9%A5%D9%A6%D9%A7%E2%80%AC%E2%80%AD%D9%85%E2%80%8C%D8%AC%E2%80%8C%D8%B3%E2%80%AC_EGY_2020-11-28-11-03-43-025_6894_085.jpg",
      show: true
    };
  }
};
</script>
<style lang="scss">
.lpr-card {
  height: 400px;
  margin: 3px;
  width: 100%;
  border: 3px solid white;
  min-width: 25%;
  max-width: 50%;
}
.bg-img {
  // background-image: url("https://cdn.quasar.dev/img/avatar.png");
  filter: blur(8px) grayscale(100%);
  -webkit-filter: blur(8px) grayscale(100%);

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.slide-fade-enter-active {
  transition: 0.3s;
}
.slide-fade-leave-active {
  transition: 0.3s;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.trans {
  animation-name: example;
  animation-duration: 4s;
}
@keyframes example {
  25% {
    background-color: red;
    left: 0px;
    top: 100px;
  }
}
</style>
