<template>
  <div
    class="
      card-container
      flex flex-col
      justify-center
      items-center
      md:items-start
      w-full
      mx-auto
      md:mx-0 md:px-4
    "
  >
    <div class="overlay fixed" v-show="isLoading"></div>
    <conflict-classes-cards
      v-for="conflict in problemList"
      :key="conflict.id"
      :conflict="conflict"
    ></conflict-classes-cards>
    <page-numbers
      class="self-center"
      v-if="!$fetchState.pending"
      @nextPage="changePage"
      @prevPage="changePage"
      @changePage="changePage"
    ></page-numbers>
    <loading-spinner :isLoading="isLoading"></loading-spinner>
  </div>
</template>

<script>
import ConflictClassesCards from "./ConflictClassesCard.vue";
export default {
  components: { ConflictClassesCards },
  fetchOnServer: false,
  async fetch() {
    this.isLoading = true;
    const response = await this.$repositories.getSessions.getSessions(
      ["customer_problem_report"],
      10
    );
    this.problemList = response.data.data;
    this.$store.dispatch("paginate/setLinks", response.data.meta.links);
    this.$store.dispatch(
      "paginate/setCurrentPage",
      response.data.meta.current_page
    );
    this.isLoading = false;
  },

  data() {
    return {
      isLoading: false,
      problemList: [],
    };
  },
  methods: {
    async changePage(url) {
      if (url) {
        this.isLoading = true;
        const response = await this.$repositories.changePage.changeOrdersPage(
          url
        );
        this.activeList = response.data.data;
        this.$store.dispatch("paginate/setLinks", response.data.meta.links);
        this.$store.dispatch(
          "paginate/setCurrentPage",
          response.data.meta.current_page
        );
        this.isLoading = false;
      }
    },
  },
};
</script>
