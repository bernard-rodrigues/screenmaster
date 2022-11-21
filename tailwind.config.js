/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      'md': {'max': '767px'}
    }
  },
  plugins: [],
}
