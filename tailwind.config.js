/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}", // Ajuste ce chemin selon la structure de ton projet
  ],
  theme: {
    extend: {
      colors: {
        customYellow: '#FFD15B',
      },
      fontFamily: {
        anton: ['anton', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [],
}

