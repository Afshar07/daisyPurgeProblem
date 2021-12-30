<template>
  <div
    class="
      main-container
      px-10
      py-2
      shadow-md
      rounded-md
      flex flex-col
      items-center
      justify-center
      h-full
      transform
      hover:-translate-y-5 hover:shadow-lg
      transition-all
    "
    :class="middleCardClass"
  >
    <span
      class="icon p-4 rounded-full"
      v-html="feature.icon"
      :class="iconClass"
    ></span>
    <h5>
      {{ feature.title }}
    </h5>
    <p class="text-sm text-tertiary">
      {{ feature.description }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    feature: {
      type: Object,
      required: true,
    },
  },
  computed: {
    iconClass() {
      return `text-${this.feature.color}-600 bg-${this.feature.color}-100`;
    },
    middleCardClass() {
      if (this.feature.order == 2) {
        return "mt-16 h-full";
      }
    },
  },
};
</script>
