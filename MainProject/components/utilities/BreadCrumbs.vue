<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <li v-for="breadCrumb in breadCrumbs" :key="breadCrumb.position">
        <a :href="breadCrumb.item" :title="breadCrumb.tooltip">
          {{ breadCrumb.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    breadCrumbs: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.breadcrumbs > ul > li + ::before {
  transform: rotate(-45deg) !important;
}
</style>
