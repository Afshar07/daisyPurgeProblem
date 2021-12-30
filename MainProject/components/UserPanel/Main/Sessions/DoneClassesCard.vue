<template>
  <div class="main-container w-full relative" v-if="done">
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
          <card-details :card="done"></card-details>
          <div class="details w-full mt-4 md:mt-0 md:w-auto">
            <div class="w-auto flex flex-col items-center justify-center">
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
              >
                <p>
                  {{ timeStampToWeekDay(done.start_time) }}
                  {{ timeStampToDay(done.start_time) }}
                  {{ timeStampToMonth(done.start_time) }}
                  {{ timeStampFromHour(done.start_time) }}
                  {{ timeStampToHour(done.start_time) }}
                </p>
                <div
                  class="text-xs badge bg-red-200 text-red-600 border-none mr-2"
                >
                  <!-- {{ done.duration }}  -->
                  ۶۰
                  {{ $t("orders.minute") }}
                </div>
              </div>
            </div>
          </div>
          <div class="card-body h-full">
            <div class="flex flex-col justify-center items-end"></div>
          </div>
        </div>
      </div>
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
    done: {
      type: Object,
      required: true,
    },
  },
  emits: ["endSession"],
  data() {
    return {
      isLoading: false,
    };
  },
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
};
</script>
