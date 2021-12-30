<template>
  <div
    class="
      header-box
      absolute
      px-4
      pb-3
      w-4/5
      md:w-1/3
      flex flex-col
      md:flex-row
      items-center
      md:items-start
      justify-around
      rounded-md
    "
  >
    <button
      type="button"
      class="w-5/6 text-lg rounded-md btn btn-primary flex items-center"
      @click="emitStart"
    >
      {{ $t("header.start") }}
    </button>
  </div>
</template>

<script>
export default {
  emits: ["start"],
  methods: {
    emitStart() {
      this.$emit("start");
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 360px) {
  .header-box {
    top: 42%;
    left: 50%;
    transform: translateX(-50%);
    height: 49%;
  }
}
@media screen and (min-width: 361px) {
  .header-box {
    top: 38%;
    left: 50%;
    transform: translateX(-50%);
    height: 49%;
  }
}
@media screen and (min-width: 688px) {
  .header-box {
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    height: 51%;
  }
}
@media screen and (min-width: 768px) {
  .header-box {
    top: 43%;
    left: 50%;
    transform: translateX(-50%);
    height: 7rem;
  }
}
</style>
