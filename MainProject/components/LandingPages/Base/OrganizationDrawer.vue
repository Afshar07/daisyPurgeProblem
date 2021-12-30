<template>
  <div
    class="main-container p-3 px-5 w-full cursor-pointer transform rounded-3xl my-2"
    :class="accordionState"
    @click="toggleAccordion"
  >
    <div class="text-lg font-medium flex items-center justify-start">
      <svg
        v-if="!isExpanded"
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 ml-4 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <svg
        v-if="isExpanded"
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8 ml-4 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p>
        {{ service.title }}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 arrow transform mr-auto"
        :class="arrowClass"
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
    </div>
    <transition name="slide">
      <div class="answer-container mt-4" v-show="isExpanded">
        <p>
          {{ service.description }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    toggleAccordion() {
      this.isExpanded = !this.isExpanded;
    },
  },
  computed: {
    accordionState() {
      if (this.isExpanded) {
        return "bg-red-100";
      } else {
        return "bg-green-100";
      }
    },
    arrowClass() {
      if (this.isExpanded) {
        return " rotate-180";
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  transition: all 0.3s;
}
.open-shadow {
  box-shadow: 0px -4px 15px -10px rgba(0, 0, 0, 0.1);
}
.arrow {
  transition: all 0.3s;
}
.answer-container {
  transition: 0.3s;
  overflow: hidden;
}
.slide-enter-active {
  animation: slide-down 0.4s;
  overflow: hidden;
}
.slide-leave-active {
  animation: slide-up 0.3s;
  overflow: hidden;
}
@keyframes slide-down {
  from {
    display: hidden;
    opacity: 0;
    transform: translateY(-2rem);
    max-height: 0;
  }
  to {
    display: block;
    opacity: 1;
    transform: translateY(0);
    max-height: 100px;
  }
}
@keyframes slide-up {
  from {
    display: block;
    opacity: 1;
    transform: translateY(0);
    max-height: 100px;
  }
  to {
    display: hidden;
    opacity: 0;
    transform: translateY(-2rem);
    max-height: 0;
  }
}
</style>
