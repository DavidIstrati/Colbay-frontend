module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Space Grotesk', 'sans-serif'],
      heading: ['Space Grotesk', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        spaceGrotesk: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'solid-2': '-2px 2px 0px #333',
        'solid-4': '-4px 4px 0px #333',
        'solid-6': '-6px 6px 0px #333',
        'solid-10': '-10px 10px 0px #333',
      }
    },
  },
  plugins: [],
}
