<template>
  <div class="payment-method py-3 rounded md:mr-3 bg-white shadow-md">
    <h2 class="text-lg mr-3">{{ $t("payment.paymentmethod") }}</h2>
    <div class="payment-options my-3 mr-3 flex">
      <label for="online" class="flex items-center cursor-pointer">
        <img src="/mellat.svg" alt="Mellat's bank icon" class="ml-3" />
        <input
          type="radio"
          name="online"
          checked
          id="online"
          class="ml-2"
          value="online"
          @change="setPaymentType"
        />
        <span class="flex flex-col mr-2">
          <h3 class="text-blue-500">
            {{ $t("payment.onlinepayment") }}
          </h3>
          <p class="text-xs text-gray-500">{{ $t("payment.allcards") }}</p>
        </span>
      </label>
    </div>
    <show-errors :error="errors" class="mr-3"></show-errors>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array
    }
  },
  emits: ["getPaymentType"],
  methods: {
    setPaymentType(event) {
      this.$emit("getPaymentType", event.target.value);
    }
  }
};
</script>
