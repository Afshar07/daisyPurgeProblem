<template>
  <nav
    class="
      flex flex-wrap
      justify-between
      w-full
      items-center
      px-1
      md:px-5
      pb-3
      pt-5
    "
    :class="isNavTransparent"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-10 w-10 md:hidden justify-self-start"
      @click="toggleSidebar"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
    <div class="right-section justify-self-start w-1/3 flex items-center">
      <div
        class="
          hidden
          md:flex
          flex-col
          relative
          w-2/6
          justify-center
          items-center
          h-10
        "
        @mouseenter="langHoverTrue"
        @mouseleave="langHoverFalse"
      >
        <div
          class="
            langs-container
            flex
            items-center
            cursor-pointer
            px-2
            py-1
            rounded-lg
          "
        >
          <p class="langs">{{ $t("nav.langs") }}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <transition name="header-lang">
          <div class="all-langs absolute bg-white rounded" v-show="isLangHover">
            <header-langs class="text-black"></header-langs>
          </div>
        </transition>
      </div>
      <a
        href="/apply-to-teach"
        target="_blank"
        class="langs-container px-2 py-1 rounded-lg hidden md:block"
      >
        {{ $t("nav.applypro") }}
      </a>
    </div>
    <div
      class="
        logo-container
        w-1/3
        justify-self-end
        md:justify-self-center
        flex
        justify-end
        md:justify-center
        items-center
      "
    >
      <a
        href="/"
        class="
          text-center
          flex
          items-center
          justify-end
          md:justify-center
          text-lg
        "
      >
        <img
          src="/HiTalki-Logo.png"
          alt="HiTalki Logo"
          class="w-9/12 md:w-1/2"
        />
      </a>
    </div>

    <div class="left-section w-1/3 hidden md:flex justify-self-end justify-end">
      <button
        type="button"
        class="border p-2 rounded-md cursor-pointer"
        @click="userLogin"
        v-show="!isLoggedIn"
      >
        {{ $t("login.signuplogin") }}
      </button>
      <div
        v-show="isLoggedIn"
        class="relative"
        @mouseenter="accountHoverTrue"
        @mouseleave="accountHoverFalse"
      >
        <p class="border p-2 rounded-md cursor-pointer">
          {{ $t("login.account") }}
        </p>
        <div
          class="user-details absolute w-full left-40 transform translate-x-1/2"
          v-show="renderUserDashboard"
        >
          <user-account></user-account>
        </div>
      </div>
    </div>
    <user-login-modal
      :show="renderLoginModal"
      @closeModal="closeLoginModal"
    ></user-login-modal>
  </nav>
</template>

<script>
import HeaderLangs from "../Navigation/HeaderLangs.vue";
import userLoginModal from "../LoginPage/UserLoginModal.vue";
import UserAccount from "../Navigation/UserAccount.vue";
export default {
  components: {
    HeaderLangs,
    userLoginModal,
    UserAccount,
  },
  emits: ["toggle-sidebar"],
  fetchOnServer() {
    // return this.$nuxt.$getSsr(process.env.SSR);
    return false;
  },
  async fetch() {
    try {
      const response = await this.$repositories.getCustomerMe.getCustomerMe();
      this.$auth.setUser(response.data);
    } catch (error) {
      return;
    }
  },
  watch: {
    $route: {
      async handler() {
        await this.$fetch();
      },
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      isLangHover: false,
      transparentNav: true,
      renderLoginModal: false,
      renderUserDashboard: false,
    };
  },
  methods: {
    langHoverTrue() {
      this.isLangHover = true;
      this.$store.dispatch("modalState/setIsMenuOpen", true);
    },
    langHoverFalse() {
      this.isLangHover = false;
      this.$store.dispatch("modalState/setIsMenuOpen", false);
    },
    accountHoverTrue() {
      this.$store.dispatch("modalState/setIsMenuOpen", true);
      this.renderUserDashboard = true;
    },
    accountHoverFalse() {
      this.$store.dispatch("modalState/setIsMenuOpen", false);
      this.renderUserDashboard = false;
    },
    handleScroll() {
      if (window.scrollY < 150) {
        this.transparentNav = true;
      } else {
        this.transparentNav = false;
      }
    },
    toggleSidebar() {
      this.$emit("toggle-sidebar");
    },
    userLogin() {
      this.renderLoginModal = true;
    },
    closeLoginModal() {
      this.renderLoginModal = false;
    },
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn;
    },
    isNavTransparent() {
      return [
        this.transparentNav ? "transparent-navbar text-white" : "normal-navbar",
      ];
    },
  },
};
</script>

<style scoped>
.all-langs {
  top: 2.5rem;
  right: 0.3rem;
  z-index: 200;
  width: 40rem;
  box-shadow: 0px 0px 28px -24px rgba(0, 0, 0, 0.829);
}
.langs-container {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.2) 35%,
    rgba(235, 235, 235, 0.2) 100%
  );
}
.navbar {
  z-index: 999;
}
.transparent-navbar {
  background-color: rgba(0, 0, 0, 0.205);
}
.normal-navbar {
  background-color: rgba(255, 255, 255, 0.8) !important;
}
.header-lang-enter-active {
  animation: fade-in 0.28s ease-in;
}
.header-lang-leave-active {
  animation: fade-out 0.2s ease-in;
}

.user-details {
  top: 104%;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
