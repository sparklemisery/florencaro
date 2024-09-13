/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '210': '210px',
        '84': '84px',
        '100': '400px',


      },
      margin: {
        '20': '20px',
      },
      fontFamily: {
        pacifico: ['Pacifico', 'sans-serif'],
        saira: ['Saira Condensed', 'sans-serif'],
      },

    },
  },
  plugins: [],
}
