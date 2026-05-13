/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#063d2c',
          light: '#0f6b4d',
          dark: '#021c14',
        },
        accent: {
          gold: '#caa45d',
          lightGold: '#f3ead9',
          darkGold: '#9f7938',
        },
        background: '#fffdf8',
        ink: '#09251b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        arabic: ['Amiri', 'serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
      boxShadow: {
        'premium': '0 20px 50px rgba(0, 0, 0, 0.05)',
        'premium-hover': '0 30px 60px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
