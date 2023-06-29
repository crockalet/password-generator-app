/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#24232C",
        grey: "#817D92",
        "almost-white": "#E6E5EA",
        "very-dark-gray": "#18171F",
        "neon-green": "#A4FFAF",
        "1-red": "#F64A4A",
        "2-orange": "#FB7C58",
        "3-yellow": "#F8CD65",
      },
      fontSize: {
        'heading-l': ['2rem', {
          fontWeight: '700'
        }],
        'heading-m': ['1.5rem', {
          fontWeight: '700'
        }],
        'body': ['1.125rem', {
          fontWeight: '700'
        }],
      }
    },
  },
  plugins: [],
};
