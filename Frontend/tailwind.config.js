/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5faff',
          100: '#e6f2ff',
          300: '#99d1ff',
          500: '#3aa0ff',
          700: '#0b6fd6',
        },
        slate: {
          950: '#030712',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial'],
      },
      boxShadow: {
        'card': '0 6px 18px rgba(2,6,23,0.6)',
        'elevate': '0 10px 30px rgba(2,6,23,0.7)'
      }
    },
  },
  plugins: [],
};
