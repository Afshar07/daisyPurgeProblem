<template>
  <div class="mx-2 grid grid-cols-6 md:w-5/6">
    <div class="col-start-1 col-end-3">
      <p class="font-bold" v-if="userDetails.pro_type">
        {{ $t("technical.type") }}
      </p>
      <p
        class="font-bold"
        v-if="userDetails.categories && userDetails.categories.length > 0"
      >
        {{ $t("procard.speciality") }}
      </p>
      <p
        class="font-bold"
        v-if="
          userDetails.other_language_skills &&
          userDetails.other_language_skills.length > 0
        "
      >
        {{ $t("procard.speaking") }}
      </p>
      <p
        class="font-bold"
        v-if="userDetails.age_groups && userDetails.age_groups.length > 0"
      >
        {{ $t("technical.levels") }}
      </p>
      <p class="font-bold">
        {{ $t("technical.classtype") }}
      </p>
    </div>
    <div class="col-start-3 col-end-7">
      <p v-if="userDetails.pro_type">
        {{ $t(`technical.${userDetails.pro_type}`) }}
      </p>
      <div
        class="flex items-center justify-start"
        v-if="userDetails.categories && userDetails.categories.length > 0"
      >
        <p
          v-for="cat in categoriesList"
          :key="cat.id"
          class="speciality flex items-center ml-2"
          :class="skillsOverflowClass"
        >
          {{ cat.title }}
        </p>
      </div>
      <div
        class="flex items-center justify-start overflow-ellipsis"
        v-if="
          userDetails.other_language_skills &&
          userDetails.other_language_skills.length > 0
        "
      >
        <p
          class="speaking-lang flex items-center ml-2"
          :class="otherLangsOverflowClass"
          v-for="lang in otherLangs"
          :key="lang.id"
        >
          {{ lang.title }}
        </p>
      </div>
      <div
        class="flex items-center justify-start"
        v-if="userDetails.age_groups && userDetails.age_groups.length > 0"
      >
        <p
          class="age flex items-center ml-2"
          v-for="age in userDetails.age_groups"
          :key="age"
        >
          {{ $t(`technical.${age}`) }}
        </p>
      </div>
      <div class="flex items-center">
        <p
          v-if="userDetails.prices.online_prices"
          class="type flex items-center"
        >
          {{ $t("pro.online") }}
        </p>
        <p
          v-if="userDetails.prices.inperson_prices && userDetails.user.city"
          class="mr-2 type"
        >
          {{ $t("pro.inperson") }}
          {{ $t("landing.in") }}
          {{ userDetails.user.city.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userDetails: {
      type: Object,
      required: true,
    },
  },
  computed: {
    otherLangs() {
      if (this.userDetails.other_language_skills.length >= 5) {
        return this.userDetails.other_language_skills.slice(0, 4);
      } else {
        return this.userDetails.other_language_skills;
      }
    },
    categoriesList() {
      if (this.userDetails.categories.length >= 4) {
        return this.userDetails.categories.slice(0, 3);
      } else {
        return this.userDetails.categories;
      }
    },
    otherLangsOverflowClass() {
      if (this.userDetails.other_language_skills.length >= 5) {
        return "overflow-state";
      }
    },
    skillsOverflowClass() {
      if (this.userDetails.categories.length >= 4) {
        return "overflow-state";
      }
    },
  },
};
</script>
<style scoped>
.speaking-lang::after,
.speciality::after,
.age::after,
.type::after {
  content: "،";
}
.speaking-lang:last-of-type::after,
.speciality:last-of-type::after,
.age:last-of-type::after,
.type:last-of-type::after {
  content: "";
}
.overflow-state:last-of-type::after {
  content: "...";
}
</style>
