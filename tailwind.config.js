/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-100': '#D0EDED', // Lightest shade
        'primary-200': '#A2D1D0',
        'primary-300': '#74B5B3',
        'primary-400': '#46A999',
        'primary-500': '#62C5C1', // Base color
        'primary-600': '#3D9F9C',
        'primary-700': '#277B78',
        'primary-800': '#105754',
        'primary-900': '#003330' // Darkest shade
      },
    },
  },
  plugins: [],
}
