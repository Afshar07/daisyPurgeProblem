<template>
  <div class="gender-container w-full">
    <p class="mb-3 text-center text-sm">{{ $t("personalinfo.gender") }}</p>
    <div class="gender-select-container w-full">
      <customized-gender-radio
        :defaultGender="gender"
        @getGender="setGender"
      ></customized-gender-radio>
    </div>
  </div>
</template>

<script>
import CustomizedGenderRadio from "./CustomizedGenderRadio.vue";
export default {
  components: { CustomizedGenderRadio },
  emits: ["getGender"],
  props: ["defaultGender"],
  watch: {
    gender: {
      // Emit gender on change
      immediate: true,
      handler() {
        this.emitGender();
      }
    }
  },
  data() {
    return {
      gender: this.defaultGender
    };
  },
  methods: {
    setGender(gender) {
      // Set the gender on child's emit
      this.gender = gender;
    },
    emitGender() {
      this.$emit("getGender", this.gender);
    }
  }
};
</script>
