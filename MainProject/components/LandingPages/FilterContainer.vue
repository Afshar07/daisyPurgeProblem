<template>
  <div class="lang-filter-container w-11/12 shadow-md rounded my-2 bg-transparent">
    <header
      class="flex items-center justify-between w-full cursor-pointer rounded"
      @click="toggleIsOpen"
    >
      <p class="mx-4 my-2">
        <slot name="title"></slot>
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mx-4 my-2 arrow"
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
    </header>
    <transition name="slide" mode="out-in">
      <div
        v-show="isOpen"
        class="main-section flex flex-col items-start justify-start"
      >
        <hr class="w-11/12 mx-auto" />
        <div class="langs w-full flex flex-col mx-4 my-2">
          <slot name="content"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    toggleIsOpen() {
      this.isOpen = !this.isOpen;
    }
  },
  computed: {
    arrowDirection() {
      if (this.isOpen) {
        return "arrowUp";
      }
    }
  }
};
</script>
<style scoped>
.lang-filter-container {
  border: 1px solid #adadad3b;
}
.search-box {
  border: 1px solid #adadad;
}
.arrow {
  transition: all 0.4s;
}
.arrowUp {
  transform: rotate(180deg);
}

.slide-enter-active {
  animation: slide-down 0.4s ease-out;
  overflow: hidden;
}
.slide-leave-active {
  animation: slide-up 0.4s ease-in;
  overflow: hidden;
}

@keyframes slide-down {
  0% {
    display: hidden;
    max-height: 0px;
  }
  100% {
    display: block;
    max-height: 200px;
  }
}
@keyframes slide-up {
  0% {
    max-height: 200px;
    display: block;
  }
  100% {
    max-height: 0px;
    display: hidden;
  }
}
</style>
