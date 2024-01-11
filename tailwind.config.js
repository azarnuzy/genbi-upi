/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          100: '#CFD9E8',
          200: '#B0C0D8',
          300: '#88A0C5',
          400: '#6080B2',
          500: '#39619E',
          main: '#11418B',
          600: '#0E3674',
          700: '#0B2B5D',
          800: '#092146',
          900: '#06162E',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        neutral: {
          100: '#FFFFFF',
          200: '#EBEBEB',
          300: '#B4B4B4',
          400: '#8E8E8E',
          500: '#696969',
          600: '#444444',
          main: '#1E1E1E',
          700: '#191919',
          800: '#0F0F0F',
          900: '#060606',
        },
        error: {
          100: '#F8D3D2',
          200: '#F3B6B3',
          300: '#EC928D',
          400: '#E66E68',
          main: '#DA251C',
          500: '#B61F17',
          600: '#911913',
          700: '#6D130E',
          800: '#490C09',
          900: '#2C0706',
        },
        warning: {
          100: '#FFF1CC',
          200: '#FFE7AA',
          300: '#FFDB80',
          400: '#FFD055',
          500: '#FFC42B',
          main: '#FFB800',
          600: '#D49900',
          700: '#AA7B00',
          800: '#805C00',
          900: '#805C00',
        },
        success: {
          0: '#F5FFF5',
          100: '#C5FDC7',
          200: '#98F99B',
          300: '#70F274',
          400: '#50E955',
          500: '#38DD3E',
          600: '#27CD2C',
          main: '#1BB820',
          800: '#13A017',
          900: '#0E8712',
        },
        information: {
          0: '#F9F5FF',
          100: '#DDC5FD',
          200: '#C298F9',
          300: '#A970F2',
          400: '#9350E9',
          main: '#8038DD',
          600: '#6F27CD',
          700: '#5F1BB8',
          800: '#5013A0',
          900: '#420E87',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
