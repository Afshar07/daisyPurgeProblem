<template>
<transition name="error" appear>
  <div class="alert bg-red-300 main-error bg-opacity-80">
      <div class="flex justify-center items-center bg-opacity-100">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-6 h-6 mx-2 text-red-700 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        ></path>
       </svg>
      <label class="text-red-700">
        <slot name="message"></slot>
      </label>
    </div>
  </div>
</transition>
</template>
<style scoped>
.main-error {
  z-index: 9999999 !important;
}
.error-enter-active {
  animation: scale-up 0.5s ease-in;
}
.error-leave-active {
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

</style>