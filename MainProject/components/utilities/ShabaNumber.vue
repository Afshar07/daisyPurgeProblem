<template>
  <form class="flex flex-col items-center w-full" @submit.prevent>
    <span class="relative mb-3 w-full">
      <p class="hard-ir absolute pr-2" :class="irFocused">IR</p>
      <label
        :disabled="disable"
        class="input-label absolute text-xs px-2 text-gray-600"
        :class="[labelFocusClass, disableLabel]"
      >
        <slot name="label"></slot>
      </label>
      <input
        :disabled="disable"
        class="
          data-input
          md:pl-14
          pl-9
          text-md
          outline-none
          p-1
          py-2
          px-4
          rounded-md
          text-xs
          w-11/12
        "
        :class="[inputFocusClass, isErrorTrue, cursorPointer]"
        type="text"
        autocomplete="off"
        maxlength="24"
        :placeholder="placeholder"
        v-model="data"
        @focus="changeFocusToTrue"
        @focusout="changeFocusToFalse"
        @input="emitData"
      />
    </span>
    <show-errors :error="errors"></show-errors>
  </form>
</template>

<script>
export default {
  props: [
    "defaultData",
    "focused",
    "focusedout",
    "isDisable",
    "errors",
    "cursorPoint",
    "placeholder",
  ],
  emits: ["getData"],
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
    irFocused() {
      return {
        "top-2 focused-ir": this.isFocused,
      };
    },
  },
};
</script>

<style scoped>
.hard-ir {
  transition: all 0.4s !important;
  border-right: 1px solid #000;
  left: 11%;
  bottom: 15%;
}
.focused-ir {
  transition: all 0.4s !important;
  color: #00b2d1;
  border-right: 1px solid #00b2d1;
}
.data-input {
  transition: all 0.4s !important;
  border: 1px solid #b4b4b4;
  transition: all 0.4s;
  direction: ltr;
  /* padding-left: 2.7rem; */
}
.input-focused {
  border: 1px solid #00b2d1;
  background-color: #fff;
  box-shadow: 0px 0px 10px -5px rgb(0, 178, 209);
  transition: all 0.4s;
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
</style>
