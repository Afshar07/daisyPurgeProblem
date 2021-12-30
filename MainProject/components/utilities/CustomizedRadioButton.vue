<template>
  <label :for="this.for" class="input-container text-md px-2 flex items-center">
    <input
      class="radio-input"
      type="radio"
      :name="this.name"
      :id="this.for"
      :value="this.value"
      :checked="checked"
      @input="emitData"
    />
    <slot name="label"></slot>
    <span class="checkmark"></span>
  </label>
</template>
<script>
export default {
  props: {
    for: {
      // Used in label for and input id
      type: String,
      required: true,
    },
    value: {
      type: String,
      Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["getData"],
  methods: {
    emitData(event) {
      if (event.target.checked) {
        this.$emit("getData", event.target.value);
      }
    },
  },
};
</script>

<style scoped>
.input-container {
  display: block;
  position: relative;
  cursor: pointer;
  padding-right: 35px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.radio-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: 0;
  right: 0;
  height: 20px;
  width: 20px;
  background-color: #ffffff;
  border: 1px solid #c7c7c7;
  border-radius: 50%;
  transition: all 0.3s;
}
.input-container .radio-input:checked ~ .checkmark {
  border: 1px solid #ff4338;
  box-shadow: 0 5px 25px rgb(0 40 117 / 12%);
}
.input-container:hover .radio-input ~ .checkmark {
  border: 1px solid #ff4338;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.input-container .radio-input:checked ~ .checkmark:after {
  display: block;
  animation: radio-scale 0.3s ease-out;
}
.input-container .checkmark:after {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff4338;
}
@keyframes radio-scale {
  0% {
    transform: scale(0) translate(-140%, -140%);
  }
  100% {
    transform: scale(1) translate(-50%, -50%);
  }
}
</style>
