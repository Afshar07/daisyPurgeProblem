<template>
  <transition name="scale">
    <div class="mobile-gender-container fixed h-auto bg-white" v-show="isOpen">
      <header
        class="my-3 flex justify-between w-full"
        @click="closeGenderFilter"
      >
        <h3 class="text-md mr-3">
          {{ $t("landing.gender") }}
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 ml-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </header>
      <hr />
      <main class="my-8 flex flex-col items-center justify-center">
        <span class="male mx-2 my-4">
          <customized-radio-button
            for="mobilemale"
            :label="maleLabel"
            name="gender"
            value="male"
          ></customized-radio-button>
        </span>
        <span class="female mx-2 my-4">
          <customized-radio-button
            for="mobilefemale"
            value="female"
            :label="femaleLabel"
            name="gender"
          ></customized-radio-button>
        </span>
        <span class="both mx-2 my-4">
          <customized-radio-button
            for="mobileboth"
            :label="bothLabel"
            name="gender"
            value="both"
          ></customized-radio-button>
        </span>
      </main>
      <footer class="fixed bottom-5">
        <mobile-filter-buttons></mobile-filter-buttons>
      </footer>
    </div>
  </transition>
</template>

<script>
import CustomizedRadioButton from "../utilities/CustomizedRadioButton.vue";
import MobileFilterButtons from "./MobileFilterButtons.vue";
export default {
  components: { MobileFilterButtons, CustomizedRadioButton },
  props: ["isOpen"],
  emits: ["close"],
  methods: {
    closeGenderFilter() {
      this.$emit("close");
    }
  },
  computed: {
    femaleLabel() {
      return this.$t("landing.female");
    },
    maleLabel() {
      return this.$t("landing.male");
    },
    bothLabel() {
      return this.$t("landing.both");
    }
  }
};
</script>

<style scoped>
.mobile-gender-container {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000000;
}
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
  border: 1px solid #2196f3;
  box-shadow: 0 5px 25px rgb(0 40 117 / 12%);
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
  background: rgb(33, 150, 243);
}

.scale-enter-active {
  animation: scale-up 0.3s ease-out;
}
.scale-leave-active {
  animation: scale-up reverse 0.3s ease-out;
}
@keyframes scale-up {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
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
