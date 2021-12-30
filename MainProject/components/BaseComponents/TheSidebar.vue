<template>
  <div
    class="
      sidebar-container
      overflow-hidden
      flex flex-col
      w-3/4
      bg-secondary
      overflow-y-scroll
    "
  >
    <header class="flex justify-start items-center px-6 py-3 mb-4">
      <svg
        @click="toggleSidebar"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </header>
    <div class="main-section m-4">
      <div class="pb-4">
        <div
          class="nav-item flex items-center justify-between text-tertiary"
          @click="toggleShowLangs"
        >
          <p class="text-lg">{{ $t("nav.langs") }}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-sm lang-arrow"
            :class="rotateArrow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <transition-group tag="div" name="lang-list">
          <lang-list v-if="showLangs" :key="1"></lang-list>
        </transition-group>
      </div>
    </div>
    <footer
      class="
        justify-self-end
        flex
        mt-auto
        flex-col
        justify-center
        items-center
        pb-3
      "
    >
      <a
        href="/user/login"
        v-if="!isLoggedIn"
        class="
          sidebar-button
          text-center
          bg-primary
          text-secondary
          my-1
          py-1
          rounded-lg
        "
      >
        {{ $t("login.signuplogin") }}
      </a>
      <a
        href="/apply-to-teach"
        target="_blank"
        class="
          sidebar-button
          text-center
          bg-primary
          text-secondary
          my-1
          py-1
          rounded-lg
        "
      >
        {{ $t("nav.applypro") }}
      </a>
      <a
        class="
          sidebar-button
          my-1
          text-primary
          text-center
          ring-1 ring-primary
          py-1
          rounded-lg
        "
        :href="redirectToProPanel"
        v-if="!isLoggedIn"
      >
        {{ $t("login.prologin") }}
      </a>
      <a
        href="/user/dashboard"
        v-if="isLoggedIn"
        class="
          sidebar-button
          text-center
          bg-primary
          text-secondary
          my-1
          py-1
          rounded-lg
        "
      >
        {{ $t("login.account") }}
      </a>
      <a
        :href="redirectToProPanel"
        v-if="isLoggedIn"
        class="
          sidebar-button
          my-1
          text-primary text-center
          ring-1 ring-primary
          py-1
          rounded-lg
        "
      >
        {{ $t("login.prologin") }}
      </a>
      <button
        @click="logout"
        type="button"
        v-if="isLoggedIn"
        :href="redirectToProPanel"
        class="
          sidebar-button
          my-1
          text-primary text-center
          ring-1 ring-primary
          py-1
          rounded-lg
        "
      >
        {{ $t("login.logout") }}
      </button>
    </footer>
  </div>
</template>

<script>
import LangList from "../Home/Sidebar/LangList.vue";
export default {
  components: { LangList },
  emits: ["toggle-sidebar"],
  props: {
    // Add isSidebarOpen props
    // Just to handle Body attrs,
    // It's got nothing to do with any logic in
    // This component, except the head tag
    isSidebarOpen: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      showLangs: false,
    };
  },
  head() {
    return {
      bodyAttrs: {
        class: this.isSidebarOpen ? "inset-0 fixed overflow-hidden" : "",
      },
    };
  },
  methods: {

    toggleSidebar() {
      this.$emit("toggle-sidebar");
    },
    toggleShowLangs() {
      this.showLangs = !this.showLangs;
    },
    async logout() {
      await this.$auth.logout();
    },
  },
  computed: {
    redirectToProPanel() {
      return `${process.env.PRO_PANEL}/`;
    },
    isLoggedIn() {
      return this.$auth.loggedIn;
    },
    rotateArrow() {
      return { "lang-open": this.showLangs };
    },
    adminPanelLogin() {
      return `${process.env.PRO_PANEL}/login`;
    },
  },
};
</script>
<style scoped>
.sidebar-container {
  min-height: 100%;
  height: 100%;
  max-height: 100%;
}
.sidebar-button {
  min-width: 80% !important;
}
.lang-arrow {
  transition: all 0.3s;
}
.lang-open {
  transform: rotate(-90deg);
}
.lang-list-enter-active {
  animation: fade-in 0.3s ease-out;
}
.lang-list-leave-active {
  animation: fade-out 0.3s ease-out;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
</style>
