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
export default {
  fetchOnServer: false,
  async fetch() {
    this.isLoading = true;
    const response = await this.$repositories.getSessions.getSessions(
      ["pro_canceled", "customer_canceled"],
      10
    );
    this.canceledList = response.data.data;
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
      canceledList: [],
    };
  },
  methods: {
    async changePage(url) {
      if (url) {
        this.isLoading = true;
        const response = await this.$repositories.changePage.changeOrdersPage(
          url
        );
        this.canceledList = response.data.data;
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
