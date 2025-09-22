/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        coral: {
          50: '#FFF8F6',
          100: '#FFEDE8',
          200: '#FFD6CC',
          300: '#FFB8A6',
          400: '#FF8E7A',
          500: '#FF5A5F',
          600: '#E04E53',
          700: '#C13E42',
          800: '#A13237',
          900: '#7D2529',
        },
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#00A699',
          600: '#00C9A7',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'fadeInScale': 'fadeInScale 0.6s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px rgba(255, 90, 95, 0.5)',
        'glow-lg': '0 0 40px rgba(255, 90, 95, 0.6)',
        'coral': '0 10px 25px -5px rgba(255, 90, 95, 0.2), 0 10px 10px -5px rgba(255, 90, 95, 0.04)',
        'teal': '0 10px 25px -5px rgba(0, 166, 153, 0.2), 0 10px 10px -5px rgba(0, 166, 153, 0.04)',
      },
    },
  },
  plugins: [],
};