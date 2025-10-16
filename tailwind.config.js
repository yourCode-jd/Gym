module.exports = {
  purge: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx,vue}', './src/styles/*.css'],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        background: '#1a1a1a',
        primary: '#ffcc00',
        secondary: '#ff6600',
        accent: '#ff3366',
        text: '#ffffff',
        muted: '#b3b3b3',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};