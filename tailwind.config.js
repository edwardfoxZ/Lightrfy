/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".draggble-false": {
          "-webkit-user-drag": "none",
          "user-drag": "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
