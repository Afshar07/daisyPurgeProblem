<template>
  <div
    class="
      main-container
      w-full
      2xl:w-11/12
      grid grid-cols-6
      gap-3 gap-x-0
      pl-3
      2xl:pl-0 2xl:m-0
    "
  >
    <div
      class="
        video-container
        w-full
        2xl:w-9/12
        col-start-1 col-end-7
        mx-auto
        mt-2
      "
    >
      <video controls>
        <source :src="userDetails.video" />
      </video>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["emitData"],
  props: {
    userDetails: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
