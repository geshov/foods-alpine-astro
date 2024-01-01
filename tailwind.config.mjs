/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    logs: false,
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          ".indicator-item": {
            "border-color": "#6b7280",
          },
        },
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          ".indicator-item": {
            "border-color": "#6b7280",
          },
        },
      },
    ],
  },
};
