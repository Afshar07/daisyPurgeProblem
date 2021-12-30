<template>
  <div class="border stats border-base-300 w-full my-4">
    <div
      class="
        stat
        flex flex-col
        md:flex-row
        items-start
        md:items-center
        justify-between
      "
    >
      <div class="flex flex-col justify-center items-start">
        <div class="stat-title">
          {{ $t("wallet.balance") }}
        </div>
        <div class="stat-value">
          {{ Intl.NumberFormat("fa-IR").format(balance) }}
        </div>
        <div class="stat-desc">
          {{ $t("pricing.toman") }}
        </div>
      </div>
      <div class="stat-actions">
        <a :href="walletLink" target="_blank" class="btn btn-sm btn-accent">
          {{ $t("wallet.charge") }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    balance: {
      type: String,
      required: true,
    },
    walletLink: {
      type: String,
      required: true,
    },
  },
};
</script>
