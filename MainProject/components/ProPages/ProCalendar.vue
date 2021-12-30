<template>
  <div class="date-main-container w-auto mb-24 2xl:mb-10 3xl:mb-0" dir="rtl">
    <a
      :href="proProfileLink"
      target="_blank"
      class="w-full bg-white flex items-center justify-center my-4"
    >
      <div class="details flex items-center">
        <span>
          <img
            :src="proDetails.user.avatar"
            alt="User's profile picture"
            class="avatar w-20 h-auto"
          />
        </span>
        <div class="flex flex-col justify-center text-sm">
          <span class="flex items-center mx-2">
            <p>{{ $t("reservation.reservewith") }}</p>
            <p class="mr-1">{{ proDetails.user.name }}</p>
          </span>
          <span class="flex items-center mx-2">
            <p>{{ $t("procard.teaching") }}</p>
            <p class="mr-2">{{ proDetails.top_category.title }}</p>
          </span>
        </div>
      </div>
    </a>
    <div
      class="
        guideline
        bg-blue-100
        w-full
        mx-1
        p-1
        px-2
        md:mt-12
        rounded-md
        text-sm text-gray-500
      "
    >
      <p class="mx-2 my-2">- {{ $t("timesheet.guideline.cell") }}</p>
      <p class="mx-2 my-2">- {{ $t("timesheet.guideline.availableblue") }}</p>
      <p class="mx-2 my-2">- {{ $t("timesheet.guideline.gray") }}</p>
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
        text-xs
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
    <div class="w-full px-2">
      <showable-calendar
        ref="hourChart"
        :isLoading="isLoading"
        :id="proDetails.user.id"
        :availableTimes="availableTimes"
        @loading="loading"
        @loaded="loaded"
      ></showable-calendar>
    </div>
    <loading-spinner :isLoading="isLoading" class="spinner"></loading-spinner>
    <div class="pro-details bg-white w-full px-2 py-3 fixed bottom-0">
      <div class="flex items-center justify-start w-full">
        <button
          @click="emitData"
          type="button"
          class="w-1/5 ml-4 py-1 bg-primary rounded-md text-white text-center"
        >
          {{ $t("procard.reservetrial") }}
        </button>
        <button
          @click="closeCalendar"
          type="button"
          class="
            w-1/5
            mr-4
            py-1
            text-primary
            border border-primary
            rounded-md
            text-center
          "
        >
          {{ $t("problems.cancel") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ShowableCalendar from "../../../timeres_core/ShowableCalendar.vue";
export default {
  components: {
    ShowableCalendar,
  },
  props: {
    proDetails: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      bodyAttrs: {
        class: "inset-0 fixed overflow-hidden",
      },
    };
  },
  emits: ["emitData", "close"],
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
    closeCalendar() {
      this.$emit("close");
    },
    emitData() {
      this.$emit("emitData", this.proDetails);
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
    proProfileLink() {
      return `/profile/${this.proDetails.id}`;
    },
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
.avatar {
  clip-path: circle();
}
</style>
