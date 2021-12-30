<template>
  <div
    class="international-tests-container relative"
    v-show="!$fetchState.pending"
  >
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
            class="flex justify-around w-full my-10 rounded-md"
            v-for="(test, index) in item"
            :key="index"
          >
            <div class="lang mx-4 relative">
              <img
                :src="test.image"
                class="card-img mx-auto"
                :alt="test.title"
              />
              <div class="lang-slug flex justify-center pb-10">
                <p class="ml-4 mt-4 text-center">{{ test.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
Swiper.use([Navigation, Pagination, Autoplay]);

import "swiper/swiper-bundle.css";

export default {
  fetchOnServer() {
    return this.$nuxt.$getSsr(process.env.SSR);
  },
  async fetch() {
    const response =
      await this.$repositories.getInternationalTests.getInternationalTests();
    this.testList = response.data.data;
    this.splited = this.chunkArray(this.testList, 1);
  },
  mounted() {
    // Initilize Swiper with options
    const intSwiper = new Swiper(".swiper-container", {
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
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
      testList: null,
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
  },
};
</script>
<style scoped>
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
    /* clip-path: polygon(0 0, 100% 0, 100% 100%, 0 78%); */
    transition: all 0.3s;
  }
  .card-icon {
    width: 50px;
    height: 40px;
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
    /* clip-path: polygon(0 0, 100% 0, 100% 100%, 0 78%); */
    transition: all 0.3s;
  }
  .card-icon {
    width: 50px;
    height: 40px;
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
    box-shadow: 0px 0px 44px -5px rgba(0, 0, 0, 0.1);
  }
  .card-img {
    min-width: 10.5rem !important;
    max-width: 10.5rem !important;
    min-height: 165px;
    max-height: 165px;
    transition: all 0.3s;
  }
  .card-icon {
    width: 50px;
    height: 40px;
    top: 40%;
    left: 9%;
  }
  .lang-slug {
    top: 50%;
    left: 1%;
  }
}
</style>
