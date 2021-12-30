<template>
  <aside class="w-full bg-white rounded h-full my-3 shadow-md">
    <header class="pro-details w-full flex flex-col items-center mx-2">
      <img
        class="avatar w-20 h-auto my-2"
        :src="getOrder.pro.avatar"
        alt="Teacher's avatar"
      />
      <div class="text-sm w-11/12 flex flex-col self-start my-4 mx-2">
        <span class="my-1 name flex items-center justify-between">
          <p>{{ $t("payment.teachersname") }}</p>
          <p>{{ getOrder.pro.name }}</p>
        </span>
        <span class="my-1 top-cat flex items-center justify-between">
          <p>
            {{ $t("payment.protopcat") }}
          </p>
          <p>
            {{ getOrder.top_category.title }}
          </p>
        </span>
        <span class="my-1 session-count flex items-center justify-between">
          <p>
            {{ $t("payment.sessionscount") }}
          </p>
          <p>{{ $t(`payment.${getOrder.session_type}`) }}</p>
        </span>
        <span class="my-1 one-session-price flex items-center justify-between">
          <p>
            {{ $t("payment.sessionprice") }}
          </p>
          <p>
            {{
              Intl.NumberFormat("fa-IR").format(getOrder.default_session_price)
            }}
            {{ $t("pricing.toman") }}
          </p>
        </span>
        <span class="my-1 one-session-price flex items-center justify-between">
          <p>
            {{ $t("payment.wholeprice") }}
          </p>
          <p>
            {{
              Intl.NumberFormat("fa-IR").format(getOrder.default_total_price)
            }}
            {{ $t("pricing.toman") }}
          </p>
        </span>
        <span
          v-if="getOrder.default_total_discount_price != 0"
          class="
            whole-discount
            my-1
            text-red-600
            flex
            items-center
            justify-between
            relative
          "
        >
          <p>
            {{ $t("payment.finaldiscountedprice") }}
          </p>
          <p>
            {{
              Intl.NumberFormat("fa-IR").format(
                getOrder.default_total_discount_price
              )
            }}
            {{ $t("pricing.toman") }}
          </p>
          <span
            v-if="getOrder.default_total_discount_percent != 0"
            class="
              absolute
              flex
              items-center
              justify-center
              text-xs
              top-0
              left-20
              md:left-30
              text-white
              bg-red-600
              rounded-md
              px-2
              py-1
            "
            >{{ getOrder.default_total_discount_percent.toFixed(0) }}%</span
          >
        </span>
        <span
          class="
            my-1
            full-price
            flex
            items-center
            text-xl
            font-black
            text-justify
            justify-between
          "
        >
          <p>{{ $t("payment.finalprice") }}</p>
          <p>
            {{ Intl.NumberFormat("fa-IR").format(getOrder.final_price) }}
            {{ $t("pricing.toman") }}
          </p>
        </span>
      </div>
    </header>
    <div class="pay-btn my-4 mx-2 flex items-center justify-center">
      <button
        type="button"
        class="
          w-full
          px-3
          py-3
          my-2
          bg-primary
          hover:bg-red-600
          rounded-md
          text-white
        "
        @click="emitPayment"
      >
        {{ $t("payment.pay") }}
      </button>
    </div>
  </aside>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  emits: ["sendPaymentReq"],
  methods: {
    emitPayment() {
      this.$emit("sendPaymentReq");
    },
  },
  computed: {
    ...mapGetters("orderDetails", ["getOrder"]),
    calcOneSessionPrice() {
      let oneSessionPrice = null;
      if (this.getOrder.session_type == "ten") {
        oneSessionPrice = this.getOrder.final_price / 10;
      } else if (this.getOrder.session_type == "five") {
        oneSessionPrice = this.getOrder.final_price / 5;
      } else if (this.getOrder.session_type == "one") {
        oneSessionPrice = this.getOrder.final_price;
      }
      return oneSessionPrice;
    },
  },
};
</script>

<style scoped>
.avatar {
  clip-path: circle();
}
</style>
