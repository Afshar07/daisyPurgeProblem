<template>
  <div class="filters-container my-2 w-full flex flex-col items-center bg-transparent">
    <!-- Langs Filter Start -->

    <!-- <filter-container>
      <template v-slot:title>{{ $t("landing.langs") }}</template>
      <template v-slot:content>
        <div class="flex flex-col mx-auto my-2 w-full">
          <searchable-other-langs
            @getTopCat="redirectUser"
          ></searchable-other-langs>
        </div>
      </template>
    </filter-container> -->
    <!-- Has Online Class Filter Start -->

    <filter-container>
      <template v-slot:title>
        {{ $t("technical.classtype") }}
      </template>
      <template v-slot:content>
        <customized-radio-button
          :checked="isOnlineLanding"
          for="online"
          name="classtype"
          value="true"
          @getData="setClassTypeFilter"
        >
          <template v-slot:label>
            {{ $t("header.onlineteach") }}
          </template>
        </customized-radio-button>
        <customized-radio-button
          :checked="isInPersonLanding"
          for="inperson"
          name="classtype"
          value="false"
          @getData="setClassTypeFilter"
        >
          <template v-slot:label>
            {{ $t("header.inpersonteach") }}
            <span v-if="cityName">
              {{ $t("landing.in") }}
              {{ cityName }}
            </span>
          </template>
        </customized-radio-button>
      </template>
    </filter-container>
    <!-- Has Online Class Filter End -->
    <filter-container>
      <template v-slot:title>
        {{ $t("landing.skills") }}
      </template>
    </filter-container>

    <!-- Gender Filter Start -->

    <filter-container>
      <template v-slot:title>
        {{ $t("landing.gender") }}
      </template>
      <template v-slot:content>
        <customized-radio-button
          for="male"
          name="gender"
          value="male"
          @getData="setGenderFilter"
        >
          <template v-slot:label>
            {{ $t("landing.male") }}
          </template>
        </customized-radio-button>
        <customized-radio-button
          for="female"
          name="gender"
          value="female"
          @getData="setGenderFilter"
        >
          <template v-slot:label>
            {{ $t("landing.female") }}
          </template>
        </customized-radio-button>
        <customized-radio-button
          for="both"
          name="gender"
          value="both"
          @getData="setGenderFilter"
        >
          <template v-slot:label>
            {{ $t("landing.both") }}
          </template>
        </customized-radio-button>
      </template>
    </filter-container>
    <!-- Gender Filter End -->

    <!-- Pro Type Filter Start -->

    <filter-container>
      <template v-slot:title>
        {{ $t("technical.type") }}
      </template>
      <template v-slot:content>
        <customized-radio-button
          for="ordinary"
          name="type"
          value="ordinary"
          @getData="setTypeFilter"
        >
          <template v-slot:label>
            {{ $t("technical.ordinary") }}
          </template>
        </customized-radio-button>
        <customized-radio-button
          for="professional"
          name="type"
          value="professional"
          @getData="setTypeFilter"
        >
          <template v-slot:label>
            {{ $t("technical.professional") }}
          </template>
        </customized-radio-button>
        <customized-radio-button
          for="typeboth"
          name="type"
          value="both"
          @getData="setTypeFilter"
        >
          <template v-slot:label>
            {{ $t("landing.both") }}
          </template>
        </customized-radio-button>
      </template>
    </filter-container>

    <!-- Pro Type Filter End -->

    <!-- Level Filter Start -->
    <filter-container>
      <template v-slot:title>
        {{ $t("landing.level") }}
      </template>
      <template v-slot:content>
        <customized-radio-button
          for="beginner"
          name="level"
          value="beginner"
          @getData="setLevelFilter"
        >
          <template v-slot:label>
            {{ $t("technical.beginner") }}
          </template>
        </customized-radio-button>
        <customized-radio-button
          for="intermediate"
          name="level"
          value="intermediate"
          @getData="setLevelFilter"
        >
          <template v-slot:label>
            {{ $t("technical.intermediate") }}
          </template>
        </customized-radio-button>
        <customized-radio-button
          for="expert"
          name="level"
          value="expert"
          @getData="setLevelFilter"
        >
          <template v-slot:label>
            {{ $t("technical.expert") }}
          </template>
        </customized-radio-button>
      </template>
    </filter-container>
    <!-- Level Filter End -->

    <!-- Age Group Filter Start -->
    <filter-container>
      <template v-slot:title>
        {{ $t("technical.age") }}
      </template>
      <template v-slot:content>
        <customized-radio-button
          for="child"
          name="age"
          value="child"
          @getData="setAgeFilter"
        >
          <template v-slot:label>
            {{ $t("technical.child") }}
          </template>
        </customized-radio-button>
        <customized-radio-button
          for="teen"
          name="age"
          value="teen"
          @getData="setAgeFilter"
        >
          <template v-slot:label>
            {{ $t("technical.teen") }}
          </template>
        </customized-radio-button>

        <customized-radio-button
          for="adult"
          name="age"
          value="adult"
          @getData="setAgeFilter"
        >
          <template v-slot:label>
            {{ $t("technical.adult") }}
          </template>
        </customized-radio-button>
      </template>
    </filter-container>
    <!-- Age Group Filter End -->
  </div>
</template>
<script>
import FilterContainer from "./FilterContainer.vue";
import DualRangeSlider from "../utilities/DualRangeslider.vue";
import CustomizedRadioButton from "../utilities/CustomizedRadioButton.vue";
import SearchableOtherLangs from "./SearchableOtherLangs.vue";
import CustomizedCheckbox from "../utilities/CustomizedCheckbox.vue";
export default {
  props: {
    landingType: {
      type: String,
      default: "online",
    },
    cityName: {
      type: String,
      default: null,
    },
  },
  components: {
    FilterContainer,
    DualRangeSlider,
    CustomizedRadioButton,
    SearchableOtherLangs,
    CustomizedCheckbox,
  },
  emits: [
    "getGender",
    "getLevel",
    "removeLevel",
    "getAge",
    "removeAge",
    "getType",
    "getPrice",
    "getClassType",
  ],
  methods: {
    setGenderFilter(value) {
      this.$emit("getGender", value);
    },
    setLevelFilter(value) {
      this.$emit("getLevel", value);
    },
    setAgeFilter(value) {
      this.$emit("getAge", value);
    },
    setTypeFilter(value) {
      this.$emit("getType", value);
    },
    setPriceFilter(event) {
      console.log(event.target.value);
    },
    setPriceFilter(minPrice, maxPrice) {
      this.$emit("getPrice", minPrice, maxPrice);
    },
    setClassTypeFilter(value) {
      this.$emit("getClassType", value);
    },
    redirectUser(langObject) {
      this.$router.push(`/${langObject.slug}`);
    },
  },
  computed: {
    isOnlineLanding() {
      if (this.landingType == "online") {
        return true;
      }
    },
    isInPersonLanding() {
      if (this.landingType == "inperson") {
        return true;
      }
    },
  },
};
</script>
<style scoped>
.search-box {
  border: 1px solid #adadad;
}
</style>
