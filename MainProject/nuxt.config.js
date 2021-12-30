// import axios from "axios";
// Make sitemaps request

export default async () => {
  let environment = [
    "HOST_ADD",
    "HOST_PORT",
    "HOST_ADDRESS",
    "NODEJS",
    "PRO_PANEL",
    "MAIN_URL",
    "SSR",
  ];
  let readyEnv = false;
  for (let i in environment) {
    if (process.env[environment[i]]) {
      readyEnv = true;
    } else {
      console.error(`Please set ${environment[i]} in .env file`);
      readyEnv = false;
      break;
    }
  }
  if (!readyEnv) {
    return;
  } else {
    return {
      ssr: true,
      // Global page headers: https://go.nuxtjs.dev/config-head
      head: {
        title: "",
        titleTemplate: "%s  | های تاکی",
        htmlAttrs: {
          lang: "fa",
        },
        meta: [
          { charset: "utf-8" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          { hid: "description", name: "description", content: "" },
          { hid: "robots", name: "robots", content: "noindex, nofollow" },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      },
      server: {
        port: process.env.HOST_PORT,
        host: process.env.HOST_ADD,
      },

      target: "server",

      // Global CSS: https://go.nuxtjs.dev/config-css
      css: [
        "~layouts/global.css",
        "./node_modules/cropperjs/dist/cropper.min.css",
      ],

      // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
      plugins: [
        { src: "~/plugins/progressbar.js", mode: "client" },
        { src: "~/plugins/date-picker.js", mode: "client" },
        { src: "~/plugins/getSsr.js" },
        "~/plugins/repository.js",
        "~/plugins/global-components.js",
        "~/plugins/directives.js",
        "~/plugins/resetCookiesOnError.js",
      ],

      // Auto import components: https://go.nuxtjs.dev/config-components
      components: ["~/components", "~/../core"],

      // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
      buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        "@nuxtjs/tailwindcss",
        // "@nuxtjs/html-validator"
      ],

      // Modules: https://go.nuxtjs.dev/config-modules
      modules: [
        "@nuxtjs/sitemap",
        "@nuxtjs/axios",
        "@nuxtjs/auth-next",
        [
          "nuxt-i18n",
          {
            locales: ["fa"],
            defaultLocale: "fa",
            vueI18n: {
              fallbackLocale: "fa",
              messages: {
                fa: require("./locales/fa.json"),
              },
            },
          },
        ],
        "@nuxtjs/dotenv",
      ],
      axios: {
        credentials: true,
        baseURL: process.env.HOST_ADDRESS,
      },
      auth: {
        resetOnError: true,
        rewriteRedirects: false,
        strategies: {
          cookie: {
            token: {
              required: true,
              type: "Bearer",
            },
            cookie: {
              // check for auth._token.cookie existense for loggedIn
              name: "auth._token.cookie",
            },

            endpoints: {
              login: {
                url: "/api/auth/otp/login",
                method: "POST",
              },
              logout: {
                url: "/api/auth/otp/logout",
                method: "POST",
              },
              user: false,
            },
          },
        },
        redirect: {
          login: "/user/login",
          home: false,
          logout: "/",
          admins: false,
        },
      },
      // Build Configuration: https://go.nuxtjs.dev/config-build
      build: {
        extractCSS: true,
      },
      transpile: ["swiper"],
    };
  }
};
