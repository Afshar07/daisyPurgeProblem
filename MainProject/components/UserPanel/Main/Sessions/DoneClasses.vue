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
    <div
      class="w-full flex flex-col justify-center items-center md:items-start"
      v-if="!$fetchState.pending && doneList.length > 0"
    >
      <done-classes-card
        v-for="done in doneList"
        :key="done.id"
        :done="done"
      ></done-classes-card>
      <page-numbers
        class="self-center"
        v-if="!$fetchState.pending"
        @nextPage="changePage"
        @prevPage="changePage"
        @changePage="changePage"
      ></page-numbers>
    </div>
    <div
      class="w-full text-center"
      v-else-if="!$fetchState.pending && doneList.length == 0"
    >
      <h2 class="text-center">
        {{ $t("orders.empty") }}
      </h2>
    </div>
    <loading-spinner :isLoading="isLoading"></loading-spinner>
  </div>
</template>

<script>
import DoneClassesCard from "./DoneClassesCard.vue";
export default {
  components: { DoneClassesCard },
  fetchOnServer: false,
  async fetch() {
    this.isLoading = true;
    const response = await this.$repositories.getSessions.getSessions(
      ["done"],
      10
    );
    this.doneList = response.data.data;
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
      doneList: [],
    };
  },
  methods: {
    async changePage(url) {
      if (url) {
        this.isLoading = true;
        const response = await this.$repositories.changePage.changeOrdersPage(
          url
        );
        this.doneList = response.data.data;
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
