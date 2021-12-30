<template>
  <div
    class="
      acceptable-lang-container
      flex flex-col
      justify-center
      items-center
      relative
      w-full
    "
    v-if="!$fetchState.pending"
    v-click-outside="hideLangs"
  >
    <base-input
      :cursorPoint="true"
      :placeholder="this.$t('technical.inputplaceholder')"
      @getData="searchLangs"
      @focused="loadLangs"
      @inputFocus="focusOnItem"
      ref="baseInput"
    ></base-input>
    <div
      class="
        langs-container
        w-11/12
        max-h-36
        overflow-y-auto
        absolute
        px-4
        bg-white
        shadow-md
      "
      v-if="isFocused"
      ref="otherlangs"
    >
      <div
        tabindex="0"
        @keydown.enter="selectCat(lang)"
        @keydown.up.prevent="prevItem"
        @keydown.down.prevent="nextItem"
        @click="selectCat(lang)"
        class="
          langs
          my-1
          w-full
          flex
          items-center
          justify-start
          cursor-pointer
          hover:bg-blue-300
          rounded-md
          px-1
        "
        v-for="lang in langs"
        :key="lang.id"
      >
        <img :src="lang.icon" class="w-6" alt="Icon" />

        <p class="my-1 mr-4 text-sm">
          {{ lang.title }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["defaultData"],
  emits: ["getTopCat"],
  fetchOnServer() {
    return this.$nuxt.$getSsr(process.env.SSR);
  },
  async fetch() {
    const response =
      await this.$repositories.getAcceptableLangs.getAcceptableLangs(null);
    this.langs = response.data.data;
  },

  data() {
    return {
      langs: null,
      isFocused: false,
      defaultCat: null,
    };
  },
  methods: {
    focusOnItem() {
      if (this.langs) {
        const foc = this.$refs.otherlangs.childNodes[0];
        if (foc) {
          foc.focus();
        }
      }
    },
    nextItem(e) {
      const next = e.currentTarget.nextElementSibling;
      if (next) {
        next.focus();
      }
    },
    // Handle toggling between elements with arrow keys
    prevItem(e) {
      const prev = e.currentTarget.previousElementSibling;
      if (prev) {
        prev.focus();
      }
    },
    async searchLangs(searchinput) {
      if (searchinput.length > 1 && searchinput != null && searchinput != "") {
        // Check if input is more than 2 chars and not empty
        const response =
          await this.$repositories.getAcceptableLangs.getAcceptableLangs(
            searchinput
          );
        this.langs = response.data.data;
      } else if (searchinput == "" || searchinput == null) {
        // If input is empty call fetch method with no params
        const response =
          await this.$repositories.getAcceptableLangs.getAcceptableLangs(null);
        this.langs = response.data.data;
      }
    },
    loadLangs() {
      this.isFocused = true;
    },
    hideLangs() {
      this.isFocused = false;
    },
    selectCat(lang) {
      this.defaultCat = lang;
      this.hideLangs();
      this.$emit("getTopCat", this.defaultCat);
      this.$refs.baseInput.$refs.baseInput.value = "";
    },
  },
};
</script>

<style scoped>
.langs-container {
  top: 3rem;
  right: 0;
  z-index: 900;
}
</style>
