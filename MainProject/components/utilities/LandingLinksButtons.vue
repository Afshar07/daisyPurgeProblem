<template>
  <section
    v-if="linksArray.length > 0"
    class="links-section bg-white p-5 rounded-md shadow-md mx-auto my-10"
  >
    <h2 class="mb-10">
      {{ title }}
    </h2>
    <div class="w-full mt-4 flex flex-wrap">
      <a
        v-for="link in linksArray"
        :key="link.slug"
        :title="link.title"
        :href="linkGenerator(link)"
        target="_blank"
        class="px-3 py-1 bg-primary rounded-md text-white my-1 mx-1"
      >
        {{ link.name }}
      </a>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    linksArray: {
      type: Array,
      required: true,
    },
  },
  methods: {
    linkGenerator(link) {
      return `/${link.slug}`;
    },
  },
};
</script>
