/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
    },
  },
  daisyui: {
    themes: ["light", "dark", "business"],
  },
  plugins: [
    require('daisyui'),
  ],
}

