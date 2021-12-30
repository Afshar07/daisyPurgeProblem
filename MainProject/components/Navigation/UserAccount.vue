<template>
  <div
    class="
      user-account-container
      w-80
      bg-white
      shadow-lg
      ring-1 ring-gray-700 ring-opacity-20
      rounded-md
      text-gray-700
      py-4
      grid grid-cols-2
    "
  >
    <div
      class="
        flex flex-col
        items-center
        border-l border-opacity-70 border-gray-300
      "
    >
      <a href="/user/avatar">
        <img
          :src="userAvatar"
          alt="User's Avatar Picture"
          class="avatar w-20"
        />
      </a>
      <a
        href="/user/personal-information"
        target="blank"
        class="mt-3 cursor-pointer text-xs"
      >
        {{ userName }}
      </a>
    </div>
    <div class="flex flex-col items-start justify-center w-full">
      <span
        class="
          flex
          items-center
          cursor-pointer
          hover:text-gray-600
          text-sm
          w-full
          p-2
          my-1
          hover:bg-blue-200
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
          />
        </svg>
        <a href="/user/dashboard">
          {{ $t("pro.dashboard") }}
        </a>
      </span>
      <span
        class="
          flex
          items-center
          cursor-pointer
          hover:text-gray-600
          text-sm
          w-full
          p-2
          my-1
          hover:bg-blue-200
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fill-rule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clip-rule="evenodd"
          />
        </svg>
        <a href="/user/my-classes">
          {{ $t("pro.myclass") }}
        </a>
      </span>
      <span
        class="
          flex
          items-center
          cursor-pointer
          hover:text-gray-600
          text-sm
          w-full
          p-2
          my-1
          hover:bg-blue-200
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
          />
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
            clip-rule="evenodd"
          />
        </svg>
        <a href="/user/wallet">
          {{ $t("wallet.title") }}
        </a>
      </span>
      <button
        type="button"
        class="
          px-2
          py-1
          my-2
          mr-2
          rounded-md
          bg-red-500
          hover:bg-red-600
          text-white text-sm
        "
        @click="logout"
      >
        {{ $t("login.logout") }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userDetails: this.$auth.user,
    };
  },
  watch: {
    "$auth.user": {
      immediate: true,
      handler() {
        this.userDetails = this.$auth.user;
      },
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
  computed: {
    userName() {
      if (this.userDetails) {
        return this.userDetails.name;
      }
    },
    userAvatar() {
      if (this.userDetails) {
        if (this.userDetails.new_avatar) {
          return this.userDetails.new_avatar;
        } else if (!this.userDetails.new_avatar && this.userDetails.avatar) {
          return this.userDetails.avatar;
        } else if (!this.userDetails.new_avatar && !this.userDetails.avatar) {
          return "/no-avatar.jpeg";
        }
      }
    },
  },
};
</script>

<style scoped>
.avatar {
  clip-path: circle();
}
</style>
