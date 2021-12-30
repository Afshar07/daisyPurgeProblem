<template>
  <div
    class="
      main-container
      w-full
      md:w-1/3
      flex flex-row
      items-start
      space-x-4
      justify-start
    "
  >
    <div>
      <div class="avatar flex flex-col items-center">
        <a :href="proProfileLink" target="_blank" class="rounded-btn w-24 h-24">
          <img :src="card.pro.avatar" />
        </a>
        <p
          class="
            text-xs
            mt-2
            badge badge-outline
            border-primary
            text-primary
            hidden
            md:block
          "
        >
          {{ $t("orders.sessionid") }}
          {{ card.id }}
        </p>
      </div>
    </div>
    <div class="w-full md:w-1/3">
      <a :href="proProfileLink" target="_blank">
        <h4 class="card-title mr-2 w-full text-sm">
          {{ card.pro.name }}
        </h4>
      </a>
      <div class="top-cat-container flex items-center">
        <p class="text-base-content text-opacity-40 mr-2">
          {{ card.top_category.title }}
        </p>
        <p class="mr-1 badge badge-info">
          {{ $t(`pro.${card.execution_method}`) }}
        </p>
      </div>
      <p
        class="
          text-xs
          mt-2
          mr-2
          badge badge-outline
          border-primary
          text-primary
          md:hidden
        "
      >
        {{ $t("orders.sessionid") }}
        {{ card.id }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  computed: {
    proProfileLink() {
      return `/profile/${this.card.pro.id}`;
    },
  },
};
</script>
