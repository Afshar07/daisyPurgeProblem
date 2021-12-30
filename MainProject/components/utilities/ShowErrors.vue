<template>
  <div class="w-full">
    <p class="error my-1 text-red-600" v-for="err in error" :key="err">
      {{ err }}
    </p>
  </div>
</template>
<script>
export default {
  props: ["error"]
};
</script>
<style scoped>
.error {
  font-size: 0.8rem !important;
  text-align: right !important;
}
</style>
