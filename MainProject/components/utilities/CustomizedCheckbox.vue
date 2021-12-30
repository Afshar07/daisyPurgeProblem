<template>
  <div class="checkbox-container w-full">
    <svg class="checkbox-symbol">
      <symbol id="check" viewbox="0 0 12 10">
        <polyline
          points="1.5 6 4.5 9 10.5 1"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></polyline>
      </symbol>
    </svg>

    <div class="checkbox-sub-container">
      <input
        class="checkbox-input mx-1"
        :id="this.for"
        :value="this.value"
        :name="this.name"
        type="checkbox"
        @input="emitData"
      />
      <label class="checkbox-self flex items-center" :for="this.for">
        <span class="ml-3">
          <svg width="12px" height="10px">
            <use xlink:href="#check"></use>
          </svg>
        </span>
        <slot name="label"></slot>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["getData", "removeData"],
  props: {
    for: {
      // Used in label for and input id
      type: String,
      required: true
    },
    value: {
      type: String,
      Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    emitData(event) {
      if (event.target.checked) {
        this.$emit("getData", event.target.value);
      } else {
        this.$emit("removeData", event.target.value);
      }
    }
  }
};
</script>

<style scoped>
.checkbox-symbol {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
}

.checkbox-container {
  box-sizing: border-box;
  color: #222;
}

.checkbox-input {
  position: absolute;
  visibility: hidden;
}

.checkbox-self {
  user-select: none;
  cursor: pointer;
  padding: 0 8px;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
}

.checkbox:not(:last-child) {
  margin-right: 6px;
}

.checkbox-self span {
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}

.checkbox-self span:first-child {
  position: relative;
  flex: 0 0 18px;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  transform: scale(1);
  border: 1px solid #cccfdb;
  transition: all 0.3s ease;
}

.checkbox-self span:first-child svg {
  position: absolute;
  top: 3px;
  left: 2px;
  fill: none;
  stroke: #fff;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transform: translate3d(0, 0, 0);
}

.checkbox-self span:last-child {
  padding-left: 8px;
  line-height: 18px;
}

.checkbox:hover span:first-child {
  border-color: #ff4338;
}

.checkbox-input:checked + .checkbox-self span:first-child {
  background: #ff4338;
  border-color: #ff4338;
  animation: zoom-in-out 0.3s ease;
}

.checkbox-input:checked + .checkbox-self span:first-child svg {
  stroke-dashoffset: 0;
}

@keyframes zoom-in-out {
  50% {
    transform: scale(0.9);
  }
}
</style>
