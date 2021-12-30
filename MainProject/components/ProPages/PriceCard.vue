<template>
  <div class="price-card-container w-full flex justify-around p-2 my-4">
    <div class="w-1/2">
      <p v-if="sessionCount != 'trial'">
        {{ $t(`payment.${sessionCount}${this.sessionType}`) }}
      </p>
      <p v-if="sessionCount == 'trial'">
        {{ $t(`payment.${sessionCount}`) }}
      </p>
    </div>
    <div class="w-1/2">
      <p class="text-left">
        {{ computedPrice }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sessionCount: {
      type: String,
    },
    sessionPrice: {
      type: Number,
      required: true,
    },
    sessionType: {
      type: String,
      required: true,
    },
  },
  computed: {
    computedPrice() {
      if (this.sessionPrice == 0) {
        return this.$t("reservation.freetrial");
      } else {
        return Intl.NumberFormat("fa-IR").format(this.sessionPrice);
      }
    },
  },
};
</script>

<style scoped>
.price-card-container {
  border: 1px solid #b4b4b4;
}
</style>
