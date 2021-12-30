<template>
  <div
    class="
      w-full
      h-full
      col-start-9 col-end-13
      border-r border-gray-300 border-opacity-40
      mr-4
      pr-4
    "
  >
    <div class="tabs w-full flex justify-center items-start">
      <button
        type="button"
        class="tab tab-bordered tab-active"
        ref="ProVideo"
        @click="setVideoTabActive"
      >
        {{ $t("procard.video") }}
      </button>
      <button
        type="button"
        class="tab tab-bordered"
        @click="setIntroTabActive"
        ref="ProIntro"
      >
        {{ $t("procard.introduction") }}
      </button>
      <button type="button" class="tab tab-bordered" @click="renderTimeSheet">
        {{ $t("procard.calendar") }}
      </button>
    </div>
    <div class="w-full grid grid-cols-6">
      <pro-video
        class="col-span-6"
        v-show="isRenderingComponent('ProVideo')"
        :userDetails="userDetails"
        @emitData="emitData"
      ></pro-video>
      <pro-intro
        class="col-span-6"
        v-show="isRenderingComponent('ProIntro')"
        :userDetails="userDetails"
        @emitData="emitData"
      ></pro-intro>
      <div
        class="
          col-start-1 col-end-7
          flex
          items-center
          justify-center
          w-full
          pl-2
          my-3
        "
      >
        <button
          @click="emitData"
          type="button"
          class="
            w-11/12
            py-1
            m-auto
            bg-primary
            rounded-md
            text-white text-center
          "
        >
          {{ $t("procard.reservation") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProVideo from "./ProVideo.vue";
import ProIntro from "./ProIntro.vue";
export default {
  emits: ["emitData", "renderSchedule"],
  components: {
    ProVideo,
    ProIntro,
  },
  props: {
    userDetails: {
      type: Object,
      required: true,
    },
  },
  watch: {
    activeTab: {
      handler(newVal, oldVal) {
        this.$refs[newVal].classList.add("tab-active");
        this.$refs[oldVal].classList.remove("tab-active");
      },
    },
  },
  data() {
    return {
      activeTab: "ProVideo",
    };
  },
  methods: {
    isRenderingComponent(active) {
      if (this.activeTab == active) {
        return true;
      }
    },
    renderTimeSheet() {
      this.$emit("renderSchedule");
    },
    setVideoTabActive() {
      this.activeTab = "ProVideo";
    },
    setIntroTabActive() {
      this.activeTab = "ProIntro";
    },
    emitData() {
      this.$emit("emitData");
    },
  },
};
</script>

<style scoped>
.tab-active {
  @apply border-primary text-primary;
}
</style>
