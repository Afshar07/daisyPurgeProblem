<template>
  <transition name="modal" appear>
    <div class="modal-box w-11/12 rounded-xl md:w-full">
      <div>
        <slot name="message"></slot>
      </div>
      <div class="modal-action">
        <button
          @click="emitConfirm"
          type="button"
          class="
            btn
            bg-primary
            border-none
            hover:bg-primary hover:text-white
            transform
            hover:scale-110
            ml-2
          "
        >
          <slot name="confirm"></slot>
        </button>
        <button
          @click="emitReject"
          type="button"
          class="
            btn
            bg-white
            border border-primary
            text-primary
            hover:bg-white hover:text-primary hover:border-primary
            transform
            hover:scale-110
            mr-2
          "
        >
          <slot name="decline"></slot>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ["confirm", "reject"],
  methods: {
    emitConfirm() {
      this.$emit("confirm");
    },
    emitReject() {
      this.$emit("reject");
    },
  },
};
</script>
<style scoped>
.btn {
  min-width: 5rem;
  width: 5rem;
  max-width: 5rem;
}
.modal-box {
  z-index: 997;
}
.modal-enter-active {
  animation: fade-in 0.35s ease-in;
}
.modal-leave-active {
  animation: fade-out 0.35s ease-in;
}
@keyframes fade-in {
  from {
    opacity: 0.9;
    transform: translate(50%, -50%) scale(0);
  }
  to {
    opacity: 1;
    transform: translate(50%, -50%) scale(1);
  }
}
@keyframes fade-out {
  from {
    opacity: 1;

    transform: translate(50%, -50%) scale(1);
  }
  to {
    opacity: 0.9;
    transform: translate(50%, -50%) scale(0);
  }
}
</style>
