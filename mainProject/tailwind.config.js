module.exports = {
  content: [
    "../core/*.{js,vue,ts}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff4338",
        secondary: "#fafafc",
        tertiary: "#313638",
        accent: "#33B4EB",
        "accent-active": "#1c7faa",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    rtl: true,
  },
  themes: [
    {
      light: {
        primary: "#ff4338",
        "primary-focus": "#ff4338",
        "primary-content": "#ffffff",
        secondary: "#fafafc",
        "secondary-focus": "#fafafc",
        "secondary-content": "#ffffff",
        accent: "#33B4EB",
        "accent-active": "#1c7faa",
        "accent-focus": "#33B4EB",
        "accent-content": "#ffffff",
        neutral: "#3d4451",
        "neutral-focus": "#2a2e37",
        "neutral-content": "#ffffff",
        "base-100": "#ffffff",
        "base-200": "#f9fafb",
        "base-300": "#d1d5db",
        "base-content": "#1f2937",
        info: "#2094f3",
        success: "#009485",
        warning: "#ff9900",
        error: "#ff5724",
      },
    },
  ],
};
