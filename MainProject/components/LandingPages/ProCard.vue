<template>
  <div
    class="
      pro-card-container
      bg-white
      w-full
      rounded-md
      shadow-lg
      h-auto
      my-3
      flex flex-col
      justify-start
      relative
    "
  >
    <div class="container p-5">
      <div class="grid grid-cols-12">
        <div
          class="
            flex flex-col
            col-start-1 col-end-13
            md:col-start-1 md:col-end-9
            2xl:ml-6
          "
        >
          <div class="flex flex-col md:flex-row">
            <div class="cursor-pointer">
              <div class="avatar md:ml-4 md:pl-4 flex justify-start">
                <div class="rounded-box shadow w-32 h-32">
                  <a :href="profileLink" target="_blank">
                    <img :src="pic" alt="Teachers Avatar" />
                  </a>
                </div>
              </div>
            </div>
            <div class="flex flex-col w-full">
              <div
                class="
                  md:mr-2
                  flex flex-col
                  items-start
                  md:flex-row md:items-center md:justify-start
                "
              >
                <a
                  :href="profileLink"
                  target="_blank"
                  class="text-lg cursor-pointer"
                >
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
                <button
                  type="button"
                  class="
                    mr-10
                    md:mr-auto
                    mb-2
                    rounded-md
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div
                    :data-tip="removeFromList"
                    class="tooltip"
                    @click="toggleFav"
                    v-if="isFavorite"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-red-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div
                    :data-tip="addToList"
                    class="tooltip"
                    @click="toggleFav"
                    v-if="!isFavorite"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="0.7"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                </button>
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
          <div class="w-full col-start-1 col-end-13 md:col-end-9 flex">
            <div class="flex flex-col items-center w-32">
              <button
                @click="openTrialReservation"
                type="button"
                class="
                  py-2
                  px-2
                  rounded-md
                  bg-primary
                  text-white text-center text-xs
                  my-2
                  w-32
                "
              >
                <p class="font-bold">
                  {{ $t("payment.trial") }}
                </p>
                <p class="text-center">{{ trialPrice }}</p>
              </button>

              <button
                @click="reserveClass"
                type="button"
                class="
                  py-2
                  border border-primary
                  rounded-md
                  text-primary text-center
                  w-32
                  text-xs
                "
              >
                <p class="text-center">
                  {{ $t("procard.onehoursession") }}
                </p>
                <p class="text-center">
                  {{
                    Intl.NumberFormat("fa-IR").format(
                      userDetails.prices.online_prices.one
                    )
                  }}
                  {{ $t("pricing.toman") }}
                </p>
              </button>
            </div>
            <pro-details :userDetails="userDetails" class="mr-8"></pro-details>
          </div>
          <span></span>
        </div>
        <card-tabs
          :userDetails="userDetails"
          @emitData="emitData"
          @renderSchedule="renderSchedule"
        ></card-tabs>
      </div>
    </div>
    <div class="modal modal-open" v-if="renderDeleteConfirmation">
      <div class="modal-box">
        <p>
          {{ $t("procard.confirmremove") }}
        </p>
        <div class="modal-action">
          <button type="button" class="btn" @click="closeModalConfirmation">
            {{ $t("orders.modal.no") }}
          </button>
          <button type="button" class="btn btn-primary" @click="deleteFromFav">
            {{ $t("orders.modal.yes") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardTabs from "./ProCard/CardTabs.vue";
import ProDetails from "./ProCard/ProDetails.vue";
export default {
  emits: ["reserveClass", "renderSchedule", "openTrialReservation"],
  components: {
    CardTabs,
    ProDetails,
  },
  props: {
    userDetails: {
      type: Object,
      required: true,
    },
    favorites: {
      type: Array,
      required: false,
    },
  },
  mounted() {
    if (this.favorites) {
      this.favorites.find((fav) => {
        if (fav.pro_id == this.userDetails.id) {
          this.isFavorite = true;
        }
      });
    }
  },
  data() {
    return {
      isRenderingVideo: false,
      isFavorite: false,
      renderDeleteConfirmation: false,
    };
  },
  head() {
    return {
      bodyAttrs: {
        class:
          this.isRenderingVideo || this.renderDeleteConfirmation
            ? "inset-0 fixed overflow-hidden"
            : "",
      },
    };
  },
  methods: {
    closeModalConfirmation() {
      this.renderDeleteConfirmation = false;
    },
    async toggleFav() {
      try {
        if (!this.isFavorite) {
          const response = await this.$repositories.addToFavroite.addToFavroite(
            this.userDetails.user.id
          );
          if (response.status == 200) {
            this.isFavorite = true;
          }
        } else {
          this.renderDeleteConfirmation = true;
        }
      } catch (error) {}
    },
    async deleteFromFav() {
      this.renderDeleteConfirmation = false;
      const response =
        await this.$repositories.deleteFromFavorite.deleteFromFavorite(
          this.userDetails.user.id
        );
      if (response.status == 200) {
        this.isFavorite = false;
      }
    },
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
    emitData() {
      this.$emit("reserveClass", this.userDetails);
    },
  },
  computed: {
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
    removeFromList() {
      return this.$t("procard.removeprofromlist");
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
    profileLink() {
      return `/profile/${this.userDetails.id}`;
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
