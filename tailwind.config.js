/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        work: ["Work Sans", "sans-serif"],
      },
      colors: {
        // primary: "#0f0f93",
        primary: "#1e3a8a",
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
