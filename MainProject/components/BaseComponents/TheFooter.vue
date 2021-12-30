<template>
  <footer
    class="
      footer-container
      w-full
      bg-tertiary
      p-4
      grid grid-cols-1
      gap-10
      md:gap-0 md:grid-cols-4
    "
  >
    <div class="langs-col flex flex-col items-start">
      <h3 class="text-white text-center text-xl mb-4 pr-10">
        {{ $t("nav.langs") }}
      </h3>
      <div class="w-full grid grid-cols-1 md:grid-cols-2 md:mr-10 pr-10 md:pr-0">
        <a
          class="text-gray-400 hover:text-gray-300 my-1 w-min"
          v-for="lang in getCategoriesList"
          :key="lang.category_id"
          :href="langLink(lang.slug)"
          target="_blank"
        >
          {{ lang.category_title }}
        </a>
      </div>
    </div>
    <div class="learning-col flex flex-col items-start pr-10">
      <h3 class="text-white text-xl mb-4">{{ $t("footer.learning") }}</h3>
    </div>
    <div class="access-col flex flex-col items-start pr-10">
      <h3 class="text-white text-xl mb-4">{{ $t("footer.accessibility") }}</h3>
      <a
        href="/faq"
        target="blank"
        class="text-gray-400 hover:text-gray-300 mr-2"
      >
        {{ $t("links.faq") }}
      </a>
      <a
        href="/user/dashboard"
        target="blank"
        class="text-gray-400 hover:text-gray-300 mr-2 mt-3"
      >
        {{ $t("login.userlogin") }}
      </a>
      <a
        :href="proPanelLink"
        target="blank"
        class="text-gray-400 hover:text-gray-300 mr-2 mt-3"
      >
        {{ $t("login.prologin") }}
      </a>
      <a
        href="/apply-to-teach"
        target="blank"
        class="text-gray-400 hover:text-gray-300 mr-2 mt-3"
      >
        {{ $t("nav.applypro") }}
      </a>
      <a
        href="/about-us"
        target="blank"
        class="text-gray-400 hover:text-gray-300 mr-2 mt-3"
      >
        {{ $t("links.aboutus") }}
      </a>
      <a
        href="/contact-us"
        target="blank"
        class="text-gray-400 hover:text-gray-300 mr-2 mt-3"
      >
        {{ $t("links.contact-us") }}
      </a>

      <a
        href="/students-guide"
        target="blank"
        class="text-gray-400 hover:text-gray-300 mr-2 mt-3"
      >
        {{ $t("links.usersguide") }}
      </a>
      <a
        href="/teachers-guide"
        target="blank"
        class="text-gray-400 hover:text-gray-300 mr-2 mt-3"
      >
        {{ $t("links.teachersguide") }}
      </a>
      <a
        href="/organization-services"
        target="blank"
        class="text-gray-400 hover:text-gray-300 mr-2 mt-3"
      >
        {{ $t("links.organizationservices") }}
      </a>
    </div>
    <div class="social-col flex flex-col items-start pr-10">
      <h3 class="text-white text-xl mb-4">{{ $t("footer.socialmedia") }}</h3>
      <span class="w-full flex">
        <svg
          width="24"
          height="24"
          class="cursor-pointer mx-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.791-4.668 4.533-4.668 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z"
            fill="#8C8C8C"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.671 15.469L17.203 12h-3.328V9.749c0-.949.465-1.874 1.956-1.874h1.513V4.922s-1.374-.234-2.686-.234c-2.742 0-4.533 1.66-4.533 4.668V12H7.078v3.469h3.047v8.385a12.084 12.084 0 003.75 0V15.47h2.796z"
            fill="#333"
          ></path>
        </svg>
        <svg
          width="24"
          height="24"
          class="cursor-pointer mx-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" fill="#8C8C8C"></circle>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.998 6.004c-1.629 0-1.833.007-2.473.036-.638.029-1.074.13-1.456.279a2.94 2.94 0 00-1.062.692 2.94 2.94 0 00-.692 1.062c-.148.381-.25.817-.279 1.456-.03.64-.036.844-.036 2.473s.007 1.833.036 2.473c.03.638.13 1.074.279 1.456.153.394.358.729.692 1.062.333.334.668.539 1.062.692.382.148.818.25 1.456.279.64.03.844.036 2.473.036 1.63 0 1.833-.007 2.473-.036.639-.03 1.075-.13 1.456-.279a2.942 2.942 0 001.063-.692 2.94 2.94 0 00.691-1.062c.149-.382.25-.818.28-1.456.028-.64.035-.844.035-2.473 0-1.63-.007-1.833-.036-2.473-.029-.639-.13-1.075-.279-1.456a2.94 2.94 0 00-.692-1.063 2.94 2.94 0 00-1.062-.691c-.381-.149-.817-.25-1.456-.28-.64-.028-.844-.035-2.473-.035zm0 1.08c1.602 0 1.791.007 2.424.036.585.026.902.124 1.114.206.28.109.48.239.69.449.21.21.34.41.448.69.082.21.18.528.207 1.113.028.633.035.822.035 2.424 0 1.601-.007 1.791-.035 2.424-.027.585-.125.902-.207 1.113-.109.28-.239.48-.449.69-.21.21-.41.34-.69.449-.21.082-.528.18-1.113.206-.633.03-.822.035-2.424.035-1.602 0-1.791-.006-2.424-.035-.584-.026-.902-.124-1.113-.206a1.858 1.858 0 01-.69-.449c-.21-.21-.34-.41-.449-.69-.082-.211-.18-.528-.206-1.113-.03-.633-.035-.822-.035-2.424 0-1.602.006-1.791.035-2.424.026-.585.124-.902.206-1.114.109-.28.239-.48.449-.69.21-.21.41-.34.69-.448.211-.082.529-.18 1.113-.206.633-.03.822-.035 2.424-.035z"
            fill="#282829"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.999 14.001a2 2 0 110-3.998 2 2 0 010 3.998zm0-5.08a3.08 3.08 0 100 6.161 3.08 3.08 0 000-6.16zM15.92 8.8a.72.72 0 11-1.44 0 .72.72 0 011.44 0z"
            fill="#282829"
          ></path>
        </svg>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="cursor-pointer mx-1"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.257 9.84c.175 3.89-2.727 8.229-7.863 8.229a7.835 7.835 0 01-4.24-1.243 5.562 5.562 0 004.096-1.145 2.77 2.77 0 01-2.584-1.923c.432.084.859.06 1.248-.046a2.77 2.77 0 01-2.218-2.748c.373.207.8.332 1.253.346a2.77 2.77 0 01-.856-3.692 7.854 7.854 0 005.701 2.89 2.769 2.769 0 014.714-2.523 5.56 5.56 0 001.757-.672 2.772 2.772 0 01-1.216 1.53 5.558 5.558 0 001.589-.435 5.609 5.609 0 01-1.381 1.432zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"
            fill="#8C8C8C"
          ></path>
        </svg>
      </span>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    langLink(slug) {
      return `/${slug}`;
    },
  },
  computed: {
    ...mapGetters("categories", ["getCategoriesList"]),
    proPanelLink() {
      return process.env.PRO_PANEL;
    },
  },
};
</script>
