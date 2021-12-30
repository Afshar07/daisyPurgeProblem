<template>
  <div class="relative h-full">
    <div class="overlay" v-show="modalActiveState" @click="closeModal"></div>

    <the-header
      class="navigation-bar"
      :class="[headerPosition, navbarPosition]"
      @toggle-sidebar="openSidebar"
    ></the-header>
    <div class="menu-overlay" v-show="menuOpenState"></div>

    <the-sidebar
      class="sidebar h-full fixed"
      :class="showSidebar"
      :isSidebarOpen="sideBarActive"
      @toggle-sidebar="closeSidebar"
    ></the-sidebar>
    <Nuxt />
    <the-footer></the-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheHeader from "../components/BaseComponents/TheHeader.vue";
import TheSidebar from "../components/BaseComponents/TheSidebar.vue";
import TheFooter from "../components/BaseComponents/TheFooter.vue";
export default {
  components: {
    TheHeader,
    TheSidebar,
    TheFooter,
  },
  head() {
    return {
      bodyAttrs: {
        class: this.getIsModalActive ? "inset-0 fixed overflow-hidden" : "",
      },
    };
  },
  watch: {
    sideBarActive(value) {
      if (!value) {
        this.$store.dispatch("modalState/setIsModalActive", false);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  data() {
    return {
      sideBarActive: false,
      showNavbar: true,
      lastScrollPosition: 0,
    };
  },
  methods: {
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
    openSidebar() {
      this.sideBarActive = true;
      this.$store.dispatch("modalState/setIsModalActive", true);
    },
    closeSidebar() {
      this.sideBarActive = false;
      this.$store.dispatch("modalState/setIsModalActive", false);
    },
    closeModal() {
      this.sideBarActive = false;
      this.$store.dispatch("modalState/setIsModalActive", false);
    },
  },
  computed: {
    showSidebar() {
      return { "sidebar-active": this.sideBarActive };
    },
    modalActiveState() {
      return this.getIsModalActive;
    },
    menuOpenState() {
      return this.getIsMenuOpen;
    },
    headerPosition() {
      return this.getHeaderPosition;
    },
    navbarPosition() {
      return { "navigation-bar-hidden": !this.showNavbar };
    },
    ...mapGetters("modalState", ["getIsModalActive", "getIsMenuOpen"]),
    ...mapGetters("headerPosition", ["getHeaderPosition"]),
  },
};
</script>

<style scoped>
.navigation-bar {
  top: 0;
  z-index: 10000;
  transition: all 0.3s;
}
.navigation-bar-hidden {
  transform: translate3d(0, -100%, 0);
}
.sidebar {
  top: 0;
  right: -100%;
  z-index: 10001;
  transition: all 0.3s;
}
.sidebar-active {
  top: 0;
  right: 0 !important;
}
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);
  z-index: 9999;
}
.overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #5a5a5aa6;
  overflow: hidden !important;
}
</style>
