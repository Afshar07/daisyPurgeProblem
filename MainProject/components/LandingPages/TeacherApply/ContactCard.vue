<template>
  <div class="card text-center shadow-2xl bg-white">
    <figure class="px-10 pt-8 text-primary" v-html="card.img"></figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ card.title }}
      </h2>
      <p class="text-tertiary">
        {{ card.description }}
      </p>
      <div class="justify-center card-actions">
        <a :href="card.link" class="btn btn-outline btn-primary focus:ring-0">
          {{ card.linkTitle }}
        </a>
      </div>
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
};
</script>
