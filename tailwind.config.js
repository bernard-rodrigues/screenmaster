/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      'md': {'max': '767px'}
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
