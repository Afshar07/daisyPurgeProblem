import Vue from "vue";
import ShowErrors from "../components/utilities/ShowErrors.vue";
import BaseInput from "../components/utilities/BaseInput.vue";
import LoadingSpinner from "../components/utilities/LoadingSpinner.vue";
import BackButton from "../components/utilities/BackButton.vue";
import PageNumbers from "../components/utilities/PageNumbers.vue";
import BreadCrumbs from "../components/utilities/BreadCrumbs.vue";

Vue.component("show-errors", ShowErrors);
Vue.component("base-input", BaseInput);
Vue.component("loading-spinner", LoadingSpinner);
Vue.component("back-button", BackButton);
Vue.component("page-numbers", PageNumbers);
Vue.component("bread-crumbs", BreadCrumbs);
