const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'IBM Plex Sans'", ...defaultTheme.fontFamily.sans],
        mono: ["'JetBrains Mono'", ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        bottom: `0px 1.1px 0.1px -32px rgba(0, 0, 0, 0.069),
  0px 4.3px 0.3px -32px rgba(0, 0, 0, 0.153),
  0px 12.1px 0.6px -32px rgba(0, 0, 0, 0.262),
  0px 40px 2px -32px rgba(0, 0, 0, 0.44)`,
      },
      colors: {
        'jaarin-pink': {
          50: '#fffcff',
          100: '#fff9ff',
          200: '#ffeffe',
          300: '#ffe5fd',
          400: '#ffd2fc',
          500: '#FFBFFB',
          600: '#e6ace2',
          700: '#bf8fbc',
          800: '#997397',
          900: '#7d5e7b',
        },
      },
    },
  },
  plugins: [],
};
