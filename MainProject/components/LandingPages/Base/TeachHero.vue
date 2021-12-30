<template>
  <header
    class="hero-image flex items-center"
    :style="{ backgroundImage: 'url(' + bgImageAdress + ')' }"
  >
    <div class="md:w-1/3 w-1/2 mr-10 md:mr-20">
      <h5 class="text-gray-600 font-3xl leading-relaxed">
        <slot name="firstHeading"></slot>
      </h5>
      <h1 class="color-tertiary text-3xl md:text-5xl font-extrabold leading-relaxed">
        <slot name="secondHeading"></slot>
      </h1>
      <p class="leading-relaxed text-gray-800">
        <slot name="thirdHeading"></slot>
      </p>
      <button
        type="button"
        class="
          شروع
          کنید
          mt-12
          px-3
          py-1
          border border-secondary
          text-secondary text-xl
          rounded
          hover:bg-secondary hover:text-black
          transition-all
        "
      >
        <slot name="button"></slot>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    bgImageAdress: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .hero-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    min-height: 100vh;
  }
}
@media only screen and (min-width: 769px) {
  .hero-image {
    background-size: cover;
    /* background-position: center; */
    background-repeat: no-repeat;
    height: 100%;
    min-height: 700px;
  }
}
</style>
