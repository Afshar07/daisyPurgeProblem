<template>
  <div class="mobile-filter-container">
    <span class="filter flex justify-between my-4" @click="openGenderFilter">
      <p class="mr-4">
        {{ $t("landing.gender") }}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 ml-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
    <hr />
    <span class="filter flex justify-between my-4">
      <p class="mr-4">
        {{ $t("technical.levels") }}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 ml-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
    <hr />
    <span class="filter flex justify-between my-4">
      <p class="mr-4">
        {{ $t("technical.type") }}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 ml-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
    <hr />
    <span class="filter flex justify-between my-4">
      <p class="mr-4">
        {{ $t("technical.age") }}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 ml-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
    <mobile-gender-filter
      :isOpen="isGenderFilterOpen"
      @close="closeGenderFilter"
    ></mobile-gender-filter>
  </div>
</template>

<script>
import MobileGenderFilter from "./MobileGenderFilter.vue";
export default {
  components: { MobileGenderFilter },
  data() {
    return {
      isGenderFilterOpen: false
    };
  },
  methods: {
    openGenderFilter() {
      this.isGenderFilterOpen = true;
    },
    closeGenderFilter() {
      this.isGenderFilterOpen = false;
    }
  }
};
</script>
