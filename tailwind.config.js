/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
    },
  },
  daisyui: {
    themes: ["light", "dark", "luxury"],
  },
  plugins: [
    require('daisyui'),
  ],
}

