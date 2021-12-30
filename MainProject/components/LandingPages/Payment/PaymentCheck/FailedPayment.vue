<template>
  <div class="failed-container flex flex-col items-center justify-center">
    <span class="w-3/4 flex items-center justify-end">
      <img
        src="/HiTalki-Logo.png"
        class="self-end w-2/5 md:w-1/5"
        alt="Hitalki Logo"
      />
    </span>
    <div
      class="
        failed-card-container
        flex flex-col
        items-center
        justify-center
        w-3/4
        shadow-lg
        bg-white
        rounded-md
      "
    >
      <img
        src="/failed.png"
        class="md:w-1/6 w-1/3 h-auto failed"
        alt="Failed Image"
      />
      <h3 class="text-lg my-3 text-red-600">
        {{ $t("payment.paymentfailed") }}
      </h3>
      <p class="text-sm text-center md:text-right md:text-md my-2">
        {{ $t("payment.transactionid") }} {{ paymentDetails.transactionId }}
      </p>
      <div class="my-6">
        <a
          href="/"
          class="px-4 py-1 my-2 mb-4 text-white rounded-md bg-primary ml-2"
        >
          {{ $t("payment.returntosite") }}
        </a>
        <a
          href="/payment"
          class="
            px-4
            py-1
            my-2
            mb-4
            mr-2
            text-white
            rounded-md
            bg-blue-500
            hover:bg-blue-600
          "
        >
          {{ $t("payment.tryagain") }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paymentDetails: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped>
.failed {
  margin-top: -2rem;
}
</style>
