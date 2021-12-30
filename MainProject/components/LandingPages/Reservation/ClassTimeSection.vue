<template>
  <div class="schedule-container mt-8">
    <pro-date-container :id="proId" @emitData="emitData"></pro-date-container>
  </div>
</template>

<script>
import ProDateContainer from "./Schedule/ProDateContainer.vue";
export default {
  components: {
    ProDateContainer,
  },
  props: {
    proId: {
      type: Number,
      required: true,
    },
  },
  head() {
    return {
      bodyAttrs: {
        class: "inset-0 fixed overflow-hidden",
      },
    };
  },
  emits: ["emitData"],
  methods: {
    emitData() {
      this.$emit("emitData");
    },
  },
};
</script>
