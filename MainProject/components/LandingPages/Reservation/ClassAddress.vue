<template>
  <div class="class-type-container w-full mt-16 md:px-56 overflow-y-auto">
    <header class="w-full">
      <h3 class="text-center">{{ $t("reservation.setaddress") }}</h3>
    </header>
    <main class="my-5">
      <base-textarea
        :required="true"
        @getData="setAddress"
        :defaultData="userAdress"
      >
        <template v-slot:label>
          {{ $t("reservation.address") }}
        </template>
      </base-textarea>
      <base-textarea @getData="setDescription">
        <template v-slot:label>
          {{ $t("reservation.desc") }}
        </template>
      </base-textarea>
    </main>
    <footer class="flex items-center justify-center">
      <button
        type="button"
        class="
          w-full
          text-center
          py-3
          bg-primary
          hover:bg-red-600
          items-center
          justify-center
          rounded-md
          text-white
        "
        :disabled="isButtonDisabled"
        @click="sendData"
      >
        {{ $t("reservation.continue") }}
      </button>
    </footer>
  </div>
</template>

<script>
import BaseTextarea from "../../utilities/BaseTextarea.vue";
export default {
  components: { BaseTextarea },
  emits: ["getAddr"],
  data() {
    return {
      details: {
        address: null,
        description: null,
      },
    };
  },
  methods: {
    setAddress(addr) {
      if (addr != "") {
        this.details.address = addr;
      }
    },
    setDescription(desc) {
      if (desc != "") {
        this.details.description = desc;
      }
    },
    sendData() {
      this.$emit("getAddr", this.details);
    },
  },
  computed: {
    isButtonDisabled() {
      if (this.details.address == null) {
        return true;
      }
    },
    userAdress() {
      if (this.$auth.loggedIn && this.$auth.user.address) {
        return this.$auth.user.address;
      } else {
        return null;
      }
    },
  },
};
</script>
