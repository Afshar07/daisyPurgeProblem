<template>
  <div class="relative bg-gray-100">
    <!-- <div class="overlay" v-if="modalActiveState" @click="closeModal"></div> -->
    <div
      class="overlay top-0 right-0 fixed md:hidden"
      v-show="sideBarActive"
      @click="closeSidebar"
    ></div>
    <div class="w-full flex items-center justify-center">
      <user-header
        ref="header"
        class="navigation-bar mx-auto"
        @toggle-sidebar="openSidebar"
      ></user-header>
    </div>
    <div class="w-full content-container flex mt-1 md:mt-0">
      <transition name="sidebar">
        <div
          class="aside fixed h-full w-5/6 top-0 md:relative md:block md:w-1/4"
          :class="isSidebarActive"
        >
          <user-aside
            class="user-aside"
            @closeSidebar="closeSidebar"
            :isSidebarOpen="sideBarActive"
          ></user-aside>
        </div>
      </transition>
      <Nuxt />
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import UserHeader from "../components/UserPanel/UserHeader.vue";
import TheFooter from "../components/BaseComponents/TheFooter.vue";
import UserAside from "../components/UserPanel/Aside/UserAside.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    UserHeader,
    TheFooter,
    UserAside,
  },

  data() {
    return {
      sideBarActive: false,
    };
  },
  methods: {
    closeSidebar() {
      this.sideBarActive = false;
    },
    async openSidebar() {
      this.sideBarActive = true;
    },
    closeModal() {
      this.$store.dispatch("modalState/setIsModalActive", false);
    },
  },
  computed: {
    ...mapGetters("modalState", ["getIsModalActive", "getIsMenuOpen"]),
    ...mapGetters("headerPosition", ["getHeaderPosition"]),
    headerPosition() {
      return this.getHeaderPosition;
    },
    modalActiveState() {
      return this.getIsModalActive;
    },
    isSidebarActive() {
      if (this.sideBarActive) {
        return "active-sidebar";
      }
    },
  },
};
</script>

<style scoped>
@media only screen and (min-width: 769px) {
  .navigation-bar {
    top: 0;
    z-index: 995;
    width: 98.2%;
  }
}
@media only screen and (max-width: 768px) {
  .navigation-bar {
    top: 0;
    z-index: 995;
    width: 90%;
  }
  .aside {
    margin: 0;
    right: -130%;
    z-index: 10000000000;
  }
  .active-sidebar {
    /* width: 100% !important; */
    display: block;
    margin: 0;
    position: fixed;
    z-index: 10000000000;
    right: 0;
  }
}
.sidebar {
  transition: all 0.3s;
}
.aside {
  transition: all 0.3s;
}
.sidebar-enter-active {
  animation: slide-down 0.3s ease-in;
}

@keyframes slide-down {
  from {
    right: -130%;
  }
  to {
    right: 0;
  }
}
</style>
