<template>
  <div class="main-container w-full relative" v-if="active">
    <div
      class="overlay fixed top-0 right-0"
      v-show="renderConfirmationModal"
      @click="closeModal"
    ></div>
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
          <card-details :card="active"></card-details>
          <div class="details w-full md:w-auto">
            <div
              class="w-full md:w-auto flex flex-col items-center justify-center"
            >
              <div
                class="
                  flex
                  items-center
                  justify-between
                  mt-4
                  md:my-1
                  border border-primary
                  rounded-lg
                  w-full
                  md:w-auto
                  px-2
                  py-1
                  text-gray-600
                  bg-white
                "
              >
                <div
                  v-if="days < 3"
                  class="text-xs badge bg-red-200 text-red-600 border-none ml-2"
                >
                  <day-details :days="days"></day-details>
                </div>
                <p>
                  {{ timeStampToWeekDay(active.start_time) }}
                  {{ timeStampToDay(active.start_time) }}
                  {{ timeStampToMonth(active.start_time) }}
                  {{ timeStampFromHour(active.start_time) }}
                  {{ timeStampToHour(active.start_time) }}
                </p>
                <div
                  class="text-xs badge bg-red-200 text-red-600 border-none mr-2"
                >
                  {{ active.duration }}
                  {{ $t("orders.minute") }}
                </div>
              </div>
              <div
                v-if="isExpired"
                class="grid grid-flow-col gap-5 text-center auto-cols-max mt-4"
                dir="ltr"
              >
                <div
                  class="
                    flex flex-col
                    p-2
                    border border-red-600
                    bg-white
                    rounded-box
                    text-tertiary
                  "
                >
                  <span class="text-2xl countdown">
                    <span :style="remainingDays"></span>
                  </span>
                  {{ $t("orders.days") }}
                </div>
                <div
                  class="
                    flex flex-col
                    p-2
                    border border-red-600
                    bg-white
                    rounded-box
                    text-tertiary
                  "
                >
                  <span class="text-2xl countdown">
                    <span :style="remainingHours"></span>
                  </span>
                  {{ $t("orders.hour") }}
                </div>
                <div
                  class="
                    flex flex-col
                    p-2
                    border border-red-600
                    bg-white
                    rounded-box
                    text-tertiary
                  "
                >
                  <span class="text-2xl countdown">
                    <span :style="remainingMinutes"></span>
                  </span>
                  {{ $t("orders.minute") }}
                </div>
                <div
                  class="
                    flex flex-col
                    p-2
                    border border-red-600
                    bg-white
                    rounded-box
                    text-tertiary
                  "
                >
                  <span class="text-2xl countdown">
                    <span :style="remainingSeconds"></span>
                  </span>
                  {{ $t("orders.seconds") }}
                </div>
              </div>
              <div v-else>
                <h3 class="mt-4">
                  {{ $t("orders.expired") }}
                </h3>
              </div>
            </div>
          </div>
          <div class="card-body w-full md:w-auto h-full">
            <div class="flex flex-col justify-center items-center md:items-end">
              <div
                class="
                  actions
                  flex flex-col
                  items-center
                  md:items-center
                  justify-center
                  mt-9
                "
              >
                <button
                  @click="ConfirmSessionEnd(active.id)"
                  type="button"
                  class="
                    md:ml-2
                    px-20
                    md:px-10
                    py-3
                    md:py-1
                    text-white
                    bg-primary
                    rounded-md
                    border-white
                    md:transition-transform md:transform md:hover:scale-110
                  "
                >
                  {{ $t("orders.setdone") }}
                </button>
                <button
                  @click="reportAProblem"
                  type="button"
                  class="
                    my-2
                    md:ml-2
                    px-20
                    md:px-8
                    py-3
                    md:py-1
                    bg-white
                    border border-primary
                    text-primary
                    rounded-md
                    md:transition-transform md:transform md:hover:scale-110
                  "
                >
                  {{ $t("orders.problemreport") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <confirmation-modal
      @confirm="confirmOperation(active.id)"
      @reject="rejectOperation"
      v-show="renderConfirmationModal"
      class="fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2"
    >
      <template v-slot:message>
        {{ $t("orders.modal.end") }}
      </template>
      <template v-slot:confirm>
        {{ $t("orders.modal.yes") }}
      </template>
      <template v-slot:decline>
        {{ $t("orders.modal.no") }}
      </template>
    </confirmation-modal>
  </div>
  <div class="w-full" v-else>
    <h2 class="text-center">{{ $t("orders.empty") }}</h2>
  </div>
</template>

<script>
import CardDetails from "./CardDetails.vue";
import ConfirmationModal from "../../../utilities/ConfirmationModal.vue";
import DayDetails from "./DayDetails.vue";
export default {
  components: { CardDetails, ConfirmationModal, DayDetails },
  props: {
    active: {
      type: Object,
      required: true,
    },
  },
  emits: ["endSession", "problemReport"],
  beforeMount() {
    this.countDownDate = this.active.start_time * 1000;
    this.now = new Date().getTime();
    this.timeLeft = this.countDownDate - this.now;
    this.days = Math.floor(this.timeLeft / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((this.timeLeft / (1000 * 60 * 60)) % 24);
    this.minutes = Math.floor((this.timeLeft / 1000 / 60) % 60);
    this.seconds = Math.floor((this.timeLeft / 1000) % 60);
  },
  data() {
    return {
      isConfirmed: false,
      renderConfirmationModal: false,
      countDownDate: null,
      timeLeft: null,
      now: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      localInterval: null,
    };
  },
  methods: {
    reportAProblem() {
      this.$emit("problemReport", this.active);
    },
    countDownEngine() {
      this.now = new Date().getTime();
      this.timeLeft = this.countDownDate - this.now;
      this.days = Math.floor(this.timeLeft / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((this.timeLeft / (1000 * 60 * 60)) % 24);
      this.minutes = Math.floor((this.timeLeft / 1000 / 60) % 60);
      this.seconds = Math.floor((this.timeLeft / 1000) % 60);
    },
    confirmOperation(sessionId) {
      this.isConfirmed = true;
      this.renderConfirmationModal = false;
      this.ConfirmSessionEnd(sessionId);
    },
    rejectOperation() {
      this.isConfirmed = false;
      this.renderConfirmationModal = false;
    },
    ConfirmSessionEnd(sessionId) {
      if (this.isConfirmed) {
        this.$emit("endSession", sessionId);
      } else {
        this.renderConfirmationModal = true;
      }
    },
    closeModal() {
      this.renderConfirmationModal = false;
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
      if (this.active.execution_method != "trial") {
        if (this.active.execution_method == "inperson") {
          dt.setHours(dt.getHours() + 1);
          dt.setMinutes(dt.getMinutes() + 30);
          return dt.toLocaleTimeString("fa-IR", {
            hour: "numeric",
            minute: "numeric",
          });
        } else if (this.active.execution_method == "online") {
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
    remainingSeconds() {
      setInterval(() => {
        this.countDownEngine();
      }, 1000);
      return `--value:${this.seconds}`;
    },
    remainingMinutes() {
      return `--value:${this.minutes}`;
    },
    remainingHours() {
      return `--value:${this.hours}`;
    },
    remainingDays() {
      return `--value:${this.days}`;
    },
    isExpired() {
      if (this.countDownDate <= this.now) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
