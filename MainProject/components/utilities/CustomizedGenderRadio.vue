<template>
  <div class="radio-container w-full flex items-center justify-center">
    <label class="button-container ml-3" @click="setMale">
      <input
        type="radio"
        name="genderPick"
        ref="male"
        value="male"
        v-model="gender"
      />
      <span>{{ $t("personalinfo.male") }}</span>

      <span class="checkmark"></span>
    </label>
    <label class="button-container mr-3" @click="setFemale">
      <input
        type="radio"
        name="genderPick"
        ref="female"
        value="female"
        v-model="gender"
      />
      <span>{{ $t("personalinfo.female") }}</span>
      <span class="checkmark"></span>
    </label>
  </div>
</template>

<script>
export default {
  props: ["defaultGender"],
  emits: ["getGender"],
  watch: {
    gender: {
      // Emit the new gender on change
      immediate: true,
      handler() {
        this.emitGender();
      },
    },
    defaultGender: {
      immediate: true,
      handler() {
        this.gender = this.defaultGender;
      },
    },
  },
  data() {
    return {
      gender: this.defaultGender,
    };
  },
  methods: {
    setMale() {
      // Set gender to male
      this.$refs.male.checked = true;
      this.gender = "male";
    },
    setFemale() {
      // Set gender to female
      this.$refs.female.checked = true;
      this.gender = "female";
    },
    emitGender() {
      this.$emit("getGender", this.gender);
    },
  },
};
</script>

<style scoped>
.button-container {
  display: block;
  position: relative;
  padding-right: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.button-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: 0;
  right: 0;
  height: 28px;
  width: 28px;
  background-color: #eee;
  border-radius: 50%;
}
.button-container:hover input ~ .checkmark {
  background-color: #ccc;
}
.button-container input:checked ~ .checkmark {
  background-color: #fff;
  @apply border border-primary;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.button-container input:checked ~ .checkmark:after {
  display: block;
}
.button-container .checkmark:after {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  @apply bg-primary;
}
</style>
