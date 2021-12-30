<template>
  <div class="buttons-container w-full flex justify-center">
    <button class="w-auto clear rounded-md text-white bg-red-600 px-10 py-1 mx-2" type="button">
      {{ $t("landing.clearfilters") }}
    </button>
    <button class="w-auto submit rounded-md text-white bg-blue-500 px-10 py-1 mx-2" type="button">
      {{ $t("landing.submitfilters") }}
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.clear {
  border: 1px solid #c50000;
}
.submit {
  border: 1px solid #008bcc;
}
</style>
