<template>
  <div
    class="
      card-container
      bg-opacity-70
      hover:bg-opacity-95
      transform
      hover:scale-105
      flex
      items-center
      justify-center
      text-white
      px-5
      h-80
      rounded
      md:my-0
    "
    :class="bgClass"
  >
    <div class="flex flex-col items-center justify-center text-center">
      <h3 class="mb-8 text-xl">
        {{ cardDetails.title }}
      </h3>
      <p>
        {{ cardDetails.details }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardDetails: {
      type: Object,
      required: true,
    },
  },
  computed: {
    bgClass() {
      return `bg-${this.cardDetails.bgColor}-500`;
    },
  },
};
</script>

<style scoped>
.card-container {
  transition: all 0.3s;
}
</style>
