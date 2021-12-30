<template>
  <div
    class="
      pro-card-container
      bg-white
      w-full
      rounded-md
      h-auto
      my-3
      flex flex-col
      justify-start
      relative
    "
  >
    <div class="container p-5">
      <div class="grid grid-cols-12">
        <div class="flex flex-col col-start-1 col-end-13">
          <div class="flex">
            <a :href="redirectToProProfile" class="cursor-pointer">
              <div class="avatar ml-4 pl-4">
                <div class="rounded-box shadow w-32 h-32">
                  <img :src="pic" alt="Teachers Avatar" />
                </div>
              </div>
            </a>
            <div class="flex flex-col w-full">
              <div
                class="
                  mr-2
                  col-start-3 col-end-13
                  flex
                  items-center
                  justify-start
                "
              >
                <a class="text-lg" :href="redirectToProProfile">
                  {{ userDetails.user.name }}
                </a>
                <p class="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 mr-2 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  ۴.۳ امتیاز
                </p>
              </div>
              <div class="w-full flex items-start justify-start">
                <div class="container grid grid-cols-3 gap-2">
                  <div
                    class="
                      cols-start-1 cols-end-3
                      h-full
                      border-b-2 border-primary
                    "
                  >
                    <div class="rounded-t-sm bg-gray-50 p-1">
                      <p class="text-gray-500">
                        {{ $t("procard.teaching") }}
                      </p>
                      <p class="text-center">
                        {{ userDetails.top_category.title }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="
                      cols-start-3 cols-end-6
                      h-full
                      border-b-2 border-primary
                    "
                  >
                    <div class="rounded-t-sm bg-gray-50 p-1">
                      <p class="text-gray-500">از کشور</p>
                      <p class="text-center">ایران</p>
                    </div>
                  </div>
                  <div
                    class="
                      cols-start-6 cols-end-9
                      h-full
                      border-b-2 border-primary
                    "
                  >
                    <div class="rounded-t-sm bg-gray-50 p-1">
                      <p class="text-gray-500">تعداد کلاس ها</p>
                      <p class="text-center">7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full col-start-1 col-end-13 flex">
            <div class="flex flex-col w-32 ml-8"></div>
            <pro-details :userDetails="userDetails"></pro-details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProDetails from "../LandingPages/ProCard/ProDetails.vue";
export default {
  emits: ["reserveClass", "renderSchedule", "openTrialReservation"],
  components: {
    ProDetails,
  },
  props: {
    userDetails: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isRenderingVideo: false,
    };
  },
  head() {
    return {
      bodyAttrs: {
        class: this.isRenderingVideo ? "inset-0 fixed overflow-hidden" : "",
      },
    };
  },
  methods: {
    openTrialReservation() {
      this.$emit("openTrialReservation", this.userDetails);
    },
    renderSchedule() {
      this.$emit("renderSchedule", this.userDetails);
    },
    showVideo() {
      this.isRenderingVideo = true;
    },
    hideVideo() {
      this.isRenderingVideo = false;
    },
    reserveClass() {
      this.isRenderingVideo = false;
      this.$emit("reserveClass", this.userDetails);
    },
    sendToProProfile() {
      window.location.href = `/profile/${this.userDetails.id}`;
    },
    emitData() {
      this.$emit("reserveClass", this.userDetails);
    },
  },
  computed: {
    redirectToProProfile() {
      return `/profile/${this.userDetails.id}`;
    },
    pic() {
      if (this.userDetails.user.avatar) {
        return this.userDetails.user.avatar;
      } else {
        return "./no-avatar.jpeg";
      }
    },
    addToList() {
      return this.$t("procard.addprotolist");
    },
    video() {
      if (this.userDetails.video) {
        return this.userDetails.video;
      } else {
        return "./testVideo.MP4";
      }
    },
    userLevels() {
      if (typeof this.userDetails.levels == "string") {
        return JSON.parse(this.userDetails.levels);
      } else {
        return this.userDetails.levels;
      }
    },
    trialPrice() {
      if (this.userDetails.prices.online_prices.trial == 0) {
        return this.$t("pricing.free");
      } else {
        return (
          Intl.NumberFormat("fa-IR").format(
            this.userDetails.prices.online_prices.trial
          ) +
          " " +
          this.$t("pricing.toman")
        );
      }
    },
  },
};
</script>

<style scoped>
.popup-video {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10001;
}
.video-enter-active {
  animation: slide-up 0.3s ease-in;
}
.video-leave-active {
  animation: slide-up reverse 0.3s ease-in;
}
@keyframes slide-up {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
