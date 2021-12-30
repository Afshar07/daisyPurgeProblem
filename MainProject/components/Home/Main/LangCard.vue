<template>
  <div class="main-container relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="
        h-6
        w-6
        next-cursor
        absolute
        cursor-pointer
        hidden
        md:block
        text-primary
      "
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="
        h-6
        w-6
        prev-cursor
        absolute
        cursor-pointer
        hidden
        md:block
        text-primary
      "
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
    <div class="swiper-container langs-list-container mb-10 w-full md:w-11/12">
      <div class="swiper-wrapper lang-container">
        <div
          v-for="(item, index) in splited"
          :key="index"
          class="swiper-slide w-5/6 flex items-center justify-center"
        >
          <div
            class="flex justify-around cursor-pointer w-full my-10"
            v-for="(lang, index) in item"
            :key="index"
          >
            <a :href="lang.slug" target="blank">
              <div class="lang shadow-lg relative">
                <img
                  :src="renderImage(lang)"
                  class="card-img"
                  :alt="lang.category_title"
                />
                <img
                  :src="renderIcon(lang)"
                  class="card-icon absolute"
                  :alt="lang.category_title"
                />
                <div class="lang-slug absolute flex justify-end">
                  <p class="ml-4 mt-5 capitalize">
                    {{ lang.category_en_title }}
                  </p>
                </div>
                <div class="lang-title flex justify-center">
                  <p class="mr-4 mt-8 text-2xl md:text-xl">
                    {{ lang.category_title }}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
Swiper.use([Navigation, Pagination, Autoplay]);

import "swiper/swiper-bundle.css";

export default {
  beforeMount() {
    this.categoriesList = this.getCategoriesList;
    // Split the categories into a list of slides
    this.splited = this.chunkArray(this.getCategoriesList, 1);
  },
  mounted() {
    // Initilize Swiper with options
    const mainSwiper = new Swiper(".swiper-container", {
      loop: true,
      autoplay: {
        delay: 50000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      slidesPerView: 4,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        bulletElement: "span",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 4,
      },
      navigation: {
        nextEl: ".next-cursor",
        prevEl: ".prev-cursor",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
      breakpoints: {
        320: {
          slidesPerView: 1.2,
          spaceBetween: 20,
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        750: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1000: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1300: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        1800: {
          slidesPerView: 7,
          spaceBetween: 10,
        },
      },
    });
  },
  data() {
    return {
      splited: null,
    };
  },
  methods: {
    chunkArray(array, size) {
      // Chunk array into smaller chunks
      let result = [];
      let arrayCopy = [...array];
      while (arrayCopy.length > 0) {
        result.push(arrayCopy.splice(0, size));
      }
      return result;
    },

    renderImage(data) {
      return data.image;
    },
    renderIcon(data) {
      return data.icon;
    },
    redirectToLanding(lang) {
      window.open(lang.slug, "_blank");
    },
  },
  computed: {
    ...mapGetters("categories", ["getCategoriesList"]),
    moreButton() {
      if (this.showMore) {
        return this.$t("main.less");
      } else {
        return this.$t("main.more");
      }
    },
  },
};
</script>

<style scoped>
.swiper-container {
  height: 23rem;
}
.next-cursor {
  top: 10.5rem;
  left: 0.7rem;
}
.prev-cursor {
  top: 10.5rem;
  right: 0.7rem;
}
@media only screen and (max-width: 498px) {
  .lang {
    height: 19rem;
    width: 18rem;
  }
  .card-img {
    min-width: 18rem;
    max-width: 18rem;
    min-height: 200px;
    max-height: 200px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 78%);
    transition: all 0.3s;
  }
  .card-icon {
    top: 46%;
    left: 9%;
  }
  .lang-slug {
    top: 55%;
    left: 3%;
  }
}
@media only screen and (min-width: 499px) and (max-width: 570px) {
  .lang {
    height: 18rem;
    width: 14rem;
  }
  .card-img {
    min-width: 14rem;
    max-width: 14rem;
    min-height: 200px;
    max-height: 200px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 78%);
    transition: all 0.3s;
  }
  .card-icon {
    top: 50%;
    left: 9%;
  }
  .lang-slug {
    top: 60%;
    left: 1%;
  }
}

@media only screen and (min-width: 571px) {
  .lang {
    height: 18rem;
    width: 13.5rem;
    min-width: 13.5rem;
    max-width: 13.5rem;
  }
  .card-img {
    min-width: 13.5rem !important;
    max-width: 13.5rem !important;
    min-height: 165px;
    max-height: 165px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 78%);
    transition: all 0.3s;
  }
  .card-icon {
    top: 38%;
    left: 9%;
  }
  .lang-slug {
    top: 50%;
    left: 1%;
  }
}
</style>
