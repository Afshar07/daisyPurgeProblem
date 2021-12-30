<template>
  <div class="page-numbers-container w-full flex items-center justify-center my-3">
    <div class="btn-group">
      <button class="btn flex items-center" @click="moveToPrevPage">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span>
          {{ $t("pagination.prev") }}
        </span>
      </button>
      <button
        class="btn"
        v-for="link in getLinks"
        :key="link.label"
        v-show="isOkayToShow(link)"
        :class="activeClass(link)"
        @click="changePage(link)"
      >
        {{ link.label }}
      </button>
      <button class="btn flex items-center" @click="moveToNextPage">
        <span class="mb-1">
          {{ $t("pagination.next") }}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  emits: ["nextPage", "prevPage", "changePage"],
  mounted() {
    //   Remove next/previous link from pagination array
    this.actualNumbers = this.getLinks.filter(
      link =>
        link != this.getLinks[0] &&
        link != this.getLinks[this.getLinks.length - 1]
    );
  },
  data() {
    return {
      actualNumbers: null
    };
  },
  methods: {
    isOkayToShow(value) {
      // Only show two numbers before and after current page
      if (
        value.label <= this.getCurrentPage + 1 &&
        value.label > this.getCurrentPage - 2
      ) {
        return value;
      }
    },
    activeClass(link) {
      if (link.active) {
        return "bg-gray-400";
      }
    },
    moveToNextPage() {
      this.$emit("nextPage", this.nextPage.url);
    },
    moveToPrevPage() {
      this.$emit("prevPage", this.prevPage.url);
    },
    changePage(link) {
      if (!link.active) {
        this.$emit("changePage", link.url);
      }
    }
  },
  computed: {
    ...mapGetters("paginate", ["getCurrentPage", "getLinks"]),
    prevPage() {
      return this.getLinks[0];
    },
    nextPage() {
      return this.getLinks[this.getLinks.length - 1];
    }
  }
};
</script>
