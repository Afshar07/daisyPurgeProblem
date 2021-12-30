<template>
  <div
    class="
      card
      rounded-sm
      compact
      border border-gray-500 border-opacity-40
      shadow-md
      hover:shadow-lg
      transition-all
      transform
      hover:-translate-y-2
      w-full
      flex flex-row
      items-center
      cursor-pointer
      bg-white
    "
  >
    <div class="card-body">
      <h2 class="card-title">
        <slot name="title"></slot>
      </h2>
      <p>
        <slot name="description"></slot>
      </p>
    </div>
    <span class="icon-container text-primary ml-3 transition-all">
      <slot name="icon"></slot>
    </span>
  </div>
</template>