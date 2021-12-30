<template>
  <div class="discount-option py-3 rounded md:mr-3 bg-white shadow-md my-3">
    <span
      class="flex items-center justify-between cursor-pointer"
      @click="toggleDiscountBox"
    >
      <h2 class="text-lg mr-3">{{ $t("payment.discountcode") }}</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 ml-3 arrow"
        :class="openDiscountArrow"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </span>
    <transition name="slide" mode="out-in">
      <div
        class="discount-code mr-3 my-3 w-11/12 flex items-start"
        v-show="discountOpen"
      >
        <base-input>
          <template v-slot:label>
            {{ $t("payment.discount") }}
          </template>
        </base-input>
        <button
          type="button"
          class="px-3 py-1 text-white bg-blue-400 hover:bg-blue-500 rounded-md w-1/2 md:w-1/3"
        >
          {{ $t("payment.submitcode") }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import BaseInput from "../../utilities/BaseInput.vue";

export default {
  components: {
    BaseInput
  },
  data() {
    return {
      discountOpen: false
    };
  },
  methods: {
    toggleDiscountBox() {
      this.discountOpen = !this.discountOpen;
    }
  },
  computed: {
    openDiscountArrow() {
      if (this.discountOpen) {
        return "open-discount-arrow";
      }
    }
  }
};
</script>

<style scoped>
.arrow {
  transition: all 0.2s ease-in-out;
}
.open-discount-arrow {
  transform: rotate(180deg);
}
.slide-enter-active {
  animation: slide-down 0.2s ease-in-out;
  overflow: hidden;
}
.slide-leave-active {
  animation: slide-up 0.2s ease-in-out;
  overflow: hidden;
}
@keyframes slide-down {
  0% {
    display: hidden;
    max-height: 0px;
  }
  100% {
    display: block;
    max-height: 100px;
  }
}
@keyframes slide-up {
  0% {
    display: block;
    max-height: 100px;
  }
  100% {
    display: hidden;
    max-height: 0px;
  }
}
</style>
