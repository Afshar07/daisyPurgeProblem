<template>
  <div
    class="
      main-container
      p-4
      cursor-pointer
      hover:bg-red-100 hover:border-red-200
      transition-all
      border border-gray-300
      rounded-md
      my-2
      flex flex-col
      items-center
      justify-center
      unselectable
    "
    @click="emitSelect($event)"
  >
    <img :src="cardDetails.img" :alt="cardDetails.title" class="mb-3 w-24" />
    <h3>{{ cardDetails.title }}</h3>
  </div>
</template>

<script>
export default {
  emits: ["select"],
  props: {
    cardDetails: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitSelect(event) {
      this.$emit("select", event, this.cardDetails.value);
    },
  },
};
</script>
