<template>
  <div class="w-full shadow stats rounded-none">
    <div
      class="stat place-items-center place-content-center"
      v-for="stat in stats"
      :key="stat.order"
    >
      <div class="stat-title">
        {{ stat.title }}
      </div>
      <div class="stat-value my-2" :class="statClass(stat)">
        {{ stat.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stats: {
      type: Array,
      required: true,
    },
  },
  methods: {
    statClass(stat) {
      return stat.class;
    },
  },
};
</script>
