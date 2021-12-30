<template>
  <div id="my-modal" class="modal modal-open">
    <div class="modal-box">
      <span class="title">
        {{ $t("payment.enterdetails") }}
      </span>

      <div class="form-control grid grid-cols-6 w-full my-8">
        <label class="label col-span-2">
          <span class="label-text">
            {{ $t("personalinfo.name") }}
          </span>
        </label>
        <input
          v-model="userDetails.name"
          type="text"
          class="input input-bordered col-span-4 focus:ring-0"
        />
        <show-errors
          :error="errors.name"
          class="error col-span-6 mt-3"
        ></show-errors>
      </div>

      <div class="w-full grid grid-cols-6">
        <label class="col-span-2">
          {{ $t("personalinfo.gender") }}
        </label>
        <customized-gender-radio
          class="col-span-4"
          @getGender="setGender"
        ></customized-gender-radio>
        <show-errors
          :error="errors.gender"
          class="error col-span-6 mt-3"
        ></show-errors>
      </div>

      <div class="modal-action">
        <button type="button" class="btn btn-primary" @click="emitUserData">
          {{ $t("technical.submit") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomizedGenderRadio from "../../utilities/CustomizedGenderRadio.vue";
export default {
  emits: ["getUserData"],
  components: {
    CustomizedGenderRadio,
  },
  props: {
    errors: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      userDetails: {
        name: null,
        gender: null,
      },
    };
  },
  watch: {
    errors(newVal) {
      console.log(newVal);
    },
  },
  methods: {
    setGender(gender) {
      this.userDetails.gender = gender;
    },
    setName(name) {
      this.userDetails.name = name;
    },
    emitUserData() {
      this.$emit("getUserData", this.userDetails);
    },
  },
};
</script>

<style scoped>
.modal-container {
  z-index: 997;
}
.error /deep/ .error {
  text-align: center !important;
}
</style>
