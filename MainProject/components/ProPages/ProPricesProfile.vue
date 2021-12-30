<template>
  <div class="pro-prices-container w-full">
    <div class="prices-tabs w-full flex items-center justify-center my-4">
      <button
        type="button"
        class="px-10 mx-1 rounded py-1 bg-blue-500 text-white"
        @click="setOnlineTabActive"
      >
        {{ $t("pro.online") }}
      </button>
      <button
        type="button"
        class="px-10 mx-1 rounded py-1 bg-blue-500 text-white"
        @click="setInpersonTabActive"
      >
        {{ $t("pro.inperson") }}
      </button>
    </div>
    <div class="online-prices" v-show="isOnlineActive">
      <price-card
        v-for="(price, index) in prices.online_prices"
        :key="price"
        :sessionCount="index"
        :sessionPrice="price"
        sessionType="online"
      ></price-card>
    </div>
    <div class="inperson-prices" v-show="isInpersonActive">
      <price-card
        v-for="(price, index) in prices.inperson_prices"
        :key="price"
        :sessionCount="index"
        :sessionPrice="price"
        sessionType="inperson"
      ></price-card>
    </div>
  </div>
</template>

<script>
import PriceCard from "./PriceCard.vue";
export default {
  components: { PriceCard },
  props: {
    prices: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeTab: "online",
    };
  },
  methods: {
    setOnlineTabActive() {
      this.activeTab = "online";
    },
    setInpersonTabActive() {
      this.activeTab = "inperson";
    },
  },
  computed: {
    isOnlineActive() {
      if (this.activeTab == "online") {
        return true;
      } else {
        return false;
      }
    },
    isInpersonActive() {
      if (this.activeTab == "inperson") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
