<template>
  <div
    class="city-picker-container w-full relative"
    v-click-outside="removeList"
  >
    <div class="city-picker-input w-full">
      <base-input
        :isDisable="disable"
        :defaultData="selectedCity"
        :required="true"
        :errors="errors"
        @getData="getCities"
        @focused="getCitiesOnFocus"
        @inputFocus="focusOnItem"
      >
        <template v-slot:label>
          {{ $t("personalinfo.city") }}
        </template></base-input
      >
    </div>
    <div
      v-if="isFocused"
      class="selectable-cities w-11/12 absolute bg-white shadow-md"
    >
      <div
        class="city-list max-h-44 overflow-y-auto cursor-pointer"
        @scroll="handleScroll"
        ref="cities"
      >
        <p
          tabindex="0"
          v-for="city in cities"
          :key="city.id"
          class="text-center text-sm my-2 py-1 hover:bg-blue-300 focus:bg-blue-300 focus:outline-none rounded"
          @keydown.enter="selectCity(city)"
          @keydown.up.prevent="prevItem"
          @keydown.down.prevent="nextItem"
          @click="selectCity(city)"
        >
          {{ city.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";
export default {
  props: ["provinceId", "errors", "defaultCity"],
  emits: ["getCity"],
  created() {
    if (this.defaultCity) {
      this.selectedCity = this.defaultCity.name;
      this.$emit("getCity", this.defaultCity);
    }
  },
  components: {
    BaseInput
  },
  watch: {
    provinceId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.selectedProvince = newVal;
          this.disable = false;
        }
      }
    }
  },
  data() {
    return {
      cities: null,
      isFocused: false,
      selectedCity: null,
      awaitingRequest: false,
      disable: true,
      cityLinks: null
    };
  },
  methods: {
    focusOnItem() {
      if (this.cities) {
        const foc = this.$refs.cities.childNodes[0];
        if (foc) {
          foc.focus();
        }
      }
    },
    // Handle toggling between elements with arrow keys
    nextItem(e) {
      const next = e.currentTarget.nextElementSibling;
      if (next && this.cities) {
        next.focus();
      }
    },
    // Handle toggling between elements with arrow keys
    prevItem(e) {
      const prev = e.currentTarget.previousElementSibling;
      if (prev && this.cities) {
        prev.focus();
      }
    },
    removeList() {
      if (this.isFocused) {
        this.isFocused = false;
      }
    },
    async getCities(cityInput) {
      if (
        cityInput != "" &&
        cityInput != null &&
        cityInput != undefined &&
        cityInput != this.selectedCity
      ) {
        const response = await this.$repositories.getCity.getCity(
          this.provinceId,
          cityInput,
          7
        );
        this.cityLinks = response.data.links;
        this.cities = response.data.data;
        this.isFocused = true;
      }
    },
    async getCitiesOnFocus() {
      const response = await this.$repositories.getCity.getCity(
        this.provinceId,
        null,
        7
      );
      this.cityLinks = response.data.links;
      this.cities = response.data.data;
      this.isFocused = true;
    },
    selectCity(city) {
      this.selectedCity = city.name;
      this.isFocused = false;
      this.$emit("getCity", city);
    },
    handleScroll(el) {
      if (
        el.target.offsetHeight + el.target.scrollTop >=
        el.target.scrollHeight - 150
      ) {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.infiniteScroll();
            this.awaitingSearch = false;
          }, 500); // 0.5 sec delay
        }
        this.awaitingSearch = true;
      }
    },
    async infiniteScroll() {
      // Check if next page is available
      if (this.cityLinks.next) {
        const response = await this.$repositories.cityNewPage.newPage(
          this.cityLinks.next,
          7,
          this.provinceId

          // Get the next page data with pagination of 7
        );
        this.cityLinks = response.data.links;
        // Set the new links

        let newCities = [...this.cities, ...response.data.data];
        // Add the new pages to list
        this.cities = newCities;
      } else {
        return;
      }
    }
  }
};
</script>
<style scoped>
.selectable-cities {
  z-index: 100000;
  top: 3rem;
  right: 0;
}
</style>
