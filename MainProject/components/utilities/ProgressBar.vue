<template>
  <div class="pt-1 w-full" v-if="isUploadStarted">
    <p class="text-left" :class="percentText">{{ getUploadProgress }}%</p>
    <div
      class="overflow-hidden h-2 mb-4 text-xs flex flex-row-reverse rounded"
      :class="uploadBarColor"
    >
      <div
        :style="progressed"
        class="progressed shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
        :class="uploadProgressColor"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("uploadProgress", ["getUploadProgress"]),
    progressed() {
      return `width: ${this.getUploadProgress}%`;
    },
    isUploadStarted() {
      if (this.getUploadProgress > 0) {
        return true;
      }
    },
    uploadBarColor() {
      if (this.getUploadProgress > 0 && this.getUploadProgress < 30) {
        return "bg-red-200";
      } else if (this.getUploadProgress >= 30 && this.getUploadProgress < 50) {
        return "bg-yellow-300";
      } else if (this.getUploadProgress >= 50 && this.getUploadProgress < 70) {
        return "bg-yellow-200";
      } else {
        return "bg-green-200";
      }
    },
    uploadProgressColor() {
      if (this.getUploadProgress > 0 && this.getUploadProgress < 30) {
        return "bg-red-500";
      } else if (this.getUploadProgress >= 30 && this.getUploadProgress < 50) {
        return "bg-yellow-500";
      } else if (this.getUploadProgress >= 50 && this.getUploadProgress < 70) {
        return "bg-yellow-400";
      } else {
        return "bg-green-500";
      }
    },
    percentText() {
      if (this.getUploadProgress > 0 && this.getUploadProgress < 30) {
        return "text-red-500";
      } else if (this.getUploadProgress >= 30 && this.getUploadProgress < 50) {
        return "text-yellow-500";
      } else if (this.getUploadProgress >= 50 && this.getUploadProgress < 70) {
        return "text-yellow-400";
      } else {
        return "text-green-500";
      }
    }
  }
};
</script>

<style scoped>
.progressed {
  transition: all 0.3s;
}
</style>
