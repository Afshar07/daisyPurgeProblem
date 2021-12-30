<template>
  <form class="flex flex-col w-full" @submit.prevent>
    <span
      class="relative flex flex-col items-center justify-center w-full mb-2"
    >
      <label
        :disabled="disable"
        class="input-label absolute text-xs mr-4 md:mr-10 text-gray-600"
        :class="[labelFocusClass, disableLabel, isRequired]"
      >
        <slot name="label"></slot>
      </label>
      <textarea
        :rows="rows"
        :cols="cols"
        :disabled="disable"
        class="
          data-input
          outline-none
          p-1
          pl-2
          py-2
          px-4
          rounded-md
          text-xs
          w-full
        "
        :class="[inputFocusClass, isErrorTrue]"
        type="text"
        autocomplete="off"
        v-model="data"
        @focus="changeFocusToTrue"
        @focusout="changeFocusToFalse"
        @input="emitData"
      ></textarea>
    </span>
    <show-errors :error="errors"></show-errors>
  </form>
</template>

<script>
import ShowErrors from "./ShowErrors.vue";
export default {
  components: { ShowErrors },
  props: {
    defaultData: {
      type: String,
    },
    focused: {
      type: Boolean,
    },
    isDisable: {
      type: Boolean,
    },
    errors: {
      type: Array,
      default: null,
    },
    cols: {
      default: 45,
    },
    rows: {
      default: "auto",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["getData"],
  watch: {
    defaultData: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.data = newVal;
          this.isFocused = true;
        }
      },
    },
    isDisable: {
      immediate: true,
      handler(newVal) {
        this.disable = newVal;
        this.emitData();
      },
    },
  },
  data() {
    return {
      disable: null,
      isFocused: false,
      data: "",
    };
  },
  methods: {
    changeFocusToTrue() {
      this.isFocused = true;
      this.$emit("focused");
    },
    changeFocusToFalse() {
      if (this.data.length == 0) {
        this.isFocused = false;
      }
    },
    emitData() {
      this.$emit("getData", this.data);
    },
  },
  computed: {
    labelFocusClass() {
      return {
        "input-label-focused": this.isFocused,
      };
    },
    inputFocusClass() {
      return {
        "input-focused py-3": this.isFocused,
      };
    },
    disableLabel() {
      if (this.disable) {
        return "input-label-disable";
      }
    },
    isErrorTrue() {
      if (this.errors) {
        return "error-state";
      }
    },
    isRequired() {
      if (this.required && this.data.length == 0) {
        return "required";
      }
    },
  },
};
</script>

<style scoped>
.data-input {
  border: 1px solid #b4b4b4;
  transition: all 0.4s;
}
.input-focused {
  border: 1px solid #00b2d1;
  background-color: #fff;
  box-shadow: 0px 0px 10px -5px rgb(0, 178, 209);
}
.error-state {
  border: 1px solid #d10000;
  box-shadow: 0px 0px 15px -5px #d10000;
}
.input-label {
  top: 0.5rem;
  right: 0.4rem;
  transition: all 0.3s;
  background-color: #fff;
  pointer-events: none;
}
.input-label-focused {
  top: -0.5rem !important;
  background-color: #fff;
  right: 0.6rem;
  font-size: 0.7rem;
}
.data-input:disabled {
  background-color: #b4b4b4;
}
.input-label-disable {
  background-color: #b4b4b4 !important;
}
.required::before {
  content: "*";
  color: #d10000;
}
</style>
