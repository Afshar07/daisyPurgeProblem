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
      v-if="!$fetchState.pending && pendingList.length > 0"
    >
      <pending-classes-card
        v-for="pending in pendingList"
        :key="pending.id"
        :pending="pending"
      ></pending-classes-card>

      <page-numbers
        class="self-center"
        @nextPage="changePage"
        @prevPage="changePage"
        @changePage="changePage"
      ></page-numbers>
    </div>
    <div
      class="w-full text-center"
      v-else-if="!$fetchState.pending && pendingList.length == 0"
    >
      <h2 class="text-center">
        {{ $t("orders.empty") }}
      </h2>
    </div>
    <loading-spinner :isLoading="isLoading"></loading-spinner>
  </div>
</template>

<script>
import PendingClassesCard from "./PendingClassesCard.vue";
export default {
  components: { PendingClassesCard },
  fetchOnServer: false,
  async fetch() {
    this.isLoading = true;
    const response =
      await this.$repositories.getPendingOrders.getPendingOrders();
    this.pendingList = response.data.data;
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
      pendingList: [],
    };
  },
  methods: {
    async changePage(url) {
      if (url) {
        this.isLoading = true;
        const response =
          await this.$repositories.getPendingOrders.getPendingOrders();
        this.pendingList = response.data.data;
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
