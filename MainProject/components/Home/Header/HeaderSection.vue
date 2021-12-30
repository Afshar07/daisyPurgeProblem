<template>
  <header class="relative">
    <div class="header-image w-full"></div>
    <h1 class="header-title absolute text-white text-center text-lg sm:text-xl">
      {{ $t("header.maintitle") }}
    </h1>

    <!-- Header Search Box Start -->
    <start-button @start="renderMethodModal"></start-button>
    <method-modal
      v-if="renderModal"
      @closeModal="closeModal"
      @getMethod="setMethod"
    ></method-modal>
    <langs-modal
      v-if="isRenderingLangModal"
      :langList="langs"
      @closeModal="closeLangsModal"
      @backModal="backFromLangsModal"
      @getLang="setLang"
    ></langs-modal>

    <choose-city-modal
      :topCatId="choosenLangId"
      :slug="langSlug"
      @loaded="loadingEnd"
      @closeCityModal="closeCityModal"
      v-if="isRenderingCityModal"
    ></choose-city-modal>

    <!-- Header Search Box End -->

    <h2 class="header-desc absolute text-center text-white">
      {{ $t("header.description") }}
    </h2>

    <!-- Loading Spinner Start -->
    <loading-spinner :isLoading="loading"></loading-spinner>
    <!-- Loading Spinner End -->
  </header>
</template>

<script>
import MethodModal from "./MethodModal.vue";
import LangsModal from "./LangsModal.vue";
import StartButton from "./StartButton.vue";
import ChooseCityModal from "../../LandingPages/ChooseCityModal.vue";

export default {
  components: {
    MethodModal,
    LangsModal,
    StartButton,
    ChooseCityModal,
  },
  data() {
    return {
      loading: false,
      renderModal: false,
      selectedMethod: null,
      langs: null,
      langSlug: null,
      choosenLangId: null,
      isRenderingLangModal: false,
      isRenderingCityModal: false,
    };
  },
  methods: {
    renderMethodModal() {
      this.renderModal = true;
    },
    loadingStart() {
      this.loading = true;
    },
    loadingEnd() {
      this.loading = false;
    },
    closeModal() {
      this.renderModal = false;
    },
    setMethod(method) {
      this.closeModal();
      this.selectedMethod = method;
      this.renderLangsModal();
    },
    async renderLangsModal() {
      this.loadingStart();
      const response = await this.$repositories.getCategories.getCategories();
      this.langs = response.data;
      this.isRenderingLangModal = true;
      this.loadingEnd();
    },
    closeLangsModal() {
      this.isRenderingLangModal = false;
    },
    backFromLangsModal() {
      this.isRenderingLangModal = false;
      this.renderModal = true;
    },
    setLang(data) {
      this.loading = true;
      // Get the selected lang from component
      // And push the user accordingly to landing page
      this.choosenLangId = data.category_id;
      this.langSlug = data.slug;
      this.closeLangsModal();
      if (this.selectedMethod == "online") {
        window.location.href = `/${data.slug}`;
      } else if (this.selectedMethod == "inperson") {
        this.renderCitiesModal();
        // Render city modal
      }
    },
    renderCitiesModal() {
      this.isRenderingCityModal = true;
    },
    setCity(data) {
      this.loadingStart();
      window.location.href = `/${data.slug}`;
    },
    closeCityModal() {
      this.isRenderingCityModal = false;
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 360px) {
  .header-title {
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
  .header-desc {
    top: 84%;
    left: 50%;
    transform: translateX(-50%);
  }
}
@media screen and (min-width: 361px) {
  .header-title {
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
  .header-desc {
    top: 80%;
    left: 50%;
    transform: translateX(-50%);
  }
}
@media screen and (min-width: 688px) {
  .header-title {
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
  }
  .header-desc {
    top: 85%;
    left: 50%;
    transform: translateX(-50%);
  }
}
@media screen and (min-width: 768px) {
  .header-title {
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
  }
  .header-desc {
    top: 58%;
    left: 50%;
    transform: translateX(-50%);
  }
}
.search-btn {
  height: 3rem;
}
.langs-modal::-webkit-scrollbar {
  display: none;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.online-select {
  height: 3rem;
}
.lang-select {
  height: 3rem;
}
.header-image {
  height: 87.5vh;
  background-image: url("../../../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  filter: contrast(30%);
}

.empty-method >>> div:nth-child(2) {
  border: 2px solid #e70000;
  transition: all 0.1s;
}
</style>
