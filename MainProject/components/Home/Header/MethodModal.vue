<template>
  <div class="main-container">
    <div class="modal modal-open">
      <div class="modal-box">
        <section class="header flex items-center">
          <svg
            @click="emitCloseModal"
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
          <h4 class="mr-3 text-tertiary">
            {{ $t("header.modaltitle") }}
          </h4>
        </section>
        <hr class="mb-3" />
        <ul>
          <li
            v-for="item in classMethods"
            :key="item.method"
            :ref="item.method"
            class="
              flex
              items-center
              my-4
              cursor-pointer
              py-3
              px-1
              rounded-lg
              hover:bg-gray-100
            "
            @click="setMethod(item.method)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-600 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["closeModal", "getMethod"],
  data() {
    return {
      classMethods: [
        {
          title: this.$t("header.onlineteach"),
          method: "online",
        },
        {
          title: this.$t("header.inpersonteach"),
          method: "inperson",
        },
      ],
    };
  },
  head() {
    return {
      bodyAttrs: {
        class: "inset-0 fixed overflow-hidden",
      },
    };
  },
  methods: {
    emitCloseModal() {
      this.$emit("closeModal");
    },
    setMethod(method) {
      this.$emit("getMethod", method);
    },
  },
};
</script>
