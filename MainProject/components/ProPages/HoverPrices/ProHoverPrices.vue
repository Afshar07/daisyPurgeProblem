<template>
  <div class="hover-prices-container w-full shadow">
    <div class="container-tabs flex items-center justify-center w-full mb-4">
      <button
        type="button"
        class="w-full py-1 rounded-tr rounded-b-none"
        @click="activateOnlineTab"
        :class="IsOnlineActive"
        :disabled="isOnlineAvailable"
      >
        {{ $t("pro.online") }}
      </button>
      <button
        type="button"
        class="w-full py-1 rounded-tl rounded-b-none"
        @click="activateInPersonTab"
        :class="isInPersonActive"
      >
        {{ $t("pro.inperson") }}
      </button>
    </div>
    <div class="details-container w-full flex items-center justify-center">
      <online-prices
        v-if="prices.online_prices"
        v-show="onlineTab"
        :onlinePrices="prices.online_prices"
      ></online-prices>
      <in-person-prices
        v-show="inPersonTab"
        :city="city.name"
        :inpersonPrices="prices.inperson_prices"
      ></in-person-prices>
    </div>
  </div>
</template>
<script>
import OnlinePrices from "./OnlinePrices.vue";
import InPersonPrices from "./InPersonPrices.vue";
export default {
  emits: ["online", "inperson"],
  props: {
    prices: {
      type: Object,
      required: true,
    },
    city: {
      type: Object,
    },
  },
  beforeMount() {
    if (!this.prices.online_prices) {
      this.activeTab = "inperson";
    }
  },
  components: { OnlinePrices, InPersonPrices },
  data() {
    return {
      activeTab: "online",
    };
  },
  methods: {
    activateOnlineTab() {
      this.activeTab = "online";
      this.$emit("online");
    },
    activateInPersonTab() {
      this.activeTab = "inperson";
      this.$emit("inperson");
    },
  },
  computed: {
    onlineTab() {
      if (this.activeTab == "online") {
        return true;
      }
    },
    inPersonTab() {
      if (this.activeTab == "inperson") {
        return true;
      }
    },
    isInPersonActive() {
      if (this.activeTab == "inperson") {
        return "shadow-inner text-white border border-primary bg-primary";
      } else {
        return "border border-primary text-primary";
      }
    },
    IsOnlineActive() {
      if (this.activeTab == "online") {
        return "shadow-inner text-white border border-primary bg-primary";
      } else {
        return "border border-primary text-primary";
      }
    },
    isOnlineAvailable() {
      if (this.prices.online_prices) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.test {
  color: #1c7faa;
}
</style>
