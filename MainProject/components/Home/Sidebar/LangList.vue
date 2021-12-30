<template>
  <div
    class="lang-list-container flex flex-col justify-center items-center w-full"
    v-if="!$fetchState.pending"
  >
    <div class="langs flex flex-col">
      <a
        target="blank"
        :href="langLink(lang.slug)"
        v-for="lang in langList"
        :key="lang.category_id"
        class="text-center my-4 text-sm mr-6"
      >
        <span class="flex items-center">
          <img class="w-1/12 ml-4" :src="lang.icon" alt="Language Icon" />
          <p>
            {{ lang.category_title }}
          </p>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  async fetch() {
    this.langList = this.getCategoriesList;
  },
  fetchOnServer() {
    return this.$nuxt.$getSsr(process.env.SSR);
  },
  data() {
    return {
      langList: null,
    };
  },
  methods: {
    langLink(link) {
      return "/" + link;
    },
  },
  computed: {
    ...mapGetters("categories", ["getCategoriesList"]),
  },
};
</script>
