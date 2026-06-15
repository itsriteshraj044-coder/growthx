/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
      colors: {
        navy: {
          950: '#020910',
          900: '#03101D',
          800: '#051A2E',
          700: '#08213C',
          600: '#0B2C4F',
          500: '#0F3A66',
          400: '#1B5288',
        },
        mint: {
          DEFAULT: '#3CB98C',
          300: '#8AE2C2',
          400: '#5ACDA3',
          500: '#3CB98C',
          600: '#2D9A72',
          700: '#21795A',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        aurora: 'aurora 14s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
        aurora: {
          '0%': { transform: 'translate(-8%, -4%) scale(1)' },
          '100%': { transform: 'translate(8%, 6%) scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
};
