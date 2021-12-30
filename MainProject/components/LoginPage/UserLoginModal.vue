<template>
  <div id="my-modal" class="modal modal-open" v-if="show">
    <div class="modal-box">
      <header class="w-full relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 absolute right-3 top-1/3 text-red-600 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
          @click="emitClose"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
        <h3
          class="
            text-center text-base
            py-2
            text-gray-600
            border-b border-gray-200
          "
        >
          {{ $t("login.customer") }}
        </h3>
      </header>
      <div class="login-section w-full">
        <login-cellphone
          class="login-cell w-11/12"
          v-if="!getOtp"
          @getNumber="setNumber"
          :error="errors"
          :num="loginData.cellphone"
        ></login-cellphone>
        <enter-otp
          v-if="getOtp"
          :number="loginData.cellphone"
          :error="errors"
          @getToken="setToken"
          @editedNumber="change"
          @sendOtpAgain="sendOtpReq"
          ref="otpForm"
        ></enter-otp>
        <div class="modal-action">Login</div>
      </div>
    </div>
  </div>
  <!-- <div
    class="
      modal-container
      shadow-md
      w-full
      md:w-1/3
      bg-purple-50
      rounded-md
      md:h-3/4
      h-full
      fixed
      top-1/2
      right-1/2
      transform
      translate-x-1/2
      -translate-y-1/2
    "
    v-if="show"
  >
    <header class="w-full relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 absolute right-3 top-1/3 text-red-600 cursor-pointer"
        viewBox="0 0 20 20"
        fill="currentColor"
        @click="emitClose"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
      <h3
        class="
          text-center text-base
          py-2
          text-gray-600
          border-b border-gray-200
        "
      >
        {{ $t("login.customer") }}
      </h3>
    </header>
    <main class="main-section">
      <div class="logo-container my-5 flex items-center justify-center">
        <img src="/HiTalki-Logo.png" alt="Hitalki Logo" class="w-1/3" />
      </div>
      <div class="login-section w-full">
        <login-cellphone
          class="login-cell w-11/12"
          v-if="!getOtp"
          @getNumber="setNumber"
          :error="errors"
          :num="loginData.cellphone"
        ></login-cellphone>
        <enter-otp
          v-if="getOtp"
          :number="loginData.cellphone"
          :error="errors"
          @getToken="setToken"
          @editedNumber="change"
          @sendOtpAgain="sendOtpReq"
          ref="otpForm"
        ></enter-otp>
      </div>
    </main>
    <loading-spinner :isLoading="isLoading"></loading-spinner>
  </div> -->
</template>

<script>
import LoginCellphone from "./LoginCellphone.vue";
import EnterOtp from "./EnterOtp.vue";
export default {
  components: {
    LoginCellphone,
    EnterOtp,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  head() {
    return {
      bodyAttrs: {
        class: "inset-0 fixed overflow-hidden",
      },
    };
  },
  emits: ["closeModal", "sendReq"],
  data() {
    return {
      isLoading: false,
      getOtp: false,
      loginData: {
        cellphone: "",
        code: null,
        role: "customer",
      },
      errors: {
        token: null,
        number: null,
      },
    };
  },
  methods: {
    emitClose() {
      this.$emit("closeModal");
    },
    change() {
      this.getOtp = false;
    },
    convertNumbers2English(number) {
      return number.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (c) {
        return c.charCodeAt(0) & 0xf;
      });
    },
    async setNumber(number) {
      this.loginData.cellphone = this.convertNumbers2English(number);
      await this.sendOtpReq();
    },
    async setToken(token) {
      this.loginData.code = this.convertNumbers2English(token);
      await this.sendLoginReq();
    },
    async sendOtpReq() {
      this.isLoading = true;
      try {
        const response = await this.$repositories.getUserOtp.getOtp(
          this.loginData.cellphone
        );
        if (response.status == 200) {
          this.getOtp = true;
        }
      } catch (error) {
        this.errors.number = error.response.data.message;
      }
      this.isLoading = false;
    },
    async sendLoginReq() {
      this.isLoading = true;
      try {
        // Send login req with entered otp code to api
        const response = await this.$auth.loginWith("cookie", {
          data: this.loginData,
        });
        // Split the token from the string
        const splitToken = response.data.data.token.split("|");
        // Set token to cookies
        await this.$auth.$storage.setCookie("_token.cookie", splitToken[1]);
        const user = await this.$repositories.getCustomerMe.getCustomerMe();
        this.$auth.setUser(user.data);
        this.$emit("sendReq");
        this.emitClose();
      } catch (error) {
        this.errors.token = error.response.data.message;
        this.$refs.otpForm.resetInputs();
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.modal-container {
  z-index: 1000;
}
.login-section {
  margin-top: 20%;
}
.login-cell /deep/ .number-container {
  position: relative;
}

.login-cell /deep/ .submit-button {
  padding: 0.5rem 0;
}
</style>
