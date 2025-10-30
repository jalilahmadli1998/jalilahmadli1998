import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem'
      },
      screens: {
        '2xl': '1280px'
      }
    },
    extend: {
      colors: {
        background: {
          light: '#F7F9FC',
          dark: '#0B0F1A'
        },
        primary: '#1F6FEB',
        secondary: '#00C2A8',
        accent: '#FFB300',
        subtle: '#94A3B8'
      },
      fontFamily: {
        heading: ['"IBM Plex Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')]
};

export default config;
