<template>
  <div class="page-layout-container relative">
    <div class="overlay" v-if="modalActiveState" @click="closeModal"></div>
    <!-- Pro Header -->
    <div class="menu-overlay" v-if="menuOpenState"></div>
    <div class="w-full content-container flex mt-20 sm:mt-28 md:mt-0">
      <div class="aside w-0 hidden md:block md:w-1/4 relative">
        <!-- Pro Aside -->
      </div>
      <!-- The Sidebar -->
      <Nuxt />
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from "../components/BaseComponents/TheFooter.vue";
import { mapGetters } from "vuex";

export default {
  middleware: "auth",
  async fetch() {
    const userDetails = await this.$repositories.getProData.getProData();
    await this.$auth.setUser(userDetails.data);
  },
  components: { TheFooter },
  data() {
    return {
      sideBarActive: false,
    };
  },
  methods: {
    openSidebar() {
      this.sideBarActive = true;
      this.$store.dispatch("modalState/setIsModalActive", true);
    },
    closeModal() {
      this.$store.dispatch("modalState/setIsModalActive", false);
      this.closeSidebar();
    },
    closeSidebar() {
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
    ...mapGetters("modalState", ["getIsModalActive", "getIsMenuOpen"]),
  },
};
</script>

<style scoped>
.navigation-bar {
  top: 0;
  z-index: 995;
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
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #5a5a5aa6;
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
/* Set margin at different BreakPoints to display the sidebar after header */
@media only screen and (min-width: 768px) {
  .content-container {
    margin-top: 4.55rem;
  }
  .pro-aside {
    top: 4.55rem;
  }
}
@media only screen and (min-width: 810px) {
  .content-container {
    margin-top: 4.6rem;
  }
  .pro-aside {
    top: 4.6rem;
  }
}
@media only screen and (min-width: 830px) {
  .content-container {
    margin-top: 4.7rem;
  }
  .pro-aside {
    top: 4.7rem;
  }
}
@media only screen and (min-width: 850px) {
  .content-container {
    margin-top: 4.8rem;
  }
  .pro-aside {
    top: 4.8rem;
  }
}
@media only screen and (min-width: 880px) {
  .content-container {
    margin-top: 4.9rem;
  }
  .pro-aside {
    top: 4.9rem;
  }
}
@media only screen and (min-width: 900px) {
  .content-container {
    margin-top: 5rem;
  }
  .pro-aside {
    top: 5rem;
  }
}
@media only screen and (min-width: 950px) {
  .content-container {
    margin-top: 5.1rem;
  }
  .pro-aside {
    top: 5.1rem;
  }
}
@media only screen and (min-width: 985px) {
  .content-container {
    margin-top: 5.19rem;
  }
  .pro-aside {
    top: 5.19rem;
  }
}
</style>
