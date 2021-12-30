<template>
  <div class="selected-times py-3 rounded bg-white shadow-md my-3 w-full">
    <span
      class="flex items-center justify-between cursor-pointer"
      @click="toggleDiscountBox"
    >
      <h2 class="text-lg mr-3">
        {{ $t("reservation.selectedtimes") }}
      </h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 ml-3 arrow"
        :class="openDiscountArrow"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </span>
    <transition name="slide" mode="out-in">
      <div class="times-loop-container w-full mt-2 mr-3" v-show="timesOpen">
        <div
          v-for="(timestamp, index) in startTimesList"
          :key="timestamp"
          class="session-details mb-2"
        >
          <p class="text-gray-800 w-auto">{{ index + 1 }}</p>
          <p class="my-2">{{ timeStampToWeekDay(timestamp) }}</p>
          <p class="my-2">
            {{ timeStampToDay(timestamp) }} {{ timeStampToMonth(timestamp) }}
            {{ timeStampToYear(timestamp) }}
          </p>
          <p class="my-2">
            {{ timeStampFromHour(timestamp) }} -
            {{ timeStampToHour(timestamp) }}
          </p>
        </div>
        <button
        class="text-blue-500"
          type="button"
          v-if="getOrder.session_start_times.length > 3"
          @click="toggleShow"
        >
          {{ buttonTitle }}
        </button>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      timesOpen: true,
      showTimes: false,
    };
  },
  methods: {
    toggleShow() {
      this.showTimes = !this.showTimes;
    },
    toggleDiscountBox() {
      this.timesOpen = !this.timesOpen;
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
    timeStampToYear(timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString("fa-IR", {
        year: "numeric",
      });
    },
    timeStampFromHour(timestamp) {
      return new Date(timestamp * 1000).toLocaleTimeString("fa-IR", {
        hour: "numeric",
        minute: "numeric",
      });
    },
    timeStampToHour(timestamp) {
      let dt = new Date(timestamp * 1000);
      dt.setMinutes(dt.getMinutes() + this.getOrder.duration);
      return dt.toLocaleTimeString("fa-IR", {
        hour: "numeric",
        minute: "numeric",
      });
    },
  },
  computed: {
    ...mapGetters("orderDetails", ["getOrder"]),
    openDiscountArrow() {
      if (this.timesOpen) {
        return "open-times-arrow";
      }
    },
    buttonTitle() {
      if (this.showTimes) {
        return this.$t("payment.close");
      } else {
        return this.$t("payment.show");
      }
    },
    startTimesList() {
      if (this.getOrder.session_start_times.length <= 3) {
        return this.getOrder.session_start_times;
      } else {
        if (this.showTimes) {
          return this.getOrder.session_start_times;
        } else if (!this.showTimes) {
          return this.getOrder.session_start_times.slice(0, 3);
        }
      }
    },
  },
};
</script>

<style scoped>
.session-details {
  display: grid;
  grid-template-columns: 30px 1fr 1fr 1fr;
  align-items: center;
}
.arrow {
  transition: all 0.2s ease-in-out;
}
.open-times-arrow {
  transform: rotate(180deg);
}
.slide-enter-active {
  animation: slide-down 0.2s ease-in-out;
  overflow: hidden;
}
.slide-leave-active {
  animation: slide-up 0.2s ease-in-out;
  overflow: hidden;
}
@keyframes slide-down {
  0% {
    display: hidden;
    max-height: 0px;
  }
  100% {
    display: block;
    max-height: 100px;
  }
}
@keyframes slide-up {
  0% {
    display: block;
    max-height: 100px;
  }
  100% {
    display: hidden;
    max-height: 0px;
  }
}
</style>
