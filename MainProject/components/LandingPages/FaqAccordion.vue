<template>
  <div class="faq-container w-full my-6">
    <section
      class="
        faq-header
        cursor-pointer
        grid grid-cols-6
        items-center
        shadow-md
        p-4
        justify-between
        w-full
        bg-white
      "
      :class="headerBackgroundColor"
      @click="toggleIsOpen"
    >
      <h4 class="text-lg z-10 col-start-1 col-end-5">{{ this.question }}</h4>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="
          h-5
          w-5
          my-2
          arrow
          z-10
          mr-2
          col-start-6 col-end-7
          md:col-start-7
        "
        :class="arrowDirection"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </section>
    <transition name="slide" mode="out-in">
      <section
        v-show="isOpen"
        class="bg-blue-500 px-6 rounded-b-md main-section"
      >
        <p class="text-sm text-gray-200 py-4">
          {{ this.answer }}
        </p>
      </section>
    </transition>
  </div>
</template>
<script>
export default {
  props: ["question", "answer"],
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleIsOpen() {
      this.isOpen = !this.isOpen;
    },
  },
  computed: {
    arrowDirection() {
      if (this.isOpen) {
        return "arrowUp";
      }
    },
    headerBackgroundColor() {
      if (this.isOpen) {
        return "faq-header-active";
      }
    },
  },
};
</script>

<style scoped>
.arrow {
  transition: all 0.2s !important;
}
.arrowUp {
  transform: rotate(180deg) !important;
  color: #fff;
}
.faq-header {
  width: 100%;
  height: 100%;
  background-size: 100% 200%;
  background-image: linear-gradient(to bottom, #fff 50%, #31acff 50%);
  transition: all 0.3s;
}
.faq-header-active {
  background-position: 0 -100%;
  color: #fff;
  transition: all 0.3s;
}
.slide-enter-active {
  animation: slide-down 2s ease-out;
  overflow: hidden;
}
.slide-leave-active {
  animation: slide-up 0.3s ease-out;
  overflow: hidden;
}
@keyframes slide-down {
  0% {
    display: hidden;
    max-height: 0px;
  }
  100% {
    display: block;
    max-height: 400px;
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
