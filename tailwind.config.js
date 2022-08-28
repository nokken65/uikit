/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        screen: '100vw',
      },
      keyframes: {
        'ripple-kf': {
          '0%': { transform: 'scale(0.5)', opacity: 1 },
          '100%': { transform: 'scale(4)', opacity: 0 },
        },
      },
      animation: {
        'spin-fast': 'spin 400ms linear infinite',
        ripple: 'ripple-kf 600ms ease-out',
      },
    },
  },
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [],
};
