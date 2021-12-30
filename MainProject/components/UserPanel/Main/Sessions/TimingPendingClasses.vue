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
      <timing-pending-card
        v-for="pending in pendingList"
        :key="pending.id"
        :pending="pending"
        @selectTime="setTiming"
      ></timing-pending-card>
      <page-numbers
        class="self-center"
        v-if="!$fetchState.pending"
        @nextPage="changePage"
        @prevPage="changePage"
        @changePage="changePage"
      ></page-numbers>
      <successful-modal v-show="renderSuccess" class="fixed bottom-4 left-6">
        <template v-slot:message>
          {{ $t("orders.success") }}
        </template>
      </successful-modal>
      <error-modal v-show="renderError" class="fixed bottom-4 left-6">
        <template v-slot:message>
          {{ errorMessage }}
        </template>
      </error-modal>
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
import TimingPendingCard from "./TimingPendingCard.vue";
import SuccessfulModal from "../../../utilities/SuccessfulModal.vue";
import ErrorModal from "../../../utilities/ErrorModal.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    SuccessfulModal,
    ErrorModal,
    TimingPendingCard,
  },
  async fetch() {
    this.isLoading = true;
    const response = await this.$repositories.getSessions.getSessions(
      ["timing_pending"],
      10
    );
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
      pendingList: [],
      isLoading: false,
      renderSuccess: false,
      renderError: false,
      errorMessage: null,
    };
  },
  methods: {
    async setTiming(sessionId) {
      this.isLoading = true;
      try {
        const response = await this.$repositories.setSessionTime.setSessionTime(
          sessionId,
          ...this.getSessionStartTimes
        );
        console.log(response);
        this.$fetch();
        this.isLoading = false;
      } catch (error) {
        this.errorMessage = error.response.message;
        this.renderError = true;
        setTimeout(() => {
          // Hide modal after 2s
          this.renderError = false;
          this.isLoading = false;
        }, 2000);
      }
    },

    async changePage(url) {
      if (url) {
        this.isLoading = true;
        const response = await this.$repositories.changePage.changeOrdersPage(
          url
        );
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
  computed: {
    ...mapGetters("orderDetails", ["getSessionStartTimes"]),
  },
};
</script>
