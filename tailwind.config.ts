import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F5F0E6',
        surface: '#fff',
        heading: '#1a237e',
        accent: {
          DEFAULT: '#426bc2',
          hover: '#3459a0',
        },
        muted: '#666',
        border: '#ccc',
        'timeline-dot': '#122c4f',
        'timeline-line': '#ccc',
      },
      fontFamily: {
        sans: ['Mulish', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Jost', 'sans-serif'],
      },
      borderRadius: {
        capsule: '1rem',
        card: '0.25rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        blink: 'blink 1s step-end infinite',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [typography],
} satisfies Config;
