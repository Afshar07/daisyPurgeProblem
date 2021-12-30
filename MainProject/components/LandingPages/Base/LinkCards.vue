<template>
  <div class="main-container w-full">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
      <div v-for="link in linksList" :key="link.title">
        <a :href="link.link" :title="link.title" target="_blank">
          <div
            class="
              flex
              items-center
              justify-between
              shadow-md
              px-3
              bg-white
              border border-primary
              py-5
              rounded
            "
          >
            <h5 class="w-3/5</a> text-primary">
              {{ link.title }}
            </h5>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-primary"
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
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linksList: [
        {
          title: this.$t("links.teachersguide"),
          link: "/apply-to-teach",
        },
        {
          title: this.$t("links.usersguide"),
          link: "/how-to-use",
        },
        {
          title: this.$t("links.faq"),
          link: "/faq",
        },
        {
          title: this.$t("links.tos"),
          link: "/tos",
        },
      ],
    };
  },
};
</script>
