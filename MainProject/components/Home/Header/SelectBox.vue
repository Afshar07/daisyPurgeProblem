<template>
  <div class="selection w-1/4 flex flex-col md:mr-4 sm:mt-3" @click="emitData">
    <slot name="title"></slot>
    <div
      class="select bg-white w-auto pl-2 flex items-center cursor-pointer rounded-md"
    >
      <slot name="icon"></slot>

      <p class="text-xs sm:text-sm mr-4 ml-3 text-center">{{ choose }}</p>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["clicked"],
  props: ["choose"],
  methods: {
    emitData() {
      this.$emit("clicked");
    }
  }
};
</script>
<style scoped>
.select {
  height: 3rem;
}
</style>
