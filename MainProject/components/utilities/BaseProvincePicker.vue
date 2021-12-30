<template>
  <div
    class="province-picker-container relative w-full"
    v-click-outside="removeList"
  >
    <div class="province-picker-input w-full">
      <base-input
        :defaultData="selectedProvince"
        :required="true"
        @getData="getProvinces"
        @focused="getProvincesOnFocus"
        @inputFocus="focusOnItem"
      >
        <template v-slot:label>
          {{ $t("personalinfo.province") }}
        </template></base-input
      >
    </div>
    <div
      v-if="isFocused"
      class="selectable-provinces w-11/12 absolute bg-white shadow-md"
    >
      <div
        class="province-list max-h-44 overflow-y-auto cursor-pointer"
        ref="provinces"
      >
        <p
          tabindex="0"
          v-for="province in provinces"
          :key="province.id"
          class="text-center text-sm my-2 py-1 hover:bg-blue-300 focus:bg-blue-300 focus:outline-none rounded"
          @keydown.enter="selectProvince(province)"
          @keydown.up.prevent="prevItem"
          @keydown.down.prevent="nextItem"
          @click="selectProvince(province)"
        >
          {{ province.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";
export default {
  props: ["defaultProvince"],
  emits: ["getProvince"],
  components: {
    BaseInput
  },
  created() {
    if (this.defaultProvince) {
      this.selectedProvince = this.defaultProvince.province.name;
      this.$emit("getProvince", this.defaultProvince.province);
    }
  },
  data() {
    return {
      provinces: null,
      isFocused: false,
      selectedProvince: null
    };
  },
  methods: {
    focusOnItem() {
      if (this.provinces) {
        const foc = this.$refs.provinces.childNodes[0];
        if (foc) {
          foc.focus();
        }
      }
    },
    // Handle toggling between elements with arrow keys
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
    removeList() {
      if (this.isFocused) {
        this.isFocused = false;
      }
    },
    async getProvinces(provinceInput) {
      if (
        provinceInput != "" &&
        provinceInput != null &&
        provinceInput != undefined &&
        provinceInput != this.selectedProvince
      ) {
        const response = await this.$repositories.getProvince.getProvince(
          provinceInput
        );
        this.provinces = response.data.data;
        this.isFocused = true;
      }
    },
    async getProvincesOnFocus() {
      const response = await this.$repositories.getProvince.getProvince();
      this.provinces = response.data.data;
      this.isFocused = true;
    },
    selectProvince(province) {
      this.selectedProvince = province.name;
      this.isFocused = false;
      this.$emit("getProvince", province);
    }
  }
};
</script>
<style scoped>
.selectable-provinces {
  z-index: 100000;
  top: 3rem;
  right: 0;
}
</style>
