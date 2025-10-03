/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "inu-red": "#DC2626",
        "inu-gold": "#F59E0B", 
        "inu-dark": "#0F172A",
      }
    },
  },
  plugins: [],
}
