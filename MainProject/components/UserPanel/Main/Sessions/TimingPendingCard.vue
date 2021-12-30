<template>
  <div class="main-container w-full relative" v-if="pending">
    <div
      class="overlay fixed top-0 right-0"
      v-show="renderConfirmationModal || isRenderingSchedule"
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
          <card-details :card="pending"></card-details>
          <div class="details w-full justify-center items-center mt-4 md:mt-0 md:w-auto">
            <div class="w-full md:w-auto flex flex-col items-center justify-center">
              <p class="mb-1 text-center">
                {{ $t("orders.created_at") }}
              </p>
              <div
                class="
                  flex
                  items-center
                  justify-between
                  my-1
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
          <div class="card-body w-full md:w-auto h-full">
            <div class="flex flex-col justify-center items-center md:items-end">
              <div class="actions flex justify-center md:justify-start mt-9">
                <button
                  @click="selectSessionTime(pending)"
                  type="button"
                  class="
                    ml-2
                    px-20
                    md:px-10
                    py-3
                    md:py-1
                    text-white
                    bg-primary
                    rounded-md
                    border-white
                    transition-transform
                    transform
                    hover:scale-110
                  "
                >
                  {{ $t("orders.settime") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        schedule-modal
        bg-white
        fixed
        top-0
        right-0
        w-screen
        h-screen
        flex flex-col
        items-center
        justify-center
      "
      v-if="isRenderingSchedule"
    >
      <div class="w-11/12 h-5/6 overflow-y-scroll overflow-x-hidden pl-4">
        <class-time-section
          v-if="isRenderingSchedule"
          :proId="proId"
          @emitData="setTiming(pending.id)"
        ></class-time-section>
      </div>
    </div>
    <confirmation-modal
      @confirm="confirmOperation(pending.id)"
      @reject="rejectOperation"
      v-show="renderConfirmationModal"
      class="fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2"
    >
      <template v-slot:message>
        <p>
          {{ $t("orders.modal.timing") }}
        </p>
        <p>
          {{ timeStampToWeekDay(getSessionStartTimes) }}
          {{ timeStampToDay(getSessionStartTimes) }}
          {{ timeStampToMonth(getSessionStartTimes) }}
          {{ timeStampFromHour(getSessionStartTimes) }}
          {{ timeStampToHour(getSessionStartTimes) }}
        </p>
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
import ClassTimeSection from "../../../LandingPages/Reservation/ClassTimeSection.vue";
import ConfirmationModal from "../../../utilities/ConfirmationModal.vue";
import { mapGetters } from "vuex";

export default {
  components: { CardDetails, ClassTimeSection, ConfirmationModal },
  props: {
    pending: {
      type: Object,
      required: true,
    },
  },
  emits: ["selectTime"],

  data() {
    return {
      isConfirmed: false,
      renderConfirmationModal: false,
      proId: null,
      isRenderingSchedule: false,
    };
  },
  methods: {
    setTiming(sessionId) {
      if (this.isConfirmed) {
        this.$emit("selectTime", sessionId);
      } else {
        this.renderConfirmationModal = true;
      }
    },
    closeScheduleModal() {
      this.isRenderingSchedule = false;
    },
    confirmOperation(sessionId) {
      this.isConfirmed = true;
      this.renderConfirmationModal = false;
      this.setTiming(sessionId);
    },
    rejectOperation() {
      this.isConfirmed = false;
      this.renderConfirmationModal = false;
    },
    selectSessionTime(session) {
      this.isRenderingSchedule = true;
      this.proId = session.pro.user_id;
      this.$store.dispatch(
        "publicSchedule/setClassType",
        session.execution_method
      );
      this.$store.dispatch("publicSchedule/setClassQuantity", 1);
    },
    closeModal() {
      this.renderConfirmationModal = false;
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
      if (this.getClassType != "trial") {
        dt.setHours(dt.getHours() + 1);
        return dt.toLocaleTimeString("fa-IR", {
          hour: "numeric",
          minute: "numeric",
        });
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
    ...mapGetters("orderDetails", ["getSessionStartTimes"]),
  },
};
</script>

<style scoped>
.schedule-modal {
  z-index: 996;
}
</style>
