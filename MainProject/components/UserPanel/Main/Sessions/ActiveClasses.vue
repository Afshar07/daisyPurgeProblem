<template>
  <div
    class="
      card-container
      flex flex-col
      justify-center
      items-center
      md:items-start
      w-full
      mx-auto
      md:mx-0 md:px-4
    "
  >
    <div class="overlay fixed" v-show="isLoading"></div>
    <div
      class="w-full flex flex-col justify-center items-center md:items-start"
      v-if="!$fetchState.pending && activeList.length > 0"
    >
      <active-classes-card
        v-for="active in activeList"
        :key="active.id"
        :active="active"
        @endSession="endSession"
        @problemReport="problemReport"
      ></active-classes-card>
      <page-numbers
        class="self-center"
        v-if="!$fetchState.pending"
        @nextPage="changePage"
        @prevPage="changePage"
        @changePage="changePage"
      ></page-numbers>
      <successful-modal v-show="renderSuccess" class="fixed bottom-4 left-6">
        <template v-slot:message>
          {{ $t("orders.success") }}
        </template>
      </successful-modal>
      <error-modal v-show="renderError" class="fixed bottom-4 left-6">
        <template v-slot:message>
          {{ errorMessage }}
        </template>
      </error-modal>
      <div
        class="modal modal-open fixed top-0 right-0"
        v-if="renderProblemModal"
        ref="modal"
      >
        <div class="modal-box">
          <h3>
            {{ $t("orders.classproblemreport") }}
          </h3>
          <div class="pro-details w-full flex items-center justify-start mt-4">
            <img
              :src="classDetails.pro.avatar"
              alt="Teacher's Avatar"
              class="w-24 rounded-md"
            />
            <div class="mr-2">
              <p>
                {{ classDetails.pro.name }}
              </p>
              <p>
                {{ timeStampToWeekDay(classDetails.start_time) }}
                {{ timeStampToDay(classDetails.start_time) }}
                {{ timeStampToMonth(classDetails.start_time) }}
              </p>
              <p>
                {{ $t("pro.time") }}
                {{ timeStampFromHour(classDetails.start_time) }}
                {{ timeStampToHour(classDetails.start_time) }}
              </p>
            </div>
          </div>
          <p class="my-2 text-sm">
            {{ $t("orders.reportguideline") }}
          </p>
          <div class="problem-select w-full">
            <div class="dropdown w-full cursor-pointer">
              <div class="form-control" tabindex="0">
                <div
                  class="input input-bordered flex items-center justify-between"
                >
                  <p>
                    {{ selectedProblem }}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <ul
                tabindex="0"
                class="
                  p-2
                  shadow
                  menu
                  dropdown-content
                  bg-base-100
                  rounded-box
                  w-full
                "
              >
                <li>
                  <a @click="selectItem">
                    {{ $t("problems.pronoshow") }}
                  </a>
                </li>
                <li>
                  <a @click="selectItem">
                    {{ $t("problems.imnowshow") }}
                  </a>
                </li>
                <li>
                  <a @click="selectItem">
                    {{ $t("problems.prolesstime") }}
                  </a>
                </li>
                <li>
                  <a @click="selectItem">
                    {{ $t("problems.melesstime") }}
                  </a>
                </li>
                <li>
                  <a
                    @click="
                      selectItem($event);
                      requiredDesc();
                    "
                  >
                    {{ $t("problems.other") }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="form-control my-4">
            <textarea
              @input="setDescription"
              ref="description"
              class="textarea h-24 textarea-bordered focus:ring-0"
              :class="requiredClass"
              :placeholder="descPlaceholder"
            ></textarea>
          </div>

          <div class="modal-action">
            <button
              type="button"
              class="btn text-sm"
              @click="closeProblemModal"
            >
              {{ $t("problems.cancel") }}
            </button>
            <button
              @click="sendReportReq"
              type="button"
              class="btn btn-primary text-sm"
            >
              {{ $t("problems.submit") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full text-center"
      v-else-if="!$fetchState.pending && activeList.length == 0"
    >
      <h2 class="text-center">
        {{ $t("orders.empty") }}
      </h2>
    </div>
    <loading-spinner :isLoading="isLoading"></loading-spinner>
  </div>
</template>

<script>
import ActiveClassesCard from "./ActiveClassesCard.vue";
import SuccessfulModal from "../../../utilities/SuccessfulModal.vue";
import ErrorModal from "../../../utilities/ErrorModal.vue";

export default {
  components: { ActiveClassesCard, SuccessfulModal, ErrorModal },
  fetchOnServer: false,
  async fetch() {
    this.isLoading = true;
    const response = await this.$repositories.getSessions.getSessions(
      ["active"],
      10
    );
    this.activeList = response.data.data;
    this.$store.dispatch("paginate/setLinks", response.data.meta.links);
    this.$store.dispatch(
      "paginate/setCurrentPage",
      response.data.meta.current_page
    );
    this.isLoading = false;
  },
  data() {
    return {
      isLoading: false,
      isDescRequired: false,
      activeList: [],
      errorMessage: null,
      renderError: false,
      renderSuccess: false,
      renderProblemModal: false,
      classDetails: null,
      selectedProblem: this.$t("orders.selectproblem"),
      problemDetails: {
        title: null,
      },
    };
  },
  methods: {
    async sendReportReq() {
      if (
        !this.isDescRequired ||
        (this.isDescRequired && this.problemDetails.description)
      ) {
        this.renderProblemModal = false;
        try {
          const response =
            await this.$repositories.reportSessionProblem.reportSessionProblem(
              this.classDetails.id,
              this.problemDetails
            );
          this.renderSuccess = true;
          setTimeout(async () => {
            // Hide modal after 2s and call fetch again
            this.renderSuccess = false;
            await this.$fetch();
          }, 2000);
        } catch (error) {
          this.errorMessage = error.response.data.message;
          this.renderError = true;
          setTimeout(() => {
            // Hide modal after 2s
            this.renderError = false;
            this.isLoading = false;
          }, 2000);
        }
      }
    },
    selectItem(event) {
      this.isDescRequired = false;
      this.selectedProblem = event.target.innerText;
      this.problemDetails.title = event.target.innerText;
      this.$refs.description.focus();
    },
    requiredDesc() {
      this.isDescRequired = true;
    },
    setDescription(event) {
      if (event.target.value != "") {
        this.problemDetails.description = event.target.value;
      }
    },
    closeProblemModal() {
      this.renderProblemModal = false;
    },
    problemReport(data) {
      this.renderProblemModal = true;
      this.classDetails = data;
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
    async endSession(sessionId) {
      this.isLoading = true;
      try {
        const response = await this.$repositories.endSession.endSession(
          sessionId
        );
        this.renderSuccess = true;
        setTimeout(async () => {
          // Hide modal after 2s and call fetch again
          this.renderSuccess = false;
          await this.$fetch();
        }, 2000);
      } catch (error) {
        this.errorMessage = error.response.data.message;
        this.renderError = true;
        setTimeout(() => {
          // Hide modal after 2s
          this.renderError = false;
          this.isLoading = false;
        }, 2000);
      }
    },
    async changePage(url) {
      if (url) {
        this.isLoading = true;
        const response = await this.$repositories.changePage.changeOrdersPage(
          url
        );
        this.activeList = response.data.data;
        this.$store.dispatch("paginate/setLinks", response.data.meta.links);
        this.$store.dispatch(
          "paginate/setCurrentPage",
          response.data.meta.current_page
        );
        this.isLoading = false;
      }
    },
  },
  computed: {
    descPlaceholder() {
      if (!this.isDescRequired) {
        return this.$t("problems.description");
      } else {
        return `${this.$t("problems.description")}  (${this.$t(
          "technical.required"
        )})`;
      }
    },
    requiredClass() {
      if (this.isDescRequired) {
        return "requiredDescription";
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.requiredDescription::placeholder {
  color: rgba(255, 0, 0, 0.5);
}
</style>
