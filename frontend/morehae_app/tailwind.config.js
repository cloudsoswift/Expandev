/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0d1117",
        mbc: "#474F58",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
