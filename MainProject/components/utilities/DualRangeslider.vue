<template>
  <div
    class="range-slider-container h-20 md:w-40 lg:w-52 xl:w-60 2xl:w-64 3xl:w-80 4xl:w-96"
  >
    <div class="details flex justify-center mt-2">
      <span class="flex items-center text-sm">
        <p class="ml-1">{{ $t("landing.from") }}</p>
        <p class="ml-1">{{ minPrice }}</p>
        <p class="ml-1">{{ $t("pricing.toman") }}</p>
      </span>
      <span class="flex items-center text-sm">
        <p class="ml-1">{{ $t("landing.to") }}</p>
        <p class="ml-1">{{ maxPrice }}</p>
        <p class="ml-1">{{ $t("pricing.toman") }}</p>
      </span>
    </div>
    <input
      type="range"
      min="0"
      max="100"
      step="1"
      class="my-4"
      id="price"
      v-model="sliderMin"
      @change="setPrice"
    />
    <input
      type="range"
      min="0"
      max="100"
      step="1"
      class="my-4"
      id="price"
      v-model="sliderMax"
      @change="setPrice"
    />
  </div>
</template>

<script>
export default {
  emits: ["getPrice"],
  data() {
    return {
      minPrice: 10,
      maxPrice: 30
    };
  },
  methods: {
    setPrice() {
      this.$emit("getPrice", this.minPrice, this.maxPrice);
    }
  },
  computed: {
    sliderMin: {
      get: function() {
        var val = parseInt(this.minPrice);
        return val;
      },
      set: function(val) {
        val = parseInt(val);
        if (val > this.maxPrice) {
          this.maxPrice = val;
        }
        this.minPrice = val;
      }
    },
    sliderMax: {
      get: function() {
        var val = parseInt(this.maxPrice);
        return val;
      },
      set: function(val) {
        val = parseInt(val);
        if (val < this.minPrice) {
          this.minPrice = val;
        }
        this.maxPrice = val;
      }
    }
  }
};
</script>

<style scoped>
.range-slider-container {
  margin: auto;
  text-align: center;
  position: relative;
}

.range-slider-container input[type="range"] {
  position: absolute;
  left: 0;
  bottom: 0;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #2497e3;
}

input[type="range"]:focus::-ms-fill-lower {
  background: #2497e3;
}

input[type="range"]:focus::-ms-fill-upper {
  background: #2497e3;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  background: #2497e3;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

input[type="range"]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid #2497e3;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #a1d0ff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}
</style>
