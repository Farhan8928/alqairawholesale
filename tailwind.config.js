/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ALQAIRA brand. Navy + gold belong to the chrome (bars, buttons,
        // dark bands). Product surfaces stay on ivory — the garment leads.
        navy: {
          950: '#0C0D22',
          900: '#16183A',
          800: '#1F2250',
          700: '#2B2F66',
          600: '#3D4180'
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#E0C77E',
          dark: '#A8842F'
        },
        ivory: {
          50: '#FDFBF6',
          100: '#FAF6EE',
          200: '#F2ECDF',
          300: '#E6DDCB'
        },
        line: '#E3DBC9'
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px'
      },
      animation: {
        marquee: 'marquee 45s linear infinite'
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' }
        }
      }
    }
  },
  plugins: []
}
