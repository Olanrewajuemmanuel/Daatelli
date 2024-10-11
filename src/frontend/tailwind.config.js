/* eslint-disable no-undef */
/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  variants: {
    background: ["responsive", "hover", "focus", "active", "disabled"],
  },
  theme: {
    extend: {
      colors: {
        "frosted-glass": "rgba(255, 255, 255, 0.8)",
        "primary": "#0778E7",
        "shade-bg": "#EEE",
        "body": "#222",
      },
      backgroundImage: {
        "noise": "url('./assets/noisy-background.jpg')",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
