/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fdf8e9",
          100: "#faeec3",
          200: "#f5dd8c",
          300: "#efc74f",
          400: "#e8b025",
          500: "#d99815",
          600: "#b6760f",
          700: "#925810",
          800: "#794613",
          900: "#673b15",
        },
      },
      fontFamily: {
        display: ["'Noto Serif TC'", "'Noto Serif SC'", "serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "ball-pop": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "60%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "ball-pop": "ball-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
      },
    },
  },
  plugins: [],
};
