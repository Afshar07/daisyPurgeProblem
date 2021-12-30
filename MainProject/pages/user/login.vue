<template>
  <div class="first-container fixed w-full h-full flex items-center">
    <div class="overlay fixed w-full h-full" v-show="isLoading"></div>
    <div
      class="
        login-container
        flex flex-col
        bg-gray-200
        md:w-2/5
        w-full
        h-full
        shadow-md
      "
    >
      <img
        src="/HiTalki-Logo.png"
        alt="Hitalki Logo"
        class="w-1/3 self-center mt-10"
      />
      <h1 class="login-title text-center mb-8 text-2xl text-blue-500 font-bold">
        {{ $t("login.customer") }}
      </h1>

      <login-cellphone
        v-if="!getOtp"
        @getNumber="setNumber"
        :error="errors"
        class="error"
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
    <div class="image-container md:w-3/5 h-screen block" :style="bgImage"></div>

    <loading-spinner :isLoading="isLoading"></loading-spinner>
  </div>
</template>

<script>
import LoginCellphone from "../../components/LoginPage/LoginCellphone.vue";
import EnterOtp from "../../components/LoginPage/EnterOtp.vue";
export default {
  layout: "login",
  head() {
    return {
      title: this.$t("login.customer"),
    };
  },
  components: {
    LoginCellphone,
    EnterOtp,
  },
  data() {
    return {
      isLoading: false,
      awaitingReq: false,
      imgNumber: Math.floor(Math.random() * 9) + 1,
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
      if (!this.awaitingReq) {
        await this.sendOtpReq();
      }
    },
    async setToken(token) {
      this.loginData.code = this.convertNumbers2English(token);
      if (!this.awaitingReq) {
        await this.sendLoginReq();
      }
    },
    async sendOtpReq() {
      this.isLoading = true;
      this.awaitingReq = true;

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
      this.awaitingReq = false;
      this.isLoading = false;
    },
    async sendLoginReq() {
      this.awaitingReq = true;
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
        window.location.href = "/user/dashboard";
      } catch (error) {
        this.errors.token = error.response.data.message;
        this.$refs.otpForm.resetInputs();
      }
      this.awaitingReq = false;
      this.isLoading = false;
    },
  },
  computed: {
    bgImage() {
      return { backgroundImage: `url(/${this.imgNumber}-min.jpg)` };
    },
  },
};
</script>
<style scoped>
.image-container {
  background-size: cover;
  background-repeat: no-repeat;
}
.login-title {
  margin-top: 25%;
}
.error /deep/ .error {
  text-align: center;
}
</style>
