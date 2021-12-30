<template>
  <div class="w-full cursor-pointer" @click="emitSelect($event)">
    <div
      class="
        flex flex-col
        items-center
        justify-center
        w-full
        text-primary
        border border-primary
        shadow-md
        rounded-md
      "
    >
      <div v-html="subject.icon"></div>
      <h3>
        {{ subject.title }}
      </h3>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    subject: {
      type: Object,
      required: true,
    },
  },
  emits: ["selected"],
  methods: {
    emitSelect(event) {
      this.$emit("selected", event, this.subject.value);
    },
  },
};
</script>
