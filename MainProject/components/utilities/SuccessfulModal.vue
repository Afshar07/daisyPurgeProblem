<template>
  <transition name="success" appear>
    <div class="main-success alert bg-green-200 bg-opacity-80">
      <div class="flex justify-center items-center bg-opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-green-900 mx-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <label class="text-green-900">
          <slot name="message"></slot>
        </label>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.main-success {
  z-index: 9999999 !important;
}
.success-enter-active {
  animation: scale-up 0.5s ease-in;
}
.success-leave-active {
  animation: scale-down 0.5s ease-in;
}
@keyframes scale-up {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
@keyframes scale-down {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}
</style>
