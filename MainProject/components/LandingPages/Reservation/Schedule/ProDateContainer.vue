<template>
  <div class="date-main-container w-full" dir="rtl">
    <div
      class="
        guideline
        bg-blue-100
        w-full
        mx-1
        p-1
        md:mt-20
        rounded-md
        text-sm text-gray-500
      "
    >
      <p class="mx-2 my-2">- {{ $t("timesheet.guideline.cell") }}</p>
      <p class="mx-2 my-2">- {{ $t("timesheet.guideline.drag") }}</p>
      <p class="mx-2 my-2">- {{ $t("timesheet.guideline.blue") }}</p>
      <p class="mx-2 my-2">- {{ $t("timesheet.guideline.gray") }}</p>
      <p class="mx-2 my-2">- {{ $t("timesheet.guideline.submit") }}</p>
    </div>
    <div
      class="
        buttons
        flex flex-col
        sm:flex-row
        justify-between
        items-center
        w-full
        mt-8
      "
    >
      <div
        class="
          week-buttons
          w-full
          flex
          justify-between
          sm:justify-between
          items-center
          text-sm
          sm:text-base
        "
      >
        <button
          @click="previousWeek"
          :disabled="renderPrevWeek || isLoading"
          class="
            prev-week
            my-2
            sm:my-0
            px-3
            sm:px-5
            text-gray-700
            py-3
            flex
            items-center
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          {{ $t("timesheet.prevWeek") }}
        </button>
        <p>
          {{
            `${getDay(0)} ${getMonth(0)} - ${getDay(6)} ${getMonth(
              6
            )} ${getYear(6)}`
          }}
        </p>
        <button
          @click="nextWeek"
          :disabled="isLoading"
          class="
            next-week
            flex
            items-center
            my-2
            sm:my-0
            px-3
            sm:px-5
            text-gray-700
            py-3
          "
        >
          {{ $t("timesheet.nextWeek") }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
    <reservation-calendar
      ref="hourChart"
      :isLoading="isLoading"
      :id="id"
      :availableTimes="availableTimes"
      :classType="getClassType"
      :sessionQuantity="getClassQuantity"
      @loading="loading"
      @loaded="loaded"
      @timeSelected="emitData"
    ></reservation-calendar>
    <loading-spinner :isLoading="isLoading" class="spinner"></loading-spinner>
  </div>
</template>

<script>
import ReservationCalendar from "../../../../../timeres_core/ReservationCalendar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    ReservationCalendar,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  emits: ["emitData"],
  mounted() {
    this.isLoading = true;
  },
  data() {
    return {
      nowDate: Date.now(),
      availableTimes: null,
      renderPrevWeek: true,
      isLoading: false,
    };
  },
  methods: {
    emitData(times) {
      this.$store.dispatch("orderDetails/setSessionStartTimes", times);
      this.$emit("emitData");
    },
    getDay(day) {
      let dayInMili = day * 86400000;
      let date = this.nowDate + dayInMili;
      return this.convertDayToJalali(date);
    },
    getMonth(day) {
      let dayInMili = day * 86400000;
      let date = this.nowDate + dayInMili;
      return this.convertMonthToJalali(date);
    },
    getYear(day) {
      let dayInMili = day * 86400000;
      let date = this.nowDate + dayInMili;
      return this.convertYearToJalali(date);
    },
    convertDayToJalali(date) {
      return new Date(date)
        .toLocaleDateString("fa-IR", {
          day: "numeric",
        })
        .replace("م", "");
    },
    convertMonthToJalali(date) {
      return new Date(date).toLocaleDateString("fa-IR", {
        month: "long",
      });
    },
    convertYearToJalali(date) {
      return new Date(date).toLocaleDateString("fa-IR", {
        year: "numeric",
      });
    },
    async nextWeek() {
      this.isLoading = true;
      // Add 7 days (In milliseconds) to now
      this.nowDate += 604800000;
      if (this.nowDate > Date.now()) {
        this.renderPrevWeek = false;
      }

      await this.$refs.hourChart.nextWeek();
      this.isLoading = false;
    },
    async previousWeek() {
      this.isLoading = true;
      // Reduce 7 days (In milliseconds) to now
      this.nowDate -= 604800000;
      //   Make sure we don't go back in time
      if (this.nowDate < Date.now()) {
        this.renderPrevWeek = true;
      }
      await this.$refs.hourChart.previousWeek();
      this.isLoading = false;
    },
    loaded() {
      this.isLoading = false;
    },
    loading() {
      this.isLoading = true;
    },
  },
  computed: {
    ...mapGetters("publicSchedule", ["getClassType", "getClassQuantity"]),
  },
};
</script>

<style scoped>
::v-deep .spinner {
  left: 50% !important;
}
.prev-week:disabled {
  background-color: #fff;
}
</style>
