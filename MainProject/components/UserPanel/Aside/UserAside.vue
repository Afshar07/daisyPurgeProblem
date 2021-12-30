<template>
  <aside
    class="
      desktop-sidebar
      md:h-screen
      w-full
      m-0
      md:w-11/12 md:mt-5 md:mx-3 md:rounded-t-lg
      bg-white
      items-start
      flex flex-col
    "
  >
    <header
      class="shadow-md flex items-center justify-end w-full py-1 md:hidden"
    >
      <button type="button" class="ml-2 m-1" @click="closeSidebar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-red-600 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </header>
    <div
      class="
        avatar-section
        w-full
        flex flex-col
        justify-center
        items-center
        mb-2
      "
    >
      <a
        href="/user/avatar"
        class="relative flex items-center justify-center md:block"
      >
        <img
          :src="userAvatar"
          :class="rejectedAvatarPicClass"
          alt="User Avatar"
          class="w-36 md:h-auto lg:w-48 rounded-md mt-4"
        />
        <p
          v-if="userDetails.new_avatar"
          class="
            text-xs
            bg-yellow-600
            text-yellow-50
            absolute
            px-1
            bottom-1
            left-1
            rounded-md
          "
        >
          {{ $t("badge.pending") }}
        </p>
      </a>
      <p
        class="text-xs mx-2 px-1 text-center my-4 text-red-600"
        v-if="userDetails.new_avatar == '0'"
      >
        {{ $t("pro.rejectedavatar") }}
      </p>
      <p class="text-gray-800 mt-2 mx-2 px-1 text-center">{{ usersName }}</p>
    </div>
    <aside-links @closeSidebar="closeSidebar"></aside-links>
    <span class="mt-auto md:hidden w-full flex items-center justify-center">
      <button
        @click="logout"
        type="button"
        class="w-full m-3 px-4 py-1 text-white rounded-md bg-primary"
      >
        {{ $t("login.logout") }}
      </button>
    </span>
  </aside>
</template>

<script>
import AsideLinks from "./AsideLinks.vue";
export default {
  middleware: "auth",
  components: { AsideLinks },
  emits: ["closeSidebar"],
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
  watch: {
    "$auth.user": {
      immediate: true,
      handler() {
        this.userDetails = this.$auth.user;
      },
    },
  },
  head() {
    return {
      bodyAttrs: {
        class: this.isSidebarOpen ? "inset-0 fixed overflow-hidden" : "",
      },
    };
  },
  data() {
    return {
      userDetails: {
        new_avatar: null,
      },
    };
  },
  methods: {
    closeSidebar() {
      this.$emit("closeSidebar");
    },
    async logout() {
      await this.$auth.logout();
    },
  },
  computed: {
    userAvatar() {
      if (this.userDetails.new_avatar) {
        return this.userDetails.new_avatar;
      } else if (!this.userDetails.new_avatar && this.userDetails.avatar) {
        return this.userDetails.avatar;
      } else if (!this.userDetails.new_avatar && !this.userDetails.avatar) {
        return "/no-avatar.jpeg";
      }
    },
    rejectedAvatarPicClass() {
      if (this.userDetails.new_avatar == "0") {
        return "rejected-avatar";
      }
    },
    usersName() {
      if (this.userDetails.name) {
        return this.userDetails.name;
      } else {
        return this.$t("aside.emptystate");
      }
    },
  },
};
</script>
<style scoped>
@media only screen and (max-width: 768px) {
  .desktop-sidebar {
    height: 100%;
  }
}
.rejected-avatar {
  box-shadow: 0px 0px 8px 1px rgb(194, 0, 0);
}
.desktop-sidebar {
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
}
</style>
