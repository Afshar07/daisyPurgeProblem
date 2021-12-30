<template>
  <div class="bg-white w-full">
    <div class="">
      <div
        class="flex flex-col items-center justify-between"
        :class="reverseClass"
      >
        <div class="w-full md:w-1/3 order-3 md:order-none mt-4 md:mt-0">
          <h2 class="card-title">
            <slot name="title"></slot>
          </h2>

          <p>
            <slot name="description"></slot>
          </p>
        </div>
        <div
          class="
            w-14
            h-14
            p-3
            border border-primary
            text-center
            rounded-full
            flex
            items-center
            justify-center
            order-1
            md:order-none
            my-4 md:my-0
          "
        >
          <p class="text-2xl text-primary">
            <slot name="index"></slot>
          </p>
        </div>
        <div class="w-1/2 order-2 md:order-none my-3 md:my-0">
          <slot name="image"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reverse: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    reverseClass() {
      if (this.reverse) {
        return "md:flex-row-reverse";
      }else{
        return "md:flex-row"
      }
    },
  },
};
</script>
