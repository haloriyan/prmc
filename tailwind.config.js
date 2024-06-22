/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#eb3c7f"
      },
      screens: {
        "mobile": {"max": "480px"},
        "tablet": {"min": "481px", "max": "1023px"},
        "desktop": {"min":"1024px"}
      }
    },
  },
  plugins: [],
}
