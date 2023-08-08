/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html", "./src/index.tsx"],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),],
}

