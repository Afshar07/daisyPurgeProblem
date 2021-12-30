<template>
  <div class="main-page-container w-full relative">
    <!-- Load header section component -->
    <header-section></header-section>
    <main>
      <!-- Load lang card swiper component -->
      <lang-card></lang-card>
      <!-- Load Instructions component -->
      <how-hitalki-works></how-hitalki-works>
      <!-- Load Why Hitalki component -->
      <why-hitalki></why-hitalki>
      <!-- Load International Tests component -->
      <international-tests></international-tests>
      <become-teacher ctaLink="/apply-to-teach"></become-teacher>
    </main>
  </div>
</template>

<script>
import HeaderSection from "../components/Home/Header/HeaderSection.vue";
import LangCard from "../components/Home/Main/LangCard.vue";
import HowHitalkiWorks from "../components/Home/Main/HowHitalkiWorks.vue";
import WhyHitalki from "../components/Home/Main/WhyHitalki.vue";
import InternationalTests from "../components/Home/Main/InternationalTests.vue";
import BecomeTeacher from "../components/Home/Main/BecomeTeacher.vue";
export default {
  components: {
    HeaderSection,
    LangCard,
    HowHitalkiWorks,
    WhyHitalki,
    InternationalTests,
    BecomeTeacher,
  },
  async fetch() {
    const response = await this.$repositories.getCategories.getCategories();
    this.$store.dispatch("categories/setCategoriesList", response.data);
  },
  head() {
    return {
      title: this.$t("main.title"),
    };
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
