<template>
  <transition name="slide">
    <div
      v-show="isFiltersOpen"
      class="absolute flex flex-col filter-page overflow-y-scroll"
    >
      <div class="buttons flex justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-red-600 mr-3 mt-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="closePage"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <button
          type="button"
          class="clear-btn ml-3 mt-4 px-3 py-2 rounded-3xl bg-transparent text-gray-700 text-xs"
        >
          {{ $t("landing.clearfilters") }}
        </button>
      </div>
      <mobile-filters-box></mobile-filters-box>
    </div>
  </transition>
</template>
<script>
import MobileFiltersBox from "./MobileFiltersBox.vue";
export default {
  components: { MobileFiltersBox },
  props: ["isFiltersOpen"],
  emits: ["closeFiltersPage"],
  methods: {
    closePage() {
      this.$emit("closeFiltersPage");
    }
  }
};
</script>
<style scoped>
.filter-page {
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  background-color: #fff;
}
.clear-btn {
  border: 1px solid #c7c7c7;
}
.slide-enter-active {
  animation: slide-up 0.3s ease-in-out;
}
.slide-leave-active {
  animation: slide-up reverse 0.3s ease-in-out;
}
@keyframes slide-up {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
