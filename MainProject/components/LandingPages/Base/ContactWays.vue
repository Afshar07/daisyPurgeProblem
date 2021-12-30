<template>
  <div
    class="
      main-container
      p-2
      border border-gray-300
      rounded-md
      my-2
      flex
      items-center
    "
  >
    <div class="ml-4">
      <slot name="icon"></slot>
    </div>
    <div>
      <slot name="description"></slot>
    </div>
  </div>
</template>
