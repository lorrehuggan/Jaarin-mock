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
    },
  },
  plugins: [],
};
