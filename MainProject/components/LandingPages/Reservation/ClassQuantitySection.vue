<template>
  <div class="quantity-container w-full mt-16">
    <header class="w-full my-2">
      <h3 class="text-center">{{ $t("reservation.selectquantity") }}</h3>
    </header>
    <main class="my-5">
      <div v-for="(item, key) in getSessionQuantityTypes" :key="key">
        <div
          class="
            session-class
            text-xs
            md:text-base
            my-4
            rounded-md
            hover:text-gray-800
            cursor-pointer
            flex
            items-center
            w-full
            justify-between
          "
          :class="item.class"
          ref="quantityType"
          @click="selectSession($event, item.typeTitle, key)"
        >
          <div
            class="
              right
              flex flex-col
              md:flex-row
              items-center
              justify-center
              p-3
            "
          >
            <p class="text-center">
              {{ $t(`reservation.${item.typeTitle}session`) }}
            </p>
            <p class="text-center md:mr-2">
              {{ $t(`reservation.${type}teaching`) }}
              <span v-if="getClassType == 'inperson' && city">
                {{ $t("landing.in") }}
                {{ city }}
              </span>
            </p>
            <p class="text-gray-600 text-center md:mr-2">
              ({{
                getClassType == "online"
                  ? $t("reservation.onehour")
                  : $t("reservation.one_hour_half")
              }})
            </p>
          </div>
          <div class="flex items-center">
            <div class="middle p-3 flex flex-col justify-center">
              <p class="text-xs text-center">
                {{ $t("reservation.onesessionprice") }}
              </p>
              <span
                class="
                  flex
                  items-center
                  justify-center
                  text-center text-base
                  px-2
                  my-1
                  rounded-xl
                  price-badge
                "
              >
                <p class="ml-1">
                  {{ item.oneSessionPrice }}
                </p>
                <p>{{ $t("pricing.toman") }}</p>
              </span>
            </div>
            <div
              class="
                left
                rounded-l-md
                flex flex-col
                md:flex-row
                justify-center
                items-center
                bg-primary
                text-white
                px-3
                py-7
                md:py-auto
              "
              :class="bgOpacity(item.bgOpacity)"
            >
              <p class="ml-2">
                {{
                  item.discount == 0
                    ? $t("reservation.nodiscount")
                    : item.discount + "%"
                }}
              </p>
              <p>{{ $t("reservation.discount") }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer
      class="
        footer
        bottom-5
        pt-3
        sm:pt-0
        border-t
        sm:border-0
        border-gray-300
        sm:bottom-0
        left-1/2
        sm:left-0
        transform
        -translate-x-1/2
        sm:-translate-x-0
        w-full
        fixed
        sm:relative
        flex flex-col
        items-center
        justify-center
        sm:justify-end
      "
    >
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
        @click="selectQuantity"
      >
        {{ $t("reservation.continue") }}
      </button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  emits: ["getQuantity"],
  props: {
    type: {
      type: String,
      required: true,
    },
    prices: {
      type: Object,
      required: true,
    },
    categoryTitle: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      quantity: null,
      sessionTypeQuantities: {
        one: 1,
        five: 5,
        ten: 10,
      },
    };
  },
  methods: {
    bgOpacity(opacity) {
      return `bg-opacity-${opacity}`;
    },
    selectSession(event, type, key) {
      this.quantity = this.sessionTypeQuantities[type];

      for (let refKey in this.$refs.quantityType) {
        if (refKey != key) {
          this.$refs.quantityType[refKey].classList.remove("selected");
        }
      }
      event.currentTarget.classList.add("selected");
    },
    selectQuantity() {
      this.$emit("getQuantity", this.quantity);
    },
    calcDiscount(price) {
      const basePrice = this.prices.one;
      let newPrice = basePrice - price;
      return ((newPrice / basePrice) * 100).toFixed(0);
    },
  },
  computed: {
    isButtonDisabled() {
      if (!this.quantity) {
        return true;
      }
    },
    teachingTypeText() {
      if (this.getClassType == "online") {
        return this.$t("reservation.onlineteaching");
      } else if (this.getClassType == "inperson") {
        return this.$t("reservation.inpersonteaching");
      } else {
        return this.$t("reservation.trialsession");
      }
    },
    getSessionQuantityTypes() {
      let typeTitles = ["one", "five", "ten"];

      let bgOpacities = {
        one: 50,
        five: 80,
        ten: 100,
      };

      let types = [];

      typeTitles.forEach((type) => {
        types.push({
          typeTitle: type,
          title:
            this.$t(`reservation.${type}session`) +
            " " +
            this.$t(`reservation.${this.type}teaching`),
          oneSessionPrice: Intl.NumberFormat("fa-IR").format(this.prices[type]),
          discount: this.calcDiscount(this.prices[type]),
          class: `${type}-session`,
          bgOpacity: bgOpacities[type],
        });
      });

      return types;
    },
    ...mapGetters("publicSchedule", ["getClassType"]),
  },
};
</script>

<style scoped>
.price-badge {
  background-color: rgb(140, 140, 140, 10%);
  color: rgb(56, 56, 56);
}
.session-class {
  border: 1px solid #e6e6e6;
  transition: all 0.25s ease;
}
.left {
  max-width: 6rem;
}
.session-class:hover {
  border: 1px solid #3f9dfb;
}
.selected {
  @apply bg-blue-100 text-gray-800;
  border: 1px solid #3f9dfb !important;
}
</style>
