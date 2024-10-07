/* eslint-disable no-undef */
/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  variants: {
    background: ["responsive", "hover", "focus", "active", "disabled"],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
