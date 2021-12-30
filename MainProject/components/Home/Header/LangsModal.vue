<template>
  <div class="main-container">
    <div class="overlay fixed" @click="closeModal"></div>

    <div
      class="
        modal-box
        md:rounded-xl
        w-full
        h-full
        md:h-auto
        bg-white
        md:bg-none
        rounded-none
        p-0
        sm:p-6
        fixed
        top-1/2
        right-1/2
        transform
        translate-x-1/2
        -translate-y-1/2
      "
    >
      <div
        class="
          mobile-header
          md:hidden
          border-b border-gray-200
          m-0
          flex
          items-center
          justify-between
        "
      >
        <p class="p-5">
          {{ $t("header.language") }}
        </p>
        <svg
          @click="closeModal"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 m-5 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div class="modal-content">
        <div class="menu-title mb-3 hidden md:flex items-center">
          <svg
            @click="closeModal"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-600 cursor-pointer ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span>
            {{ $t("header.language") }}
          </span>
        </div>
        <ul class="menu p-4 bg-base-100 rounded-box">
          <div class="lang-container" v-if="langList">
            <li
              v-for="lang in langList"
              :key="lang.slug"
              @click="emitLang(lang)"
              class="ml-3"
            >
              <a>
                <img
                  :src="lang.icon"
                  :alt="lang.category_title"
                  class="lang-icon ml-4"
                />

                {{ lang.category_title }}
              </a>
            </li>
          </div>
        </ul>
      </div>
      <div class="modal-action">
        <button
          type="button"
          class="
            btn
            bg-primary
            border-none
            hover:bg-primary hover:text-white
            transform
            hover:scale-110
            ml-2
            hidden
            md:block
          "
          @click="backModal"
        >
          {{ $t("header.back") }}
        </button>
      </div>
      <footer
        class="
          footer
          bottom-5
          pt-3
          sm:pt-0
          border-t
          sm:border-0
          border-gray-300
          sm:bottom-0
          left-1/2
          sm:left-0
          transform
          -translate-x-1/2
          sm:-translate-x-0
          w-full
          fixed
          sm:relative
          text-center
          flex
          items-center
          justify-center
        "
      >
        <button
          type="button"
          class="
            btn
            bg-primary
            border-none
            hover:bg-primary hover:text-white
            md:hidden
            w-11/12
            text-lg
            flex
            items-center
            justfy-center
          "
          @click="closeModal"
        >
          {{ $t("procard.close") }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    langList: {
      type: Array,
      required: true,
    },
  },
  emits: ["closeModal", "backModal", "getLang"],
  head() {
    return {
      bodyAttrs: {
        class: "inset-0 fixed overflow-hidden",
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    backModal() {
      this.$emit("backModal");
    },
    emitLang(lang) {
      this.$emit("getLang", lang);
    },
  },
  computed: {},
};
</script>

<style scoped>
.main-container,
.modal-box {
  z-index: 10000000000000;
}
@media only screen and (min-width: 769px) {
  .lang-container {
    max-height: 45vh;
    overflow-y: auto;
  }
}
@media only screen and (max-width: 768px) {
  .lang-container {
    max-height: 65vh;
    overflow-y: auto;
  }
}
.lang-icon {
  width: 20px;
}
</style>
