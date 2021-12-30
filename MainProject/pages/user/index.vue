<template></template>

<script>
export default {
  middleware: "auth",
  beforeMount() {
    window.location.href = "/user/dashboard";
  },
};
</script>
