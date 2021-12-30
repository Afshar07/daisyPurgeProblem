<template>
  <p>
    {{ $t(`daysdetails.${this.days}`) }}
  </p>
</template>

<script>
export default {
  props: {
    days: {
      required: false,
    },
  },
};
</script>
