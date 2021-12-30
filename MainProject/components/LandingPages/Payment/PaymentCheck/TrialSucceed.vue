<template>
  <div class="suceed-container flex flex-col items-center justify-center">
    <span class="w-3/4 flex items-center justify-end">
      <img
        src="/HiTalki-Logo.png"
        class="self-end w-2/5 md:w-1/5"
        alt="Hitalki Logo"
      />
    </span>
    <div
      class="
        successful-card-container
        flex flex-col
        items-center
        justify-center
        w-3/4
        shadow-lg
        bg-white
        rounded-md
      "
    >
      <img
        src="/success.png"
        class="md:w-1/6 w-1/3 h-auto succeed"
        alt="Succeed Image"
      />
      <h3 class="text-lg text-center md:text-right my-3 text-green-600">
        {{ $t("payment.paymentsucceed") }}
      </h3>
      <div
        class="
          avatar-details
          flex flex-col
          md:flex-row
          items-center
          justify-center
        "
      >
        <img
          :src="getOrder.pro.avatar"
          class="avatar w-1/2 md:w-1/6 my-3"
          alt="Teacher's Avatar"
        />
        <span class="mr-5 text-sm">
          <p class="my-2">
            {{ $t("payment.teacher") }}
            {{ getOrder.pro.name }}
          </p>
        </span>
      </div>
      <span
        class="
          flex
          items-center
          justify-around
          md:justify-between
          w-full
          md:w-1/2
        "
      >
        <p class="my-2">{{ $t("technical.classtype") }}</p>
        <p class="my-2">
          {{ $t(`pro.${getOrder.execution_method}`) }}
        </p>
      </span>
      <span
        class="
          flex
          items-center
          justify-around
          md:justify-between
          w-full
          md:w-1/2
        "
      >
        <p class="my-2">{{ $t("reservation.sessionsnumber") }}</p>
        <p class="my-2">
          {{ $t(`payment.${getOrder.session_type}`) }}
        </p>
      </span>
      <span
        class="
          flex
          items-center
          justify-around
          md:justify-between
          w-full
          md:w-1/2
        "
      >
        <p class="my-2">{{ $t("payment.paidamount") }}</p>
        <p class="my-2 text-center">
          {{
            Intl.NumberFormat("fa-IR").format(getOrder.final_price)
          }}
        </p>
      </span>
      <hr class="w-full my-2 hr" />
      <div
        class="flex flex-col items-center w-full md:w-2/3"
      >
        <p class="my-2 text-center">{{ $t("reservation.selectedtimes") }}</p>
        <div
          class="
            session-details
            w-full
            md:w-2/3
            grid grid-cols-3
            justify-items-center
          "
          v-for="timestamp in getOrder.session_start_times"
          :key="timestamp"
        >
          <p class="my-2">{{ timeStampToWeekDay(timestamp) }}</p>
          <p class="my-2">
            {{ timeStampToDay(timestamp) }} {{ timeStampToMonth(timestamp) }}
            {{ timeStampToYear(timestamp) }}
          </p>
          <p class="my-2">
            {{ timeStampFromHour(timestamp) }} {{ timeStampToHour(timestamp) }}
          </p>
        </div>
      </div>
      <button
        type="button"
        class="
          px-4
          py-1
          my-2
          mb-4
          text-white
          rounded-md
          bg-green-600
          hover:bg-green-700
        "
        @click="goToDashboard"
      >
        {{ $t("payment.gotodashboard") }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
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
    timeStampToYear(timestamp) {
      return new Date(timestamp * 1000).toLocaleDateString("fa-IR", {
        year: "numeric",
      });
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
    goToDashboard() {
      window.location.href = "/user/dashboard";
    },
  },
  computed: {
    ...mapGetters("orderDetails", ["getOrder"]),
  },
};
</script>

<style scoped>
.avatar {
  height: auto;
  max-height: inherit;
  clip-path: circle();
}
.hr {
  border: none;
  border-bottom: 1px solid #e7e7e7;
  width: 70%;
}
.succeed {
  margin-top: -2rem;
}
</style>
