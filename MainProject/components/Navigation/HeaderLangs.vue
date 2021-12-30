<template>
  <div
    class="categories-container flex flex-col md:grid md:grid-cols-4	md:gap-2"
  >
    <a
      v-for="cat in categoriesList"
      :key="cat.slug"
      :href="langLink(cat.slug)"
      target="blank"
    >
      <div
        class="px-4 py-2 m-4 text-center rounded-md text-sm hover:text-blue-700 hover:bg-gray-200 cursor-pointer"
      >
        <p class="text-center">
          {{ cat.category_title }}
        </p>
      </div>
    </a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  async fetch() {
    const response = await this.$repositories.getCategories.getCategories();
    this.$store.dispatch("categories/setCategoriesList", response.data);
    this.categoriesList = this.getCategoriesList;
  },
  beforeMount() {
    this.categoriesList = this.getCategoriesList;
  },
  data() {
    return {
      categoriesList: null
    };
  },
  methods: {
    langLink(link) {
      // Absolute link path
      return "/" + link;
    }
  },
  computed: {
    ...mapGetters("categories", ["getCategoriesList"])
  }
};
</script>

<style scoped>
.categories-container {
  width: 100%;
}
</style>
