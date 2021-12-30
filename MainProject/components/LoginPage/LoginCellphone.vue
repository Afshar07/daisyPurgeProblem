<template>
  <div class="login-container flex flex-col justify-center items-center w-full">
    <form class="flex flex-col items-center w-2/3 sm:w-full" @submit.prevent>
      <div
        class="number-container flex items-center justify-center w-5/6 md:w-2/3"
      >
        <span
          class="
            number-icon-container
            rounded
            flex
            items-center
            justify-end
            bg-white
            w-11/12
            sm:w-3/4
            py-1
            relative
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 number-icon absolute text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            autocomplete="off"
            type="tel"
            :placeholder="numberInputPlaceHolder"
            class="number-input rounded w-11/12 px-2 outline-none text-gray-600"
            dir="ltr"
            pattern="\d{11}"
            maxlength="11"
            inputmode="numeric"
            name="cellphone"
            v-model="number"
            @keydown.enter="sendNumber"
            ref="numberInput"
          />
        </span>
      </div>
    </form>
    <show-errors :error="error"></show-errors>
    <button
      type="button"
      :disabled="isButtonDisabled"
      class="submit-button text-white mt-4 py-1 bg-primary rounded-md"
      @click="sendNumber"
    >
      {{ $t("login.login") }}
    </button>
  </div>
</template>

<script>
import ShowErrors from "../utilities/ShowErrors.vue";

export default {
  props: ["error", "num"],
  components: { ShowErrors },
  emits: ["getNumber"],
  mounted() {
    this.$refs.numberInput.focus();
  },
  watch: {
    number(newVal) {
      let regex = /[^A-Z0-9]/;
      this.number = newVal.replace(regex, "");
    },
  },
  data() {
    return {
      number: this.num,
    };
  },
  methods: {
    sendNumber() {
      if (this.number.length == 11) {
        this.$emit("getNumber", this.number);
      }
    },
  },
  computed: {
    isButtonDisabled() {
      if (this.number.length < 11) {
        return true;
      }
    },
    numberInputPlaceHolder() {
      return this.$t("login.number");
    },
  },
};
</script>

<style scoped>
.number-icon {
  top: 50%;
  right: 2%;
  transform: translateY(-50%);
}
.number-input::-webkit-input-placeholder {
  text-align: right;
}
.number-input:-moz-placeholder {
  text-align: right;
}
.submit-button {
  transition: all 0.1s;
  width: 50%;
}
.submit-button:disabled {
  cursor: initial;
}
</style>
