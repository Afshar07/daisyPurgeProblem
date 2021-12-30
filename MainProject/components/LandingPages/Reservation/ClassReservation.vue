<template>
  <div class="reserve-modal w-full unselectable fixed bg-white" v-if="isOpen">
    <header class="w-full">
      <div
        class="
          mobile-header
          py-3
          h-full
          w-full
          flex
          justify-between
          items-center
          sm:hidden
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-3"
          viewBox="0 0 20 20"
          fill="currentColor"
          @click="closeModal"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="w-full">{{ stepTitles }}</p>
        <button
          type="button"
          class="
            bg-gray-50
            w-auto
            hover:bg-gray-100
            text-sm text-gray-500
            px-2
            py-1
            ml-3
            rounded-md
            flex
            items-center
          "
          @click="backModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <div
        class="
          desktop-header
          w-full
          hidden
          sm:flex sm:items-center sm:justify-between
          p-4
          sm:p-6
        "
      >
        <button
          type="button"
          class="
            bg-gray-50
            ml-2
            sm:ml-0
            w-auto
            hover:bg-gray-100
            text-sm text-gray-500
            px-2
            py-1
            rounded-md
            flex
            items-center
          "
          @click="backModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          {{ $t("header.back") }}
        </button>
        <div class="flex items-center w-full sm:w-3/5">
          <span>
            <img
              :src="userDetails.user.avatar"
              alt="User's profile picture"
              class="avatar w-20 h-auto"
            />
          </span>
          <div class="flex flex-col justify-center text-sm">
            <span class="flex items-center mx-2">
              <p>{{ $t("reservation.reservewith") }}</p>
              <p class="mr-1">{{ userDetails.user.name }}</p>
            </span>
            <span class="flex items-center mx-2">
              <p>{{ $t("procard.teaching") }}</p>
              <p class="mr-2">{{ userDetails.top_category.title }}</p>
            </span>
          </div>
        </div>
      </div>
    </header>
    <main class="p-4 sm:p-6 w-full container mx-auto">
      <div
        class="
          reserve-steps
          hidden
          w-full
          md:flex
          items-center
          justify-center
          mt-2
        "
      >
        <div
          class="step-circle relative flex items-center justify-center"
          :class="stepOneActive"
        >
          <p class="text-center text-white">1</p>
          <p
            class="
              step-text
              absolute
              top-8
              right-4
              transform
              translate-x-1/2
              text-xs text-center
            "
          >
            {{ $t("reservation.classtype") }}
          </p>
        </div>
        <hr class="w-1/5" />
        <span
          class="step-circle relative flex items-center justify-center"
          :class="stepTwoActive"
        >
          <p class="text-center text-white">2</p>

          <p
            class="
              absolute
              step-text
              top-8
              right-4
              transform
              translate-x-1/2
              text-xs text-center
            "
          >
            {{ $t("reservation.sessionsnumber") }}
          </p>
        </span>
        <hr class="w-1/5" />
        <span
          class="step-circle relative flex items-center justify-center"
          :class="stepThreeActive"
        >
          <p class="text-center text-white">3</p>

          <p
            class="
              absolute
              step-text
              top-8
              right-4
              transform
              translate-x-1/2
              text-xs text-center
            "
          >
            {{ $t("reservation.schedule") }}
          </p>
        </span>
        <hr class="w-1/5" v-if="classType == 'inperson'" />

        <span
          v-if="classType == 'inperson'"
          class="step-circle relative flex items-center justify-center"
          :class="stepAddressActive"
        >
          <p class="text-center text-white">4</p>

          <p
            class="
              absolute
              step-text
              top-8
              right-4
              transform
              translate-x-1/2
              text-xs text-center
            "
          >
            {{ $t("reservation.address") }}
          </p>
        </span>
        <hr class="w-1/5" />
        <span
          class="step-circle relative flex items-center justify-center"
          :class="stepFourActive"
        >
          <p
            class="text-center text-white"
            v-if="classType == 'online' || !classType"
          >
            4
          </p>
          <p class="text-center text-white" v-else-if="classType == 'inperson'">
            5
          </p>

          <p
            class="
              absolute
              step-text
              top-8
              right-4
              transform
              translate-x-1/2
              text-xs text-center
            "
          >
            {{ $t("reservation.checkout") }}
          </p>
        </span>
      </div>
      <class-type-section
        v-if="step == 1"
        :userPrices="userDetails.prices"
        :city="userDetails.user.city.name"
        @getClassType="setClassType"
      ></class-type-section>
      <class-address
        v-else-if="step == 'address'"
        @getAddr="setAddress"
      ></class-address>
      <class-quantity-section
        v-else-if="step == 2"
        :type="classType"
        :prices="relativePrices"
        :city="userDetails.user.city.name"
        :categoryTitle="userDetails.top_category.title"
        @getQuantity="setQuantity"
      ></class-quantity-section>
      <class-time-section
        v-else-if="step == 3"
        :proId="userDetails.user.id"
        @emitData="setNextStep"
      ></class-time-section>
    </main>
    <footer>
      <user-login-modal
        class="login-modal"
        :show="renderLoginModal"
        @sendReq="sendOrderReq"
        @closeModal="closeUserLoginModal"
      ></user-login-modal>
    </footer>
    <div id="my-modal" class="modal modal-open" v-if="renderTrialConfirmation">
      <div class="modal-box">
        <p>
          {{ $t("reservation.trialmodal1") }}
          <strong>
            {{ timeStampToWeekDay(getPayload.session_start_times[0]) }}
            {{ timeStampToDay(getPayload.session_start_times[0]) }}
            {{ timeStampToMonth(getPayload.session_start_times[0]) }}
            {{ timeStampFromHour(getPayload.session_start_times[0]) }}
            {{ timeStampToHour(getPayload.session_start_times[0]) }}
            {{ $t("reservation.trialmodal2") }}
          </strong>
          {{ $t("reservation.trialmodal3") }}
        </p>
        <div class="modal-action">
          <button type="button" class="btn btn-primary" @click="sendOrderReq">
            {{ $t("orders.confirm") }}
          </button>
          <button type="button" class="btn" @click="closeTrialModal">
            {{ $t("orders.reject") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassTypeSection from "./ClassTypeSection.vue";
import ClassQuantitySection from "./ClassQuantitySection.vue";
import ClassTimeSection from "./ClassTimeSection.vue";
import ClassAddress from "./ClassAddress.vue";
import UserLoginModal from "../../LoginPage/UserLoginModal.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    ClassTypeSection,
    ClassQuantitySection,
    ClassTimeSection,
    ClassAddress,
    UserLoginModal,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    userDetails: {
      type: Object,
    },
    isTrial: {
      type: Boolean,
      required: false,
    },
    isTypeSet: {
      type: String,
      required: false,
    },
  },
  mounted() {
    if (this.isTrial) {
      this.setClassType("trial");
    }
    if (this.isTypeSet) {
      this.setClassType(this.isTypeSet);
    }
  },
  emits: ["closeModal"],
  data() {
    return {
      step: 1,
      classType: null,
      quantity: null,
      renderLoginModal: false,
      renderTrialConfirmation: false,
    };
  },
  head() {
    return {
      bodyAttrs: {
        class: "inset-0 fixed overflow-hidden",
      },
    };
  },
  methods: {
    closeTrialModal() {
      this.renderTrialConfirmation = false;
    },
    closeUserLoginModal() {
      this.renderLoginModal = false;
    },
    async sendOrderReq() {
      if (this.$auth.loggedIn) {
        try {
          const response =
            await this.$repositories.sendOrderRequest.sendOrderRequest(
              this.getPayload
            );
          if (response.status == 201) {
            await this.$store.dispatch(
              "orderDetails/setOrder",
              response.data.data
            );
            if (response.data.data.status == "pro_accept_pending") {
              this.$router.push("/payment/check?trial=true");
            } else {
              // Save Order Id in localStorage with ttl of 1 day
              let localStorageItem = {
                id: response.data.data.id,
                ttl: new Date().getTime() + 86400000,
              };
              localStorage.setItem("order", JSON.stringify(localStorageItem));
              this.$router.push("/payment");
            }
          }
        } catch (error) {
          console.log(error.response.status);
        }
        // Clear vuex after sending req
        await this.$store.dispatch("orderDetails/setSessionStartTimes", []);
      } else {
        this.renderLoginModal = true;
      }
    },
    setNextStep() {
      if (this.classType == "inperson") {
        this.step = "address";
      } else if (
        this.classType == "trial" &&
        this.userDetails.prices.online_prices.trial == 0
      ) {
        this.renderTrialConfirmation = true;
      } else {
        this.sendOrderReq();
      }
    },

    backModal() {
      if (this.step > 1 && this.classType != "trial") {
        this.step--;
      } else if (this.classType == "trial" && this.step == 3) {
        this.step = 1;
      } else if (this.step == "address") {
        this.step = 3;
      } else {
        this.classType = null;
        this.$emit("closeModal");
      }
    },
    closeModal() {
      this.$emit("closeModal");
      this.step = 1;
    },
    setClassType(classType) {
      this.classType = classType;
      this.$store.dispatch("orderDetails/setExecutionMethod", classType);
      if (classType == "trial") {
        this.$store.dispatch("orderDetails/setExecutionMethod", "online");
        this.$store.dispatch("orderDetails/setSessionType", "trial");
        this.step = 3;
        this.quantity = 1;
        this.$store.dispatch("publicSchedule/setClassQuantity", this.quantity);
      } else {
        this.step = 2;
      }
      this.$store.dispatch("publicSchedule/setClassType", classType);
    },
    setAddress(data) {
      this.$store.dispatch("orderDetails/setAddress", data.address);
      this.$store.dispatch("orderDetails/setDescription", data.description);
      this.sendOrderReq();
    },
    setQuantity(quantity) {
      if (quantity == 1) {
        this.$store.dispatch("orderDetails/setSessionType", "one");
      } else if (quantity == 5) {
        this.$store.dispatch("orderDetails/setSessionType", "five");
      } else if (quantity == 10) {
        this.$store.dispatch("orderDetails/setSessionType", "ten");
      }
      this.step = 3;
      this.quantity = quantity;
      this.$store.dispatch("publicSchedule/setClassQuantity", quantity);
    },
    timeStampToDay(timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString("fa-IR", {
        day: "numeric",
      });
    },
    timeStampToWeekDay(timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString("fa-IR", {
        weekday: "long",
      });
    },
    timeStampToMonth(timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString("fa-IR", {
        month: "long",
      });
    },
    timeStampFromHour(timestamp) {
      return (
        new Date(timestamp * 1000).toLocaleTimeString("fa-IR", {
          hour: "numeric",
          minute: "numeric",
        }) + ` ${this.$t("reservation.to")}`
      );
    },
    timeStampToHour(timestamp) {
      let dt = new Date(timestamp * 1000);
      dt.setMinutes(dt.getMinutes() + 30);
      return dt.toLocaleTimeString("fa-IR", {
        hour: "numeric",
        minute: "numeric",
      });
    },
  },
  computed: {
    stepOneActive() {
      if (this.step == 1) {
        return "bg-blue-500";
      } else {
        return "bg-green-500";
      }
    },
    stepTwoActive() {
      if (this.step == 2) {
        return "bg-blue-500";
      } else if (this.step > 2 || this.step == "address") {
        return "bg-green-500";
      } else {
        return "bg-gray-300";
      }
    },
    stepThreeActive() {
      if (this.step == 3) {
        return "bg-blue-500";
      } else if (this.step > 3 || this.step == "address") {
        return "bg-green-500";
      } else {
        return "bg-gray-300";
      }
    },
    stepFourActive() {
      if (this.step == 4) {
        return "bg-blue-500";
      } else {
        return "bg-gray-300";
      }
    },
    stepAddressActive() {
      if (this.step == "address") {
        return "bg-blue-500";
      } else {
        return "bg-gray-300";
      }
    },
    stepTitles() {
      if (this.step == 1) {
        return this.$t("reservation.classtype");
      } else if (this.step == 2) {
        return this.$t("reservation.sessionsnumber");
      } else if (this.step == 3) {
        return this.$t("reservation.schedule");
      }
    },
    relativePrices() {
      if (this.classType == "online") {
        return this.userDetails.prices.online_prices;
      } else if (this.classType == "inperson") {
        return this.userDetails.prices.inperson_prices;
      } else {
        return this.userDetails.prices.online_prices.trial;
      }
    },
    ...mapGetters("orderDetails", ["getPayload"]),
  },
};
</script>

<style scoped>
.reserve-modal {
  width: 100%;
  height: 100%;
  max-height: fit-content;
  overflow-y: auto;
  top: 0;
  right: 0;
  z-index: 10000;
}
.step-circle {
  min-width: 25px !important;
  min-height: 25px !important;
  border-radius: 50%;
  position: relative;
}
.step-text {
  min-width: 110px;
}
.mobile-header {
  border-bottom: 1px solid #e6e6e6;
}
.avatar {
  clip-path: circle();
}
.login-modal {
  z-index: 99999;
}
</style>
