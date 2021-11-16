const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      //tidak menimpa font defult sans serif none
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
    screens: {
      vs: "400px",
      xs: "500px",
      sm: "640px",
      md: "768px",
      nav: "800px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      gray: colors.trueGray,
      red: colors.rose,
      yellow: colors.yellow,
      main: '#222222',
      dark1: '#102A43',
      dark2: '#243B53',
      dark3: '#334E68',
      // ...
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
