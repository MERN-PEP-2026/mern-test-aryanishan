/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        soft: '0 10px 30px -18px rgba(15, 23, 42, 0.35)'
      }
    }
  },
  plugins: []
};
