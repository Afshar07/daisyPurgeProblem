<template>
  <div class="main-container w-full relative" v-if="pending">
    <div class="overlay fixed top-0 right-0" v-show="isLoading"></div>
    <div
      class="
        card
        compact
        shadow-lg
        compact
        side
        main-shadow
        bg-secondary
        w-full
        my-4
      "
    >
      <div class="flex flex-col">
        <div class="flex-col md:flex-row items-start space-x-4 card-body">
          <card-details :card="pending"></card-details>
          <div
            class="
              details
              w-full
              text-xs
              mt-4
              md:mt-0 md:text-base md:w-auto
              grid grid-cols-2
              gap-0
            "
          >
            <div class="w-auto">
              <p class="mb-1">
                {{ $t("orders.created_at") }}
              </p>
            </div>
            <div class="w-auto">
              <p>
                {{ createdTimeStampToWeekDay(parseDate(pending.created_at)) }}
                {{ createdTimeStampToDay(parseDate(pending.created_at)) }}
                {{ createdTimeStampToMonth(parseDate(pending.created_at)) }}
                {{ $t("orders.hour") }}
                {{ createdTimeStampFromHour(parseDate(pending.created_at)) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          arrow-box
          absolute
          flex flex-col
          items-center
          justify-center
          left-0
          bottom-2
          ml-2
          mb-2
        "
      >
        <svg
          @click="toggleExpand"
          xmlns="http://www.w3.org/2000/svg"
          class="
            h-5
            w-5
            cursor-pointer
            arrow
            border border-primary
            rounded-full
            bg-white
            text-primary
          "
          :class="expandStyle"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <transition name="accordion">
        <div v-show="isExpanded" class="card-body">
          <h3 class="mb-4">
            {{ $t("orders.startTimes") }}
          </h3>
          <div class="grid md:grid-cols-3 grid-cols-1 gap-x-3">
            <div
              class="
                flex
                items-center
                justify-between
                my-1
                border border-primary
                rounded-lg
                w-auto
                px-2
                py-1
                text-gray-600
                bg-white
              "
              v-for="session in pending.session_start_times"
              :key="session"
            >
              <p>
                {{ timeStampToWeekDay(session) }}
                {{ timeStampToDay(session) }}
                {{ timeStampToMonth(session) }}
                {{ timeStampFromHour(session) }}
                {{ timeStampToHour(session) }}
              </p>
              <div class="text-xs badge bg-red-200 text-red-600 border-none">
                {{ pending.duration }} {{ $t("orders.minute") }}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <div class="w-full" v-else>
    <h2 class="text-center">{{ $t("orders.empty") }}</h2>
  </div>
</template>

<script>
import CardDetails from "./CardDetails.vue";
export default {
  components: { CardDetails },
  props: {
    pending: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isExpanded: false,
      isLoading: false,
    };
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    parseDate(date) {
      return Date.parse(date);
    },
    createdTimeStampToDay(timestamp) {
      return new Date(timestamp).toLocaleDateString("fa-IR", {
        day: "numeric",
      });
    },
    createdTimeStampToWeekDay(timestamp) {
      return new Date(timestamp).toLocaleDateString("fa-IR", {
        weekday: "long",
      });
    },
    createdTimeStampToMonth(timestamp) {
      return new Date(timestamp).toLocaleDateString("fa-IR", {
        month: "long",
      });
    },
    createdTimeStampFromHour(timestamp) {
      return new Date(timestamp).toLocaleTimeString("fa-IR", {
        hour: "numeric",
        minute: "numeric",
      });
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
        }) + " -"
      );
    },
    timeStampToHour(timestamp) {
      let dt = new Date(timestamp * 1000);
      if (this.pending.execution_method != "trial") {
        if (this.pending.execution_method == "inperson") {
          dt.setHours(dt.getHours() + 1);
          dt.setMinutes(dt.getMinutes() + 30);
          return dt.toLocaleTimeString("fa-IR", {
            hour: "numeric",
            minute: "numeric",
          });
        } else if (this.pending.execution_method == "online") {
          dt.setHours(dt.getHours() + 1);
          return dt.toLocaleTimeString("fa-IR", {
            hour: "numeric",
            minute: "numeric",
          });
        }
      } else {
        dt.setMinutes(dt.getMinutes() + 30);
        return dt.toLocaleTimeString("fa-IR", {
          hour: "numeric",
          minute: "numeric",
        });
      }
    },
  },
  computed: {
    expandStyle() {
      if (this.isExpanded) {
        return "transform rotate-180";
      }
    },
  },
};
</script>

<style scoped>
.arrow {
  transition: all 0.3s;
}
.accordion-enter-active {
  animation: expand 0.3s ease-in;
}
.accordion-leave-active {
  animation: shrink 0.3s ease-in;
}
@keyframes expand {
  0% {
    opacity: 0;
    transform: translateY(-1rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes shrink {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-1rem);
  }
}
</style>
