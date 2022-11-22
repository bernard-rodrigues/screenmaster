/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      'md': {'max': '767px'}
    }
  },
  plugins: [],
}
