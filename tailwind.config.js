/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'bleu-fonce': '#0D1B2A',
        'gris-acier': '#4A90E2',
        'blanc': '#FFFFFF',
        'accent-jaune': '#1E3A8A',
        'accent-orange': '#1E40AF',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}