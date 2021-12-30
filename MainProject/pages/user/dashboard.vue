<template>
  <div
    class="
      dashboard-container
      bg-white
      md:mx-4
      my-5
      rounded-t-lg
      shadow-lg
      w-11/12
      mx-auto
      md:w-full
      main-shadow
      relative
    "
  >
    <div class="overlay fixed" v-show="isLoading"></div>

    <div>
      <h2 class="p-4">
        {{ $t("userdashboard.stats") }}
      </h2>
      <!-- <class-stats :stats="statsList"></class-stats> -->
      <ClassStats :stats="statsList" />
    </div>
    <hr class="my-5" />
    <div class="p-4">
      <h2>
        {{ $t("wallet.title") }}
      </h2>
      <WalletStats :balance="userMe.balance" walletLink="/user/wallet" />
      <!-- <wallet-stats
        :balance="usecuboclouadrMe.balance"
        walletLink="/user/wallet"
      ></wallet-stats> -->
    </div>

    <loading-spinner :isLoading="isLoading"></loading-spinner>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  layout: "user",
  head() {
    return {
      title: this.$t("pro.dashboard"),
    };
  },
  data() {
    return {
      isLoading: false,
      statsList: [
        {
          title: this.$t("orders.comingclasses"),
          value: this.$auth.user.session_count.active,
          class: "text-success",
          order: 1,
        },
        {
          title: this.$t("orders.pendingclasses"),
          value: this.$auth.user.pending_orders_count,
          class: "text-warning",
          order: 2,
        },
        {
          title: this.$t("orders.notime"),
          value: this.$auth.user.session_count.timing_pending,
          class: "text-info",
          order: 3,
        },
        {
          title: this.$t("orders.reslovingconflict"),
          value: this.$auth.user.session_count.customer_problem_report,
          class: "text-error",
          order: 4,
        },
        {
          title: this.$t("orders.done"),
          value: this.$auth.user.session_count.done,
          class: "text-accent",
          order: 5,
        },
      ],
    };
  },
  computed: {
    userMe() {
      return this.$auth.user;
    },
  },
};
</script>

<style scoped></style>
