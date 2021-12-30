<template>
  <div class="cropper-main-container flex flex-col items-center w-2/3">
    <img ref="img" class="w-1/2 h-auto" :src="img" alt="userImg" />
    <div class="flex items-center mt-2">
      <button
        @click="rotateImage"
        type="button"
        class="
          flex
          items-center
          border border-primary
          rounded-md
          px-3
          py-1
          text-primary
        "
      >
        <p class="ml-2">
          {{ $t("avatar.rotate") }}
        </p>
        <img src="/image-rotate.svg" alt="Button for rotating image" />
      </button>
      <button
        @click="crop"
        class="text-white bg-green-600 px-4 py-1 rounded-md mr-2"
      >
        {{ $t("avatar.confirmcrop") }}
      </button>
    </div>

    <img :src="blob" v-show="blob" alt="" />
  </div>
</template>

<script>
import Cropper from "cropperjs";
export default {
  emits: ["getCroppedImage"],
  props: {
    img: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.cropper = new Cropper(this.$refs.img, {
      aspectRatio: 16 / 16,
      rotatable: true,
      cropBoxResizable: true,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      wheelZoomRatio: false,
      minCanvasWidth: 150,
    });
  },
  data() {
    return {
      cropper: null,
      blob: null,
    };
  },
  methods: {
    rotateImage() {
      this.cropper.rotate(-90);
    },
    crop() {
      this.blob = this.cropper
        .getCroppedCanvas({
          fillColor: "#fff",
          width: 450,
          height: 450,
          maxWidth: 450,
          maxHeight: 450,
        })
        .toBlob(
          (blob) => {
            this.$emit("getCroppedImage", blob);
          },
          this.type,
          85 / 100
        );
    },
  },
};
</script>

<style scoped>
.cropper-main-container {
  max-width: 40%;
}
</style>
