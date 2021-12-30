<template>
  <div
    class="birthdate-container w-full flex flex-col justify-center items-center"
  >
    <p class="mb-2 text-sm">{{ $t("personalinfo.birthdate") }}</p>
    <base-input
      class="custom-input"
      :cursorPoint="true"
      dir="ltr"
      id="custom-birthdate"
      :defaultData="displayedDate"
    ></base-input>
    <date-picker
      v-model="dateOfBirth"
      input-format="YYYY-MM-DD"
      :auto-submit="true"
      format="jYYYY/jMM/jDD"
      ref="datepicker"
      alt-name="date_gregorian"
      alt-format="YYYY-MM-DD"
      :view="view"
      element="custom-birthdate"
      @close="changeDate"
    />
    <show-errors :error="errors" class="mt-2"></show-errors>
  </div>
</template>

<script>
import ShowErrors from "./ShowErrors.vue";
import BaseInput from "./BaseInput.vue";
export default {
  components: { ShowErrors, BaseInput },
  emits: ["getBirthdate"],
  props: ["birthdate", "view", "errors"],
  beforeMount() {
    this.emitData();
  },
  mounted() {
    this.displayedDate = this.$refs.datepicker.displayValue;
  },
  data() {
    return {
      dateOfBirth: this.birthdate,
      displayedDate: null
    };
  },
  methods: {
    changeDate() {
      // Set the new birthday on datepicker change
      this.dateOfBirth = this.$refs.datepicker.altFormatted;
      this.emitData();
      this.displayedDate = this.$refs.datepicker.displayValue;
    },
    emitData() {
      this.$emit("getBirthdate", this.dateOfBirth);
    }
  }
};
</script>
<style scoped>
@media only screen and (max-width: 400px) {
  .vpd-main input {
    width: 90%;
  }
}
</style>
