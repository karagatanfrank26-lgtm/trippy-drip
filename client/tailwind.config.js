/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          950: '#1a0033',
          900: '#2d0052',
          800: '#3d1a5f',
        }
      }
    },
  },
  plugins: [],
}
