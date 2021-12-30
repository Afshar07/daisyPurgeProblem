<template>
  <div class="become-teacher-container w-full flex items-center justify-center">
    <div class="get-started-container w-full text-white py-8 md:py-0">
      <div class="sub-container flex items-center container mx-auto h-full">
        <div class="grid grid-cols-1 md:grid-cols-2 items-center mx-auto">
          <div class="w-full">
            <h3 class="font-bold md:text-xl w-3/4">
              جذب استاد
            </h3>
            <p class="my-6 w-3/4">
              با مهارت زبانی که داری هر کجا هر جور میتونی کسب درآمد کن.
            </p>
            <a
              :href="ctaLink"
              target="_blank"
              class="
                bg-primary
                hover:bg-red-600
                transition-all
                py-2
                md:py-3
                rounded-md
                w-full
                min-w-full
                px-32
                md:px-10
              "
            >
              شروع کنید
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ctaLink: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .get-started-container {
    background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 35%,
        rgba(22, 22, 22, 0.8) 100%
      ),
      url("/teachersLanding/get-started-image.webp");
    height: auto;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

@media only screen and (min-width: 769px) {
  .get-started-container {
    background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 35%,
        rgba(22, 22, 22, 0.8) 100%
      ),
      url("/teachersLanding/get-started-image.webp");
    height: 70vh;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
