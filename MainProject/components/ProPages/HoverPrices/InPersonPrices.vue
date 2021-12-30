<template>
  <div
    class="
      inperson-prices-container
      w-full
      flex flex-col
      justify-around
      items-center
    "
    v-if="inpersonPrices"
  >
    <p class="text-center">
      {{ $t("landing.in") }}
      {{ city }}
    </p>

    <div class="second-row w-full flex justify-center items-center my-4">
      <div class="details w-1/2 flex flex-col justify-center items-center">
        <p class="text-xs">{{ $t("payment.oneinperson") }}</p>
        <p class="text-xs text-gray-600">
          ({{ $t("proprofile.sessiontime") }})
        </p>
      </div>
      <div class="price w-1/2 flex justify-center items-center text-xs">
        <p class="ml-2">
          {{ Intl.NumberFormat("fa-IR").format(inpersonPrices.one) }}
        </p>
        <p>{{ $t("pricing.toman") }}</p>
      </div>
    </div>

    <div class="third-row w-full flex justify-center items-center my-4">
      <div class="details w-1/2 flex flex-col justify-center items-center">
        <p class="text-xs">{{ $t("payment.fiveinperson") }}</p>
        <p class="text-xs text-gray-600">
          ({{ $t("proprofile.sessiontime") }})
        </p>
      </div>
      <div class="price w-1/2 flex justify-center items-center text-xs">
        <p class="ml-2">
          {{ Intl.NumberFormat("fa-IR").format(inpersonPrices.five) }}
        </p>
        <p>{{ $t("pricing.toman") }}</p>
      </div>
    </div>

    <div class="fourth-row w-full flex justify-center items-center my-4">
      <div class="details w-1/2 flex flex-col justify-center items-center">
        <p class="text-xs">{{ $t("payment.teninperson") }}</p>
        <p class="text-xs text-gray-600">
          ({{ $t("proprofile.sessiontime") }})
        </p>
      </div>
      <div class="price w-1/2 flex justify-center items-center text-xs">
        <p class="ml-2">
          {{ Intl.NumberFormat("fa-IR").format(inpersonPrices.ten) }}
        </p>
        <p>{{ $t("pricing.toman") }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <h4>
      {{ $t("pro.noinperson") }}
    </h4>
  </div>
</template>

<script>
export default {
  props: {
    inpersonPrices: {
      type: Object,
    },
    city: {
      type: String,
      required: false,
    },
  },
};
</script>
