<template>
  <div class="otp-container flex flex-col justify-center items-center">
    <span class="entered-number text-sm text-gray-500 text-center mb-4">
      <p>{{ $t("login.enterednumber") }}</p>
      <span
        class="flex items-center cursor-pointer hover:text-blue-500"
        @click="editNumber"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
          />
        </svg>
        <p>
          {{ number }}
        </p>
      </span>
    </span>
    <form class="flex flex-col items-center w-2/3 sm:w-full" @submit.prevent>
      <div
        class="otp-container flex items-center justify-center w-5/6 md:w-2/3"
      >
        <span
          class="
            otp-icon-container
            rounded
            flex flex-row-reverse
            items-center
            justify-center
            w-11/12
            sm:w-3/4
            py-1
            relative
          "
        >
          <input
            type="number"
            ref="firstInput"
            class="single-input outline-none text-center text-gray-600"
            maxlength="1"
            @input="nextInput"
            @keydown.enter="sendToken"
            @keydown.backspace="prevInput"
            v-model="input1"
            pattern="\d{1}"
          />
          <input
            type="number"
            class="single-input outline-none text-center text-gray-600"
            maxlength="1"
            @input="nextInput"
            @keydown.enter="sendToken"
            @keydown.backspace="prevInput"
            v-model="input2"
            pattern="\d{1}"
          />
          <input
            type="number"
            class="single-input outline-none text-center text-gray-600"
            maxlength="1"
            @input="nextInput"
            @keydown.enter="sendToken"
            @keydown.backspace="prevInput"
            v-model="input3"
            pattern="\d{1}"
          />
          <input
            type="number"
            class="single-input outline-none text-center text-gray-600"
            maxlength="1"
            @keydown.enter="sendToken"
            @keydown.backspace="prevInput"
            @input="sendToken"
            v-model="input4"
            pattern="\d{1}"
          />
        </span>
      </div>
      <show-errors :error="error" class="mt-4"></show-errors>
    </form>
    <button
      type="button"
      ref="submitButton"
      class="submit-button text-white my-4 py-1 bg-primary rounded-md"
      :disabled="isButtonDisabled"
      @click="sendToken"
    >
      {{ $t("login.login") }}
    </button>
    <div class="send-again-count flex text-gray-600" v-if="countDown > 0">
      <p>{{ $t("login.sendagaincount") }}</p>
      <p class="mx-2">{{ this.countDown }}</p>
      <p>{{ $t("login.second") }}</p>
    </div>
    <div class="send-again" v-else>
      <p
        class="text-blue-500 cursor-pointefocusr underline"
        @click="sendOtpAgain"
      >
        {{ $t("login.sendagain") }}
      </p>
    </div>
  </div>
</template>
<script>
import ShowErrors from "../utilities/ShowErrors.vue";
export default {
  components: { ShowErrors },
  props: ["number", "error"],
  emits: ["getToken", "sendOtpAgain", "editedNumber"],
  mounted() {
    this.$refs.firstInput.focus();
    this.enteredNumber = this.number;
  },
  watch: {
    countDown: {
      immediate: true, // This ensures the watcher is triggered upon creation

      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.countDown--;
          }, 1000);
        }
      },
    },
  },
  data() {
    return {
      enteredNumber: null,
      isFocused: false,
      input1: null,
      input2: null,
      input3: null,
      input4: null,

      token: null,
      countDown: 60,
    };
  },
  methods: {
    nextInput(event) {
      if (event.target.value.length === 1 && event.target.nextElementSibling) {
        event.target.nextElementSibling.focus();
      }
    },
    prevInput(event) {
      if (event.target.previousElementSibling) {
        event.target.previousElementSibling.focus();
      }
    },
    changeFocusToTrue() {
      this.isFocused = true;
    },
    changeFocusToFalse() {
      if (this.token.length == 0) {
        this.isFocused = false;
      }
    },

    setNewNumber() {
      this.$emit("editedNumber", this.enteredNumber);
    },
    editNumber() {
      this.$emit("editedNumber", this.enteredNumber);
    },
    sendToken() {
      this.token = this.input1 + this.input2 + this.input3 + this.input4;
      if (this.token.length == 4) {
        this.$emit("getToken", this.token);
      }
    },
    resetInputs() {
      this.input1 = null;
      this.input2 = null;
      this.input3 = null;
      this.input4 = null;
      this.token = null;
      this.$refs.firstInput.focus();
    },

    sendOtpAgain() {
      this.resetInputs();
      this.$emit("sendOtpAgain");
      this.countDown = 120;
      this.$refs.firstInput.focus();
    },
  },
  computed: {
    isButtonDisabled() {
      // Check if all inputs has been entered
      if (!this.token || this.token.length < 4) {
        return true;
      } else {
        return false;
      }
    },
    otpInputPlaceHolder() {
      return this.$t("login.enterotp");
    },
  },
};
</script>

<style scoped>
.single-input {
  width: 1rem;
  border-bottom: 1px solid black;
  margin: 0 0.3rem;
  background-color: transparent;
}

.edit-number-input {
  border: 1px solid rgb(0, 174, 255);
}
.otp-input::-webkit-input-placeholder {
  text-align: right;
}
.otp-input:-moz-placeholder {
  text-align: right;
}
.submit-button:disabled {
  cursor: initial;
}
.submit-button {
  transition: all 0.1s;
  width: 40%;
}
.single-input,
.single-input::-webkit-outer-spin-button,
.single-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: textfield;
}
</style>
