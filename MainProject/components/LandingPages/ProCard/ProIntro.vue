<template>
  <div class="main-container my-3 p-5 flex items-center justify-center">
    <p class="text-gray-600 py-1 text-center">
      {{ aboutMe }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    userDetails: {
      type: Object,
      required: true,
    },
  },
  computed: {
    aboutMe() {
      if (this.userDetails.about_me) {
        if (this.userDetails.about_me.length > 100) {
          return this.userDetails.about_me.substring(0, 100) + "...";
        } else {
          return this.userDetails.about_me;
        }
      } else {
        return this.$t("aside.emptystate");
      }
    },
  },
};
</script>
