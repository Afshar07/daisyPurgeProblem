<template>
  <div
    class="mobile-filters py-3 shadow-md w-full self-start mt-4 md:hidden bg-white"
  >
    <button
      type="button"
      class="filter-btn mx-2 text-sm px-3 py-1 rounded-3xl text-gray-700"
      @click="openFilters"
    >
      {{ $t("landing.filters") }}
    </button>
    <mobile-filters-page
      :isFiltersOpen="isFiltersOpen"
      @closeFiltersPage="closeFilters"
    ></mobile-filters-page>
  </div>
</template>

<script>
import MobileFiltersPage from "./MobileFiltersPage.vue";
export default {
  components: { MobileFiltersPage },
  data() {
    return {
      isFiltersOpen: false
    };
  },
  methods: {
    openFilters() {
      this.isFiltersOpen = true;
    },
    closeFilters() {
      this.isFiltersOpen = false;
    }
  }
};
</script>

<style scoped>
.filter-btn {
  border: 1px solid #c7c7c7;
}
</style>
