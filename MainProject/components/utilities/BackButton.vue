<template>
  <button
    type="button"
    class="
      bg-blue-500
      hover:bg-blue-600
      text-white
      px-2
      py-1
      mt-4
      md:mr-0 md:mt-0 md:my-3
      rounded-md
      flex
      items-center
    "
    @click="goBack"
  >
    {{ $t("header.back") }}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
