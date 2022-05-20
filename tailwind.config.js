module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Space Grotesk", "sans-serif"],
      heading: ["Space Grotesk", "sans-serif"],
    },
    extend: {
      fontFamily: {
        spaceGrotesk: ["Space Grotesk", "sans-serif"],
      },
      backgroundImage: {
        gradient:
          "linear-gradient(70.38deg, #ECB85B 0%, #FF4C00 22.79%, #B57CFF 70.6%, #3DD2DD 97.59%);",
      },
      rotate: {
        720: "720deg",
      },
    },
  },
  plugins: [],
};
