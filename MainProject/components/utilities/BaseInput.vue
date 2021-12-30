<template>
  <form class="flex flex-col items-center w-full" @submit.prevent>
    <span class="relative mb-3 w-full">
      <label
        :disabled="disable"
        class="input-label absolute text-xs px-2 text-gray-600"
        :class="[labelFocusClass, disableLabel, isRequired]"
      >
        <slot name="label"></slot>
      </label>
      <input
        autocomplete="off"
        :dir="dir"
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
        :class="[inputFocusClass, isErrorTrue, cursorPointer]"
        :type="type"
        :maxlength="isMaxLengthAvailable"
        :placeholder="placeholder"
        v-model="data"
        @focus="changeFocusToTrue"
        @focusout="changeFocusToFalse"
        @input="emitData"
        @keydown.down.prevent="focusOnItem"
        ref="baseInput"
      />
    </span>
    <show-errors :error="errors"></show-errors>
  </form>
</template>

<script>
export default {
  props: {
    defaultData: {
      type: String,
    },

    isDisable: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: null,
    },
    cursorPoint: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    maxlength: {
      type: Number,
      default: null,
    },
    dir: {
      type: String,
      default: "rtl",
    },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
  },
  emits: ["getData", "inputFocus", "focused", "focusedout"],
  watch: {
    defaultData: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.data = newVal;
          this.isFocused = true;
          this.emitData();
        }
      },
    },
    isDisable: {
      immediate: true,
      handler(newVal) {
        this.disable = newVal;
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
    focusOnItem() {
      this.$emit("inputFocus");
    },
    changeFocusToTrue() {
      this.isFocused = true;
      this.$emit("focused");
    },
    changeFocusToFalse() {
      if (this.data.length == 0) {
        this.isFocused = false;
        this.$emit("focusedout");
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
    cursorPointer() {
      if (this.cursorPoint) {
        return "cursor-pointer";
      }
    },
    isMaxLengthAvailable() {
      if (this.maxlength != null) {
        return this.maxlength;
      } else {
        return null;
      }
    },
    isRequired() {
      if (this.required && this.data.length == 0) {
        return "required";
      } else {
        return null;
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
