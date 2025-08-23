/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#0a192f",
          secondary: "#64ffda",
          dark: "#020c1b",
          light: "#ccd6f6",
          lightest: "#e6f1ff",
        },
        animation: {
          blink: 'blink 1s infinite',
        },
        keyframes: {
          blink: {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0 },
          },
        },
      },
    },
    plugins: [],
  }