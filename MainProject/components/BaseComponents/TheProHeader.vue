<template>
  <nav
    class="flex flex-wrap w-full items-center px-5 pb-3 pt-5"
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
      <a class="hidden md:block cursor-pointer" :href="redirectToProDashboard">
        {{ $t("login.prologin") }}
      </a>

      <div class="relative w-2/6 justify-center items-center h-10"></div>
    </div>
    <div
      class="
        logo-container
        w-1/3
        justify-self-center
        flex
        justify-end
        items-center
      "
    >
      <a href="/" class="text-center flex items-center justify-center text-lg">
        <img src="/HiTalki-Logo.png" alt="HiTalki Logo" class="md:w-1/2"
      /></a>
    </div>

    <div class="left-section w-1/3 hidden md:flex justify-self-end justify-end">
      <button type="button" @click="logout" class="hover:text-red-500">
        {{ $t("login.logout") }}
      </button>
    </div>
  </nav>
</template>

<script>
import HeaderLangs from "../Navigation/HeaderLangs.vue";
export default {
  components: {
    HeaderLangs,
  },
  emits: ["toggle-sidebar"],
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
    async logout() {
      await this.$auth.logout();
    },
    redirectToProDashboard() {
      return `${process.env.PRO_PANEL}/dashboard`;
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
