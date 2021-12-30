<template>
  <div class="class-type-container w-full mt-16 overflow-y-auto">
    <header class="w-full">
      <h3 class="text-center">{{ $t("reservation.selecttype") }}</h3>
    </header>
    <main class="my-5">
      <!-- Trial Section Start -->
      <div
        class="
          trial-section
          rounded-md
          hover:text-gray-800
          cursor-pointer
          p-4
          flex
          items-center
          w-full
          justify-between
        "
        :class="trialDeactiveClass"
        ref="trial"
        @click="selectTrial"
      >
        <div class="right">
          <p>
            {{ $t("reservation.trialsession") }}
          </p>
          <p class="text-sm">
            {{ $t("reservation.halfhour") }}
          </p>
        </div>
        <div class="left text-sm">
          <span v-if="isTrialFree">
            <p>{{ $t("reservation.freetrial") }}</p>
          </span>
          <span v-else-if="isTrialPaid" class="flex items-center">
            <p class="mx-1">
              {{
                Intl.NumberFormat("fa-IR").format(
                  userPrices.online_prices.trial
                )
              }}
            </p>
            <p>{{ $t("pricing.toman") }}</p>
          </span>
          <span v-else-if="isTrialDeactivated">
            <p class="text-red-600">{{ $t("reservation.unavailable") }}</p>
          </span>
        </div>
      </div>
      <!-- Trial Section End -->

      <!-- Online Section Start -->
      <div
        class="
          online-section
          rounded-md
          hover:text-gray-800
          my-4
          cursor-pointer
          p-4
          flex
          items-center
          w-full
          justify-between
        "
        :class="onlineDeactiveClass"
        ref="online"
        @click="selectOnline"
      >
        <div class="right">
          <p>
            {{ $t("reservation.onlinesession") }}
          </p>
          <p class="text-sm">
            {{ $t("reservation.onlinedetails") }}
          </p>
        </div>
        <div class="left text-sm">
          <span class="flex items-center" v-if="!isOnlineDeactivated">
            <p>{{ $t("landing.from") }}</p>
            <p class="mx-1">
              {{
                Intl.NumberFormat("fa-IR").format(userPrices.online_prices.ten)
              }}
            </p>
            <p>{{ $t("pricing.toman") }}</p>
          </span>
          <span v-else>
            <p class="text-red-600">{{ $t("reservation.unavailable") }}</p>
          </span>
        </div>
      </div>
      <!-- Online Section End -->

      <!-- Inperson Section Start -->
      <div
        class="
          online-section
          rounded-md
          hover:text-gray-800
          cursor-pointer
          p-4
          flex
          items-center
          w-full
          justify-between
        "
        :class="inPersonDeactiveClass"
        ref="inperson"
        @click="selectInPerson"
      >
        <div class="right">
          <p>
            {{ $t("reservation.inpersonsession") }}
            <span v-if="city" class="text-sm text-tertiary"> ({{ city }}) </span>
          </p>
          <p class="text-sm">
            {{ $t("reservation.inpersondetails") }}
          </p>
        </div>
        <div class="left text-sm">
          <span class="flex items-center" v-if="!isInPersonDeactivated">
            <p>{{ $t("landing.from") }}</p>
            <p class="mx-1">
              {{
                Intl.NumberFormat("fa-IR").format(
                  userPrices.inperson_prices.ten
                )
              }}
            </p>
            <p>{{ $t("pricing.toman") }}</p>
          </span>
          <span v-else>
            <p class="text-red-600">{{ $t("reservation.unavailable") }}</p>
          </span>
        </div>
      </div>
      <!-- Inperson Section End -->
    </main>
    <footer
      class="
        footer
        bottom-5
        pt-3
        sm:pt-0
        border-t
        sm:border-0
        border-gray-300
        sm:bottom-0
        left-1/2
        sm:left-0
        transform
        -translate-x-1/2
        sm:-translate-x-0
        w-full
        fixed
        sm:relative
        text-center
        flex
        items-center
        justify-center
      "
    >
      <button
        type="button"
        class="
          w-full
          text-center
          py-3
          bg-primary
          hover:bg-red-600
          items-center
          justify-center
          rounded-md
          text-white
        "
        :disabled="isButtonDisabled"
        @click="selectType"
      >
        {{ $t("reservation.continue") }}
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    userPrices: {
      type: Object,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },
  },
  emits: ["getClassType"],
  data() {
    return {
      type: null,
    };
  },
  methods: {
    selectTrial() {
      if (!this.isTrialDeactivated) {
        this.$refs.online.classList.remove("selected");
        this.$refs.inperson.classList.remove("selected");
        this.$refs.trial.classList.add("selected");
        this.type = "trial";
      }
    },
    selectOnline() {
      if (!this.isOnlineDeactivated) {
        this.$refs.inperson.classList.remove("selected");
        this.$refs.trial.classList.remove("selected");
        this.$refs.online.classList.add("selected");
        this.type = "online";
      }
    },
    selectInPerson() {
      if (!this.isInPersonDeactivated) {
        this.$refs.online.classList.remove("selected");
        this.$refs.trial.classList.remove("selected");
        this.$refs.inperson.classList.add("selected");
        this.type = "inperson";
      }
    },
    selectType() {
      this.$emit("getClassType", this.type);
    },
  },
  computed: {
    isTrialDeactivated() {
      if (
        !this.userPrices.online_prices ||
        (!this.userPrices.online_prices.trial &&
          this.userPrices.online_prices.trial != 0)
      ) {
        return true;
      }
    },
    trialDeactiveClass() {
      if (this.isTrialDeactivated) {
        return "deactive";
      }
    },
    isOnlineDeactivated() {
      if (!this.userPrices.online_prices) {
        return true;
      }
    },
    onlineDeactiveClass() {
      if (this.isOnlineDeactivated) {
        return "deactive";
      }
    },
    isInPersonDeactivated() {
      if (!this.userPrices.inperson_prices) {
        return "deactive";
      }
    },
    inPersonDeactiveClass() {
      if (this.isInPersonDeactivated) {
        return "deactive";
      }
    },
    isTrialFree() {
      if (
        this.userPrices.online_prices &&
        this.userPrices.online_prices.trial == 0
      ) {
        return true;
      }
    },
    isTrialPaid() {
      if (
        this.userPrices.online_prices &&
        this.userPrices.online_prices.trial &&
        this.userPrices.online_prices.trial > 0
      ) {
        return true;
      }
    },
    isButtonDisabled() {
      if (!this.type) {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.trial-section,
.online-section,
.inperson-section {
  border: 1px solid #e6e6e6;
  transition: all 0.25s ease;
}
.trial-section:hover,
.online-section:hover,
.inperson-section:hover {
  border: 1px solid #3f9dfb;
}
.deactive {
  @apply bg-gray-200 cursor-not-allowed text-gray-500;
}
.selected {
  @apply bg-blue-100 text-gray-800;
  border: 1px solid #3f9dfb !important;
}
</style>
