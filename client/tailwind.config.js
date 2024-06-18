/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {colors:{...colors}, backgroundImage: {
      'home': "url('../images/study.jpg')"}},

  },
  plugins: [],
}

