<template>
  <div
    class="
      online-prices-container
      w-full
      flex flex-col
      justify-around
      items-center
      mt-6
    "
  >
    <div class="first-row w-full flex justify-center items-center mb-4">
      <div class="details w-1/2 flex flex-col justify-center items-center">
        <p class="text-xs">{{ $t("payment.trial") }}</p>
        <p class="text-xs text-gray-600">
          ({{ $t("proprofile.trialsession") }})
        </p>
      </div>
      <div class="price w-1/2 flex justify-center items-center">
        <p class="ml-2 text-xs">{{ trialPrice }}</p>
        <p class="text-xs" v-if="onlinePrices.trial != 0">
          {{ $t("pricing.toman") }}
        </p>
      </div>
    </div>

    <div class="second-row w-full flex justify-center items-center my-4">
      <div class="details w-1/2 flex flex-col justify-center items-center">
        <p class="text-xs">{{ $t("payment.oneonline") }}</p>
        <p class="text-xs text-gray-600">
          ({{ $t("proprofile.sessiontime") }})
        </p>
      </div>
      <div class="price w-1/2 flex justify-center items-center text-xs">
        <p>
          {{ Intl.NumberFormat("fa-IR").format(onlinePrices.one) }}
          {{ $t("pricing.toman") }}
        </p>
      </div>
    </div>

    <div class="third-row w-full flex justify-center items-center my-4">
      <div class="details w-1/2 flex flex-col justify-center items-center">
        <p class="text-xs">{{ $t("payment.fiveonline") }}</p>
        <p class="text-xs text-gray-600">
          ({{ $t("proprofile.sessiontime") }})
        </p>
      </div>
      <div class="price w-1/2 flex justify-center items-center text-xs">
        <p class="ml-2">
          {{ Intl.NumberFormat("fa-IR").format(onlinePrices.five) }}
          {{ $t("pricing.toman") }}
        </p>
      </div>
    </div>

    <div class="fourth-row w-full flex justify-center items-center my-4">
      <div class="details w-1/2 flex flex-col justify-center items-center">
        <p class="text-xs">{{ $t("payment.tenonline") }}</p>
        <p class="text-xs text-gray-600">
          ({{ $t("proprofile.sessiontime") }})
        </p>
      </div>
      <div class="price w-1/2 flex justify-center items-center text-xs">
        <p class="ml-2">
          {{ Intl.NumberFormat("fa-IR").format(onlinePrices.ten) }}
          {{ $t("pricing.toman") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onlinePrices: {
      type: Object,
    },
  },
  computed: {
    trialPrice() {
      if (this.onlinePrices.trial == 0) {
        return this.$t("pricing.free");
      } else {
        return Intl.NumberFormat("fa-IR").format(this.onlinePrices.trial);
      }
    },
  },
};
</script>
