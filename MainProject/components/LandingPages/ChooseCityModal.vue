<template>
  <div class="modal modal-open" v-if="!$fetchState.pending">
    <div class="modal-box">
      <div class="modal-content flex flex-col justify-center">
        <svg
          @click="closeModal"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-red-600 absolute top-3 right-3 cursor-pointer"
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
        <div
          class="form-control w-5/6 self-center"
          v-if="!$fetchState.pending && citiesList.length > 0"
        >
          <label class="label">
            <span class="label-text">{{ $t("header.search") }}</span>
          </label>
          <input
            v-model="search"
            autocomplete="off"
            type="text"
            :placeholder="$t('header.tehran')"
            class="input input-bordered focus:ring-0"
          />
        </div>

        <ul
          class="menu p-4 bg-base-100 rounded-box"
          v-if="!$fetchState.pending && citiesList.length > 0"
        >
          <div
            class="city-container h-36 overflow-y-auto"
            @scroll="handleScroll"
          >
            <li
              class="ml-1"
              v-for="city in citiesList"
              :key="city.id"
              @click="redirectToCityLanding(city)"
            >
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline-block w-5 h-5 ml-2 stroke-current text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                {{ city.city_name }}
              </a>
            </li>
          </div>
        </ul>
        <div
          class="w-full flex flex-col items-center justify-center"
          v-if="!$fetchState.pending && citiesList.length == 0"
        >
          <h5 class="text-center">
            {{ $t("header.emptycity") }}
          </h5>
          <a :href="slug" class="px-4 py-2 text-white bg-primary rounded-md">
            {{ $t("header.tryonline") }}
          </a>
        </div>
      </div>
    </div>
    <loading-spinner :isLoading="isLoading"></loading-spinner>
  </div>
</template>

<script>
export default {
  emits: ["closeCityModal", "loaded"],
  props: {
    topCatId: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  watch: {
    search: {
      handler(val) {
        if (val == "") {
          this.search = null;
        }
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.$fetch();
            this.awaitingSearch = false;
          }, 500); // 0.5 sec delay
        }
        this.awaitingSearch = true;
      },
    },
  },
  async fetch() {
    this.isLoading = true;
    const response = await this.$repositories.getCities.activeCities(
      this.search,
      this.pagination,
      this.topCatId
    );
    this.citiesList = response.data;
    this.links = response.links;
    this.isLoading = false;
    this.$emit("loaded");
  },
  data() {
    return {
      isLoading: false,
      links: null,
      awaitingFetch: false,
      awaitingSearch: false,
      search: null,
      pagination: 10,
      citiesList: null,
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
    redirectToCityLanding(city) {
      this.isLoading = true;
      window.location.href = `/${city.slug}`;
    },
    closeModal() {
      this.$emit("closeCityModal");
    },
    handleScroll(event) {
      if (
        event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight - 150
      ) {
        if (!this.awaitingFetch) {
          setTimeout(() => {
            this.infiniteScroll();
            this.awaitingFetch = false;
          }, 500); // 0.5 sec delay
        }
        this.awaitingFetch = true;
      }
    },
    async infiniteScroll() {
      // Check if next page is available
      if (this.links.next) {
        this.isLoading = true;
        const response = await this.$repositories.newPage.newPage(
          this.links.next
        );
        this.links = response.data.links;
        // Set the new links

        let newCities = [...this.citiesList, ...response.data];
        // Add the new pages to list
        this.citiesList = newCities;
        this.isLoading = false;
      } else {
        return;
      }
    },
  },
};
</script>
